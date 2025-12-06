import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md transition-all text-sm font-medium",
        variant === "default" &&
          "bg-white/10 border border-white/20 hover:bg-white/20",
        variant === "ghost" &&
          "hover:bg-white/10",
        className
      )}
      {...props}
    />
  );
      }

