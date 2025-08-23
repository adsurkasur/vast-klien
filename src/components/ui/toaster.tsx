"use client";
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      <div role="region" aria-live="polite" aria-label="Notifications">
        {toasts.length === 0 ? (
          <div className="sr-only">No notifications</div>
        ) : (
          toasts.map(function ({ id, title, description, action, ...props }) {
            return (
              <Toast key={id} {...props} tabIndex={0} role="alert" aria-atomic="true">
                <div className="grid gap-1">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
                {action}
                <ToastClose />
              </Toast>
            )
          })
        )}
        <ToastViewport />
      </div>
    </ToastProvider>
  )
}
