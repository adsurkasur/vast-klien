import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"

import { toggleVariants } from "./toggle-variants"
// import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"


const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle }
