import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex touch-none select-none",
      orientation === "vertical" 
        ? "h-full w-5 flex-col items-center" 
        : "w-full items-center",
      className
    )}
    orientation={orientation}
    {...props}
  >
    <SliderPrimitive.Track 
      className={cn(
        "relative grow overflow-hidden bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 shadow-inner",
        orientation === "vertical" 
          ? "h-full w-3 rounded-full border border-slate-500" 
          : "h-3 w-full rounded-full border border-slate-500"
      )}
      style={{
        background: orientation === "vertical" 
          ? "linear-gradient(to right, #334155, #475569, #334155)"
          : "linear-gradient(to bottom, #334155, #475569, #334155)",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1)"
      }}
    >
      <SliderPrimitive.Range 
        className={cn(
          "absolute bg-gradient-to-t from-amber-400 to-amber-200 shadow-sm",
          orientation === "vertical" 
            ? "w-full rounded-full" 
            : "h-full rounded-full"
        )}
        style={{
          background: orientation === "vertical"
            ? "linear-gradient(to top, #f59e0b, #fbbf24)"
            : "linear-gradient(to right, #f59e0b, #fbbf24)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.2)"
        }}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb 
      className="block h-6 w-4 rounded-sm border border-slate-400 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:shadow-xl"
      style={{
        background: "linear-gradient(to bottom, #f1f5f9, #e2e8f0, #cbd5e1)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)"
      }}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
