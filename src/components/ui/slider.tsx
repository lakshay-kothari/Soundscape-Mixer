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
        "relative grow overflow-hidden rounded-full",
        orientation === "vertical" 
          ? "h-full w-2" 
          : "h-2 w-full"
      )}
      style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <SliderPrimitive.Range 
        className={cn(
          "absolute rounded-full",
          orientation === "vertical" 
            ? "w-full" 
            : "h-full"
        )}
        style={{
          background: orientation === "vertical"
            ? "linear-gradient(to top, #a855f7, #3b82f6, #ec4899)"
            : "linear-gradient(to right, #a855f7, #3b82f6, #ec4899)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        }}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb 
      className="block h-4 w-4 rounded-full border border-white/40 bg-white/30 backdrop-blur-md shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
