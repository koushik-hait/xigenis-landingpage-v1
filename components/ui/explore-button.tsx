import Link from "next/link"
import { cn } from "@/lib/utils"
import React from "react"

interface ExploreButtonProps {
  children?: React.ReactNode
  href?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  className?: string
  iconClassName?: string
}

export const ExploreButton = ({
  children,
  href,
  onClick,
  type = "button",
  className,
  iconClassName,
}: ExploreButtonProps) => {
  const content = (
    <>
      {children || "Explore"}
      <svg
        className={cn(
          "h-8 w-8 rotate-45 justify-end rounded-full border border-white/30 p-2 text-white duration-300 ease-linear group-hover:rotate-90 group-hover:border-none group-hover:bg-white group-hover:text-orange-700",
          iconClassName
        )}
        viewBox="0 0 16 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
          className="fill-white group-hover:fill-orange-700"
        ></path>
      </svg>
    </>
  )

  const classes = cn(
    "explore-btn max-w-max relative flex justify-center gap-2 items-center shadow-xl text-lg text-white bg-orange-700 border-2 border-orange-700 rounded-full px-6 py-3 overflow-hidden group cursor-pointer hover:text-white transition-colors duration-300",
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
