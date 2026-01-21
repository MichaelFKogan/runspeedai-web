
# Runspeed AI - Web Version Planning Document

## Executive Summary

This document outlines the complete functionality, architecture, and recommended approach for building a web version of the Runspeed AI iOS app. The web version will replicate all core features including authentication, credit-based payments, image/video transformation, and media storage.

---

## Table of Contents

1. [App Overview](#app-overview)
2. [Core Functionality](#core-functionality)
3. [Technical Architecture](#technical-architecture)
4. [Database Schema](#database-schema)
5. [API Integrations](#api-integrations)
6. [Recommended Development Approach](#recommended-development-approach)
7. [Implementation Plan](#implementation-plan)
8. [Technology Stack Recommendations](#technology-stack-recommendations)

---

## App Overview

**Runspeed AI** is an AI-powered image and video generation platform that allows users to:
- Transform photos using AI filters and styles
- Generate images from text prompts
- Create videos from images or text
- Purchase credits to pay for generations
- Store and manage generated media in a personal gallery

### Key Value Propositions
- Credit-based payment system (no subscription required)
- Multiple AI model providers (Runware, WaveSpeed, Fal.ai)
- Real-time generation progress tracking
- Webhook-based async processing
- Cross-platform media storage

---

## Core Functionality

### 1. Authentication System

**Methods Supported:**
- Email/Password sign-up and sign-in
- Google Sign-In (OAuth)
- Apple Sign-In (OAuth)

**Implementation Details:**
- Uses Supabase Auth
- Session persistence
- Automatic session restoration
- User profile management

**Key Files:**
- `AuthViewModel.swift` - Auth state management
- `SignInView.swift` - Authentication UI
- Supabase Auth integration

**Web Requirements:**
- Supabase Auth JavaScript SDK
- OAuth redirect handlers
- Session management (localStorage/cookies)
- Protected route handling

---

### 2. Credit System

**Features:**
- Credit balance tracking per user
- Credit purchase (in-app purchases on iOS, Stripe/PayPal on web)
- Credit deduction on generation
- Transaction history
- Insufficient credit validation before generation

**Database Tables:**
- `user_credits` - Current balance per user
- `credit_transactions` - All credit transactions (purchases/deductions)

**Key Components:**
- `CreditsManager` - Credit operations
- `CreditsViewModel` - UI state management
- `PurchaseCreditsView` - Purchase UI
- `CreditsBadge` - Balance display component

**Web Requirements:**
- Stripe or PayPal integration for credit purchases
- Real-time balance updates
- Transaction history page
- Credit validation before API calls

---

### 3. Image Transformation

**Features:**
- Photo filter application (multiple categories)
- Text-to-image generation
- Image-to-image transformation
- Multiple model support
- Aspect ratio selection
- Reference image support
- Multi-filter selection

**Categories:**
- Anime, Art, Character, Chibi, Celebrity
- Fashion, Fitness, Instagram, LinkedIn Headshots
- Luxury, Mens, Photography, Social Media
- Travel, Video Games, Spooky, Back In Time
- And more...

**Flow:**
1. User selects filter/model
2. Uploads photo or enters prompt
3. System checks credits
4. Submits to API (Runware/WaveSpeed/Fal.ai)
5. Creates `pending_jobs` record
6. Webhook callback updates status
7. Result downloaded and uploaded to Supabase Storage
8. Metadata saved to `user_media` table
9. Credits deducted
10. User notified

**Key Components:**
- `PhotoFilterDetailView` - Filter selection UI
- `ImageGenerationTask` - Generation logic
- `ImageGenerationCoordinator` - Task management
- `PhotoConfirmationView` - Pre-generation confirmation

**Web Requirements:**
- File upload component
- Image preview
- Progress tracking UI
- Real-time status updates (WebSocket/SSE)
- Result display and download

---

### 4. Video Transformation

**Features:**
- Text-to-video generation
- Image-to-video generation
- Motion control (reference video)
- Duration selection (5s, 8s, 10s, 12s)
- Resolution selection (480p, 720p, 1080p)
- Aspect ratio selection (16:9, 9:16, 1:1, 3:4, 4:3)
- Audio generation option
- Variable pricing based on duration/resolution

**Models Supported:**
- Sora 2
- Google Veo 3.1 Fast
- Seedance 1.0 Pro Fast
- Kling VIDEO 2.6 Pro
- Wan2.6
- KlingAI 2.5 Turbo Pro

**Flow:**
Similar to image generation but with additional parameters:
1. Select video model
2. Configure duration, resolution, aspect ratio
3. Upload image/prompt
4. Optional: Upload reference video for motion control
5. Submit to API
6. Track via webhook
7. Download result
8. Generate thumbnail
9. Upload to storage
10. Save metadata

**Key Components:**
- `VideoModelDetailPage` - Model selection UI
- `VideoGenerationTask` - Generation logic
- `VideoGenerationCoordinator` - Task management
- `DurationSelector`, `ResolutionSelector` - Parameter selection

**Web Requirements:**
- Video upload component
- Video preview player
- Thumbnail generation
- Progress tracking for long-running jobs
- Video playback controls

---

### 5. Gallery/Profile

**Features:**
- View all generated media (images/videos)
- Filter by type (image/video)
- Sort by date
- Favorite/unfavorite items
- Delete items
- View generation details (model, cost, prompt, etc.)
- User statistics (total generations, favorites, model usage)
- Settings page

**Database Tables:**
- `user_media` - All generated media metadata
- `user_stats` - User statistics (counts, model usage)

**Key Components:**
- `ProfileViewContent` - Main gallery view
- `ImageGridView` - Media grid display
- `FullScreenImageView` - Full-screen media viewer
- `GenerationDetailsSheet` - Metadata display

**Web Requirements:**
- Responsive grid layout
- Infinite scroll or pagination
- Image/video lightbox
- Filter and sort controls
- Delete confirmation modals

---

### 6. Navigation Structure

**Main Tabs:**
1. **Home** - Featured content, categories, quick access
2. **Photo Filters** - Browse and select photo filters
3. **Camera/Post** - Quick upload and generation
4. **AI Models** - Browse image and video models
5. **Gallery** - User's generated media

**Web Navigation:**
- Top navigation bar
- Sidebar (optional for desktop)
- Mobile hamburger menu
- Breadcrumbs for deep navigation

---

## Technical Architecture

### iOS Architecture Pattern
- **MVVM** (Model-View-ViewModel)
- **Coordinator Pattern** for navigation
- **Singleton Pattern** for managers
- **SwiftUI** for UI
- **Swift Concurrency** (async/await) for async operations

### Key Singletons

1. **SupabaseManager.shared**
   - Database operations
   - Storage operations
   - Auth operations

2. **PricingManager.shared**
   - Centralized pricing for all models
   - Fixed pricing for images
   - Variable pricing for videos (based on duration/resolution)

3. **ModelConfigurationManager.shared**
   - API configurations per model
   - Capabilities mapping
   - Aspect ratios, resolutions, durations per model

4. **NotificationManager.shared**
   - In-app generation progress notifications
   - Badge counts
   - Notification state management

5. **JobStatusManager.shared**
   - Supabase Realtime subscriptions
   - Webhook job completion handling
   - Result download and processing

6. **CreditsManager.shared**
   - Credit balance operations
   - Transaction management

7. **ImageGenerationCoordinator.shared** / **VideoGenerationCoordinator.shared**
   - Task lifecycle management
   - Progress tracking
   - Error handling

### Generation Flow (Detailed)

```
User Action
    ↓
Check Credits (CreditsManager)
    ↓
Create Task (GenerationCoordinator)
    ↓
Upload Input Media to Supabase Storage (if needed)
    ↓
Submit to API (Runware/WaveSpeed/Fal.ai) with Webhook URL
    ↓
Create pending_jobs Record
    ↓
[Async: API Processing]
    ↓
Webhook Callback → Edge Function
    ↓
Update pending_jobs Status
    ↓
Supabase Realtime Event Fired
    ↓
JobStatusManager Receives Update
    ↓
Download Result from API URL
    ↓
Upload to Supabase Storage
    ↓
Save Metadata to user_media Table
    ↓
Deduct Credits
    ↓
Update Notification
    ↓
User Sees Result in Gallery
```

---

## Database Schema

### Tables

#### 1. `user_media`
Stores all generated media metadata.

**Columns:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → auth.users)
- `image_url` (TEXT) - Supabase Storage URL
- `model` (TEXT) - Model name used
- `title` (TEXT, nullable)
- `cost` (DOUBLE) - Credits spent
- `type` (TEXT, nullable) - Filter type
- `endpoint` (TEXT, nullable) - API endpoint used
- `prompt` (TEXT, nullable) - Generation prompt
- `aspect_ratio` (TEXT, nullable)
- `provider` (TEXT, nullable) - API provider (runware/wavespeed/falai)
- `media_type` (TEXT) - "image" or "video"
- `file_extension` (TEXT, nullable) - "jpg", "mp4", "webm", etc.
- `thumbnail_url` (TEXT, nullable) - For videos
- `is_favorite` (BOOLEAN, default false)
- `status` (TEXT) - "success" or "failed"
- `error_message` (TEXT, nullable)
- `duration` (DOUBLE, nullable) - Video duration in seconds
- `resolution` (TEXT, nullable) - Video resolution
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

**Indexes:**
- `user_id`
- `created_at DESC`
- `media_type`
- `is_favorite`

**RLS Policies:**
- Users can only view/insert/update/delete their own media

---

#### 2. `user_credits`
Stores current credit balance per user.

**Columns:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → auth.users, Unique)
- `balance` (DOUBLE, default 0.00)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

**RLS Policies:**
- Users can only view/update their own credits

---

#### 3. `credit_transactions`
Stores all credit transactions (purchases and deductions).

**Columns:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → auth.users)
- `amount` (DOUBLE) - Positive for purchases, negative for deductions
- `transaction_type` (TEXT) - "purchase" or "deduction"
- `description` (TEXT)
- `related_media_id` (UUID, nullable, Foreign Key → user_media)
- `payment_method` (TEXT, nullable) - "stripe", "paypal", "apple", etc.
- `payment_transaction_id` (TEXT, nullable) - External payment ID
- `created_at` (TIMESTAMPTZ)

**Indexes:**
- `user_id`
- `created_at DESC`

**RLS Policies:**
- Users can only view their own transactions

---

#### 4. `pending_jobs`
Tracks async API jobs waiting for webhook completion.

**Columns:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → auth.users)
- `task_id` (TEXT, Unique) - API task/job ID
- `provider` (TEXT) - "runware", "wavespeed", or "falai"
- `job_type` (TEXT) - "image" or "video"
- `status` (TEXT) - "pending", "processing", "completed", "failed"
- `result_url` (TEXT, nullable) - Temporary API URL from webhook
- `error_message` (TEXT, nullable)
- `metadata` (JSONB) - Prompt, aspect ratio, model, etc.
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)
- `completed_at` (TIMESTAMPTZ, nullable)
- `device_token` (TEXT, nullable) - For push notifications
- `notification_sent` (BOOLEAN, default false)

**Indexes:**
- `user_id`
- `task_id`
- `status`
- `created_at DESC`

**RLS Policies:**
- Users can only view/insert/update their own jobs

**Realtime:**
- Enabled for real-time status updates

---

#### 5. `user_stats`
Stores aggregated user statistics.

**Columns:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → auth.users, Unique)
- `favorite_count` (INTEGER, default 0)
- `image_count` (INTEGER, default 0)
- `video_count` (INTEGER, default 0)
- `model_counts` (JSONB) - `{ "model_name": count }`
- `video_model_counts` (JSONB) - `{ "model_name": count }`
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

**RLS Policies:**
- Users can only view/update their own stats

---

#### 6. `user_presets` (Optional)
Stores user-saved generation presets.

**Columns:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → auth.users)
- `name` (TEXT)
- `model` (TEXT)
- `prompt` (TEXT, nullable)
- `aspect_ratio` (TEXT, nullable)
- `settings` (JSONB) - Additional settings
- `created_at` (TIMESTAMPTZ)

**RLS Policies:**
- Users can only view/insert/update/delete their own presets

---

### Storage Buckets

**Supabase Storage:**
- `user-media` - Generated images and videos
  - Path structure: `{user_id}/{model_name}/{timestamp}_{uuid}.{ext}`
- `user-uploads` - User-uploaded input images/videos
  - Path structure: `{user_id}/uploads/{timestamp}_{uuid}.{ext}`

**Storage Policies:**
- Users can upload to their own folder
- Users can read their own files
- Public read for generated media (optional, or use signed URLs)

---

## API Integrations

### 1. Runware API

**Purpose:** Image and video generation

**Endpoints Used:**
- Image generation
- Video generation
- Image upload (for image-to-image/video)
- Video upload (for reference videos)

**Authentication:**
- API key in headers

**Webhook Support:**
- Yes, webhook URL passed in request
- Webhook receives job completion callback

**Key Features:**
- Multiple models
- Aspect ratio support
- Resolution support
- Duration support (videos)
- Motion control (reference videos)

---

### 2. WaveSpeed API

**Purpose:** Image generation (specialized models like Ghibli style)

**Endpoints Used:**
- Image generation

**Authentication:**
- API key in headers

**Webhook Support:**
- Yes, webhook URL passed in request

---

### 3. Fal.ai API

**Purpose:** Video generation (motion control)

**Endpoints Used:**
- Video generation with motion control

**Authentication:**
- API key (stored server-side in Edge Function)

**Webhook Support:**
- Yes, webhook URL as query parameter

**Special Handling:**
- Uses proxy Edge Function to hide API key
- Requires image and reference video URLs

---

### 4. Supabase

**Services Used:**
- **Auth** - User authentication
- **PostgreSQL** - Database
- **Storage** - File storage
- **Realtime** - Real-time updates
- **Edge Functions** - Webhook receivers, API proxies

**Edge Functions:**
1. `webhook-receiver` - Receives webhooks from APIs, updates `pending_jobs`
2. `falai-proxy` - Proxies Fal.ai requests (hides API key)
3. `send-push-notification` - Sends push notifications (iOS only)

---

## Recommended Development Approach

### Phase 1: Planning & Documentation ✅ (Current Phase)

**Deliverables:**
1. ✅ Complete functionality reference (this document)
2. ✅ Database schema documentation
3. ✅ API integration documentation
4. ✅ UI/UX wireframes (optional but recommended)
5. ✅ Technical architecture diagram

**Why Start Here:**
- Ensures nothing is missed
- Provides clear roadmap
- Helps estimate timeline
- Serves as reference during development

---

### Phase 2: Foundation Setup

**Steps:**
1. **Create new web project**
   - Choose framework (Next.js recommended)
   - Set up project structure
   - Configure build tools

2. **Set up Supabase**
   - Verify database tables exist (reuse iOS schema)
   - Configure storage buckets
   - Set up Edge Functions (reuse from iOS)
   - Test Supabase client connection

3. **Set up authentication**
   - Implement Supabase Auth
   - Create sign-in/sign-up pages
   - Set up protected routes
   - Test OAuth flows (Google, Apple)

4. **Set up environment variables**
   - Supabase URL and keys
   - API keys (server-side only)
   - Webhook secrets

**Estimated Time:** 1-2 weeks

---

### Phase 3: Core Features (MVP)

**Priority Order:**

1. **Authentication** (Week 1)
   - Sign in/up pages
   - Session management
   - Protected routes
   - User profile display

2. **Credit System** (Week 2)
   - Credit balance display
   - Credit purchase (Stripe integration)
   - Transaction history
   - Credit validation

3. **Gallery** (Week 3)
   - Media grid display
   - Filter by type
   - Sort by date
   - Full-screen viewer
   - Delete functionality

4. **Image Generation - Basic** (Week 4-5)
   - Simple text-to-image
   - File upload
   - Progress tracking
   - Result display

**Estimated Time:** 4-5 weeks

---

### Phase 4: Advanced Features

**Priority Order:**

1. **Photo Filters** (Week 6-7)
   - Filter categories
   - Filter selection UI
   - Multi-filter support
   - Image upload and preview

2. **Video Generation** (Week 8-9)
   - Video model selection
   - Parameter selection (duration, resolution, aspect ratio)
   - Video upload
   - Thumbnail generation
   - Video playback

3. **Real-time Updates** (Week 10)
   - WebSocket/SSE for job status
   - Progress indicators
   - Notification system

4. **Advanced Gallery Features** (Week 11)
   - Favorites
   - Generation details
   - User statistics
   - Settings page

**Estimated Time:** 6 weeks

---

### Phase 5: Polish & Optimization

**Tasks:**
- UI/UX improvements
- Performance optimization
- Error handling
- Loading states
- Responsive design
- SEO optimization
- Analytics integration
- Testing

**Estimated Time:** 2-3 weeks

---

## Implementation Plan

### Recommended File Structure

```
web-app/
├── src/
│   ├── app/                    # Next.js App Router (or pages/)
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── (dashboard)/
│   │   │   ├── home/
│   │   │   ├── filters/
│   │   │   ├── models/
│   │   │   ├── gallery/
│   │   │   └── profile/
│   │   └── api/                # API routes
│   │       ├── webhooks/
│   │       └── credits/
│   ├── components/
│   │   ├── auth/
│   │   ├── credits/
│   │   ├── gallery/
│   │   ├── generation/
│   │   └── ui/                 # Reusable UI components
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts      # Supabase client
│   │   │   ├── auth.ts         # Auth helpers
│   │   │   └── storage.ts     # Storage helpers
│   │   ├── api/
│   │   │   ├── runware.ts
│   │   │   ├── wavespeed.ts
│   │   │   └── falai.ts
│   │   ├── managers/
│   │   │   ├── credits.ts
│   │   │   ├── pricing.ts
│   │   │   └── jobs.ts
│   │   └── utils/
│   ├── hooks/                  # React hooks
│   │   ├── useAuth.ts
│   │   ├── useCredits.ts
│   │   ├── useJobs.ts
│   │   └── useRealtime.ts
│   ├── types/                  # TypeScript types
│   │   ├── database.ts
│   │   ├── api.ts
│   │   └── models.ts
│   └── styles/
├── public/
├── .env.local                  # Environment variables
├── package.json
└── README.md
```

---

### Key Implementation Files

#### 1. Supabase Client Setup

```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

#### 2. Auth Hook

```typescript
// hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
```

#### 3. Credits Manager

```typescript
// lib/managers/credits.ts
import { supabase } from '@/lib/supabase/client'

export class CreditsManager {
  static async getBalance(userId: string): Promise<number> {
    const { data, error } = await supabase
      .from('user_credits')
      .select('balance')
      .eq('user_id', userId)
      .single()

    if (error) throw error
    return data?.balance ?? 0
  }

  static async deductCredits(
    userId: string,
    amount: number,
    description: string
  ): Promise<void> {
    // Implementation similar to iOS CreditsManager
  }
}
```

#### 4. Job Status Hook (Realtime)

```typescript
// hooks/useJobs.ts
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { RealtimeChannel } from '@supabase/supabase-js'

export function useJobs(userId: string) {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const channel = supabase
      .channel('pending_jobs')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pending_jobs',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          // Handle job status updates
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  return { jobs }
}
```

---

## Technology Stack Recommendations

### Frontend Framework

**Recommended: Next.js 14+ (App Router)**

**Why:**
- Server-side rendering for SEO
- API routes for webhook handling
- Excellent TypeScript support
- Great Supabase integration
- Built-in image optimization
- Easy deployment (Vercel)

**Alternatives:**
- **React + Vite** - Faster dev server, simpler setup
- **Remix** - Great for forms and data loading
- **SvelteKit** - Simpler, smaller bundle

---

### UI Framework

**Recommended: Tailwind CSS + shadcn/ui**

**Why:**
- Rapid development
- Consistent design system
- Accessible components
- Easy customization

**Alternatives:**
- **Material-UI (MUI)** - More components out of the box
- **Chakra UI** - Good defaults, easy theming
- **Radix UI** - Headless components, full control

---

### State Management

**Recommended: React Query (TanStack Query) + Zustand**

**Why:**
- React Query for server state (API calls, caching)
- Zustand for client state (UI state, preferences)
- Lightweight, simple API

**Alternatives:**
- **Redux Toolkit** - More complex, but powerful
- **Jotai** - Atomic state management
- **Context API** - Built-in, but can be verbose

---

### File Upload

**Recommended: react-dropzone**

**Why:**
- Easy drag-and-drop
- File validation
- Preview support
- Good TypeScript support

---

### Video Player

**Recommended: Video.js or Plyr**

**Why:**
- Feature-rich
- Customizable
- Good mobile support

---

### Payment Processing

**Recommended: Stripe**

**Why:**
- Easy integration
- Good documentation
- Webhook support
- PCI compliance handled

**Setup:**
- Stripe Checkout for one-time payments
- Store payment transaction IDs in `credit_transactions`

---

### Real-time Updates

**Recommended: Supabase Realtime (WebSocket)**

**Why:**
- Built into Supabase
- No additional service needed
- Automatic reconnection
- Good performance

**Alternative:**
- Server-Sent Events (SSE) - Simpler, one-way only

---

### Image Processing

**Recommended: Browser APIs + Sharp (server-side)**

**Why:**
- Browser APIs for client-side preview
- Sharp for server-side processing (thumbnails, etc.)

---

### Deployment

**Recommended: Vercel (for Next.js)**

**Why:**
- Zero-config deployment
- Automatic HTTPS
- Edge functions support
- Great DX

**Alternatives:**
- **Netlify** - Similar to Vercel
- **Railway** - More control, Docker support
- **AWS Amplify** - Full AWS integration

---

## Next Steps

1. **Review this document** - Ensure all functionality is captured
2. **Create wireframes** - Visualize the web UI (optional but helpful)
3. **Set up project** - Initialize Next.js project
4. **Configure Supabase** - Verify database and storage
5. **Implement authentication** - Start with sign-in/sign-up
6. **Build MVP** - Focus on core features first
7. **Iterate** - Add advanced features incrementally

---

## Questions to Consider

1. **Design System:** Will you reuse iOS design or create new web design?
2. **Mobile Experience:** Will web be desktop-first or mobile-first?
3. **Payment:** Stripe or PayPal? Or both?
4. **Analytics:** Which analytics platform? (Google Analytics, Plausible, etc.)
5. **Error Tracking:** Sentry, LogRocket, or similar?
6. **Email:** Transactional emails? (Supabase Auth emails, generation completion, etc.)

---

## Conclusion

This document provides a comprehensive reference for building the web version of Runspeed AI. The recommended approach is:

1. **Start with documentation** (this phase) ✅
2. **Set up foundation** (Supabase, auth, basic UI)
3. **Build MVP** (auth, credits, basic generation, gallery)
4. **Add advanced features** (filters, video, real-time)
5. **Polish and optimize**

The iOS app's architecture is well-designed and can be largely replicated on the web. The main differences will be:
- UI framework (SwiftUI → React/Next.js)
- Payment system (StoreKit → Stripe)
- Real-time (Supabase Realtime works the same)
- File handling (native → web APIs)

Good luck with the web version! 🚀
EOF