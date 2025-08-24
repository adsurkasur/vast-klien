import { cva } from "class-variance-authority"

export const sidebarVariants = cva(
  "w-64 h-full bg-background border-r",
  {
    variants: {
      collapsed: {
        true: "w-20",
        false: "w-64",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
)