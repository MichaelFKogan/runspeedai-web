import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Grid } from '@/components/ui/grid'

const highlights = [
  {
    title: 'Photo Filters',
    description: 'Explore stylized looks with curated presets and quick previews.',
    cta: 'Browse filters',
    accent: 'bg-[#FDE047]'
  },
  {
    title: 'AI Models',
    description: 'Compare image and video models with clear capability tags.',
    cta: 'View models',
    accent: 'bg-[#A7F3D0]'
  },
  {
    title: 'Gallery',
    description: 'Collect your latest generations and favorites in one place.',
    cta: 'Open gallery',
    accent: 'bg-[#FBCFE8]'
  }
]

const stats = [
  { label: 'UI build', value: 'Neobrutalist' },
  { label: 'Routes', value: '6 stubbed' },
  { label: 'Modes', value: 'Create + Browse' },
  { label: 'Status', value: 'UI-only' }
]

const activity = [
  {
    title: 'Latest upload',
    description: '2 images · 1 video queued',
    time: 'Just now',
    accent: 'bg-[#93C5FD]'
  },
  {
    title: 'Credits updated',
    description: 'Starter pack added',
    time: '2 hours ago',
    accent: 'bg-[#FDE047]'
  },
  {
    title: 'Favorite saved',
    description: 'Portrait study · VEO 3.1',
    time: 'Yesterday',
    accent: 'bg-[#A7F3D0]'
  }
]

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-[32px] border-4 border-black bg-[#FDE047] p-8 shadow-[12px_12px_0_0_#000]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-5">
            <span className="inline-flex w-fit items-center rounded-full border-2 border-black bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-[4px_4px_0_0_#000]">
              Runspeed AI · Home
            </span>
            <div className="space-y-3">
              <h1 className="text-4xl font-black uppercase tracking-tight text-black sm:text-5xl">
                Build your creative sprintboard.
              </h1>
              <p className="max-w-2xl text-base font-medium text-black/80">
                Neobrutalist surfaces, loud contrast, and thick borders keep the RunSpeed AI
                workspace bold while the product ships.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="border-2 border-black bg-white text-black shadow-[4px_4px_0_0_#000] hover:bg-white/90">
                Start creating
              </Button>
              <Button className="border-2 border-black bg-[#A7F3D0] text-black shadow-[4px_4px_0_0_#000] hover:bg-[#A7F3D0]/90">
                Explore models
              </Button>
              <Link
                className="inline-flex items-center justify-center rounded-md border-2 border-black bg-black px-4 py-2 text-sm font-semibold text-white shadow-[4px_4px_0_0_#000] hover:bg-black/90"
                href="/gallery"
              >
                View gallery
              </Link>
            </div>
          </div>
          <div className="grid max-w-sm gap-3 rounded-[24px] border-4 border-black bg-white p-5 text-black shadow-[8px_8px_0_0_#000]">
            <p className="text-sm font-bold uppercase tracking-widest">Sprint status</p>
            <div className="space-y-2 text-sm font-semibold">
              <p className="flex items-center justify-between border-2 border-black bg-[#FBCFE8] px-3 py-2">
                Next milestone <span>72 hrs</span>
              </p>
              <p className="flex items-center justify-between border-2 border-black bg-[#BFDBFE] px-3 py-2">
                Templates live <span>18</span>
              </p>
              <p className="flex items-center justify-between border-2 border-black bg-[#BBF7D0] px-3 py-2">
                Creators online <span>1.2k</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border-4 border-black bg-white p-6 shadow-[10px_10px_0_0_#000]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase text-black">Foundation highlights</h2>
            <Button className="border-2 border-black bg-[#FDE047] text-black shadow-[4px_4px_0_0_#000] hover:bg-[#FDE047]/90">
              View all
            </Button>
          </div>
          <Grid className="mt-6 md:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col justify-between rounded-[20px] border-4 border-black bg-white p-4 shadow-[6px_6px_0_0_#000]"
              >
                <div className="space-y-3">
                  <span
                    className={`inline-flex w-fit items-center rounded-full border-2 border-black px-3 py-1 text-xs font-bold uppercase ${item.accent}`}
                  >
                    {item.title}
                  </span>
                  <p className="text-base font-bold text-black">{item.title}</p>
                  <p className="text-sm font-medium text-black/70">{item.description}</p>
                </div>
                <button className="mt-4 w-fit border-2 border-black bg-black px-3 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-[4px_4px_0_0_#000]">
                  {item.cta}
                </button>
              </div>
            ))}
          </Grid>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-[24px] border-4 border-black bg-[#A7F3D0] p-6 shadow-[8px_8px_0_0_#000]">
            <h3 className="text-xl font-black uppercase text-black">Quick stats</h3>
            <Grid className="mt-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[16px] border-2 border-black bg-white p-4 text-black shadow-[4px_4px_0_0_#000]"
                >
                  <p className="text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                  <p className="text-lg font-black">{stat.value}</p>
                </div>
              ))}
            </Grid>
          </div>

          <div className="rounded-[24px] border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000]">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black uppercase text-black">Action deck</h3>
              <span className="rounded-full border-2 border-black bg-[#FBCFE8] px-3 py-1 text-xs font-bold uppercase">
                UI-only
              </span>
            </div>
            <div className="mt-4 space-y-3 text-sm font-semibold text-black">
              <div className="flex items-center justify-between border-2 border-black bg-[#FDE047] px-4 py-3 shadow-[4px_4px_0_0_#000]">
                <span>Create a generation</span>
                <Button size="sm" className="border-2 border-black bg-white text-black shadow-[3px_3px_0_0_#000]">
                  Open Create
                </Button>
              </div>
              <div className="flex items-center justify-between border-2 border-black bg-[#BFDBFE] px-4 py-3 shadow-[4px_4px_0_0_#000]">
                <span>Explore filters</span>
                <Button size="sm" className="border-2 border-black bg-white text-black shadow-[3px_3px_0_0_#000]">
                  View Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border-4 border-black bg-white p-6 shadow-[10px_10px_0_0_#000]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black uppercase text-black">Recent activity</h2>
          <Button className="border-2 border-black bg-[#BFDBFE] text-black shadow-[4px_4px_0_0_#000] hover:bg-[#BFDBFE]/90">
            View all activity
          </Button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {activity.map((item) => (
            <div
              key={item.title}
              className="rounded-[20px] border-4 border-black bg-white p-4 shadow-[6px_6px_0_0_#000]"
            >
              <span
                className={`inline-flex w-fit items-center rounded-full border-2 border-black px-3 py-1 text-xs font-bold uppercase ${item.accent}`}
              >
                {item.time}
              </span>
              <p className="mt-3 text-base font-black text-black">{item.title}</p>
              <p className="text-sm font-medium text-black/70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
