
import React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const appleButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary: "bg-black text-white hover:bg-black/90 border border-transparent",
        secondary: "bg-white text-black hover:bg-gray-100 border border-gray-200",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-black",
        ghost: "border border-transparent bg-transparent hover:bg-gray-100 text-black",
        link: "text-black underline-offset-4 hover:underline border-none bg-transparent p-0 h-auto",
        green: "bg-primary text-white hover:bg-primary/90 border border-transparent",
        "green-outline": "border border-primary bg-transparent hover:bg-primary/10 text-primary",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface AppleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof appleButtonVariants> {
  asChild?: boolean;
}

const AppleButton = React.forwardRef<HTMLButtonElement, AppleButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(appleButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
AppleButton.displayName = "AppleButton";

export { AppleButton, appleButtonVariants };
