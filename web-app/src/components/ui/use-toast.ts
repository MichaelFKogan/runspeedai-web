'use client'

import * as React from 'react'

import type { ToastProps } from '@/components/ui/toaster'

const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 1000

type ToastState = {
  toasts: ToastProps[]
}

type ToastActionType =
  | { type: 'ADD_TOAST'; toast: ToastProps }
  | { type: 'UPDATE_TOAST'; toast: Partial<ToastProps> }
  | { type: 'DISMISS_TOAST'; toastId?: string }
  | { type: 'REMOVE_TOAST'; toastId?: string }

let toastCount = 0

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const listeners: Array<(state: ToastState) => void> = []

let memoryState: ToastState = { toasts: [] }

function dispatch(action: ToastActionType) {
  memoryState = toastReducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function toastReducer(state: ToastState, action: ToastActionType): ToastState {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      }
    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.toast.id ? { ...toast, ...action.toast } : toast
        )
      }
    case 'DISMISS_TOAST': {
      const { toastId } = action
      if (toastId) {
        scheduleToastRemoval(toastId)
      } else {
        state.toasts.forEach((toast) => scheduleToastRemoval(toast.id))
      }
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === toastId || toastId === undefined ? { ...toast, open: false } : toast
        )
      }
    }
    case 'REMOVE_TOAST': {
      if (action.toastId === undefined) {
        return { ...state, toasts: [] }
      }
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.toastId)
      }
    }
    default:
      return state
  }
}

function scheduleToastRemoval(toastId: string) {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({ type: 'REMOVE_TOAST', toastId })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

function createToast(props: Omit<ToastProps, 'id'>) {
  const id = `${toastCount++}`

  const toast: ToastProps = {
    ...props,
    id,
    open: true,
    onOpenChange: (open) => {
      if (!open) {
        dispatch({ type: 'DISMISS_TOAST', toastId: id })
      }
    }
  }

  dispatch({ type: 'ADD_TOAST', toast })

  return {
    id,
    dismiss: () => dispatch({ type: 'DISMISS_TOAST', toastId: id }),
    update: (props: ToastProps) => dispatch({ type: 'UPDATE_TOAST', toast: { ...props, id } })
  }
}

function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    ...state,
    toast: createToast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId })
  }
}

export { useToast, createToast }
