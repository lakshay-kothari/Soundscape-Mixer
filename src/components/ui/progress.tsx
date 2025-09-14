import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-3 w-full overflow-hidden rounded-full",
      "bg-white/10 border border-white/20 backdrop-blur-md",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 transition-all rounded-full"
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        background: "linear-gradient(90deg, #a855f7, #3b82f6, #ec4899)",
        boxShadow: "0 0 10px rgba(168,85,247,0.5), 0 0 20px rgba(236,72,153,0.4)"
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
