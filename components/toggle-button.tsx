"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI.
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // If the component has not mounted yet, render nothing or a placeholder to avoid the mismatch.
  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-7 w-14 items-center rounded-full bg-gray-200 px-1 transition-colors duration-500 dark:bg-card"
    >
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-all duration-500 ease-in-out transform ${
          isDark ? "translate-x-7 rotate-180" : "translate-x-0 rotate-0"
        }`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-gray-700 transition-opacity duration-500 rotate-180" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-yellow-500 transition-opacity duration-500" />
        )}
      </div>
    </button>
  )
}