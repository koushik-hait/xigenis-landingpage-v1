import Image from "next/image"
import LogoImage from "@/assets/megaabyte.png"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showTagline?: boolean
  variant?: "light" | "dark"
  className?: string
}

export function Logo({ size = "md", showTagline = true, variant = "light", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: {
      image: "h-8 w-8",
      text: "text-lg",
      tagline: "text-xs",
    },
    md: {
      image: "h-8 w-8",
      text: "text-xl",
      tagline: "text-xs",
    },
    lg: {
      image: "h-20 w-20",
      text: "text-3xl",
      tagline: "text-sm",
    },
  }

  const variantClasses = {
    light: {
      text: "text-foreground",
      tagline: "text-primary",
    },
    dark: {
      text: "text-white",
      tagline: "text-primary",
    },
  }

  const currentSize = sizeClasses[size]
  const currentVariant = variantClasses[variant]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`flex-shrink-0 ${currentSize.image}`}>
        <Image
          src={LogoImage}
          alt="Xigenis Logo"
          width={size === "lg" ? 64 : 32}
          height={size === "lg" ? 64 : 32}
          className="h-full w-full"
        />
      </div>
      <div>
        <span className={`font-heading block ${currentSize.text} leading-tight font-bold ${currentVariant.text}`}>
          XIGENIS
        </span>
        {showTagline && (
          <span className={`${currentSize.tagline} font-medium ${currentVariant.tagline}`}>
            Real Estate AI Pipeline
          </span>
        )}
      </div>
    </div>
  )
}
