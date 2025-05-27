"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSearchStore } from "@/store/searchStore"

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const resetSearch = useSearchStore(state => state.resetSearch)

  const handleHomeClick = () => {
    // Reset search state
    resetSearch()
    // Navigate to home
    router.push('/')
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              onClick={handleHomeClick}
              className="flex items-center text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              BookMatch
            </button>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium ${
                pathname === "/"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium ${
                pathname === "/about"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium ${
                pathname === "/contact"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 