import { cva } from "class-variance-authority"

export const navigationMenuVariants = cva(
  "flex items-center space-x-4",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)