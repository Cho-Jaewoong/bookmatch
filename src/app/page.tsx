"use client"

import { useState, useEffect } from "react"
import { searchBooks, getFeaturedBooks, getRecommendedBooks, type Book } from "@/lib/books"
import Image from "next/image"
import { BookModal } from "@/components/book-modal"
import { useSearchStore } from "@/store/searchStore"

export default function Home() {
  const [keyword, setKeyword, books, setBooks, displayState, setDisplayState] = useSearchStore(state => [
    state.keyword,
    state.setKeyword,
    state.books,
    state.setBooks,
    state.displayState,
    state.setDisplayState,
  ]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([])
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([])

  useEffect(() => {
    const loadInitialBooks = async () => {
      try {
        const [featured, recommended] = await Promise.all([
          getFeaturedBooks(),
          getRecommendedBooks()
        ]);
        setFeaturedBooks(featured);
        setRecommendedBooks(recommended);
      } catch (err) {
        console.error('Error loading initial books:', err);
      }
    };

    loadInitialBooks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const results = await searchBooks(keyword)
      setBooks(results)
      setDisplayState('search')
    } catch (err) {
      setError("Failed to fetch books. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const BookGrid = ({ books, title }: { books: Book[], title: string }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {books.map((book) => (
          <div 
            key={book.id} 
            className={`p-4 rounded-lg transition-colors duration-300 cursor-pointer hover:shadow-lg`}
            onClick={() => setSelectedBook(book)}
          >
            <div className="flex flex-col">
              <div className="relative w-full h-48 mb-3">
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                  {book.authors.join(", ")}
                </p>
                <span className="text-sm text-gray-500 mb-2 block">
                  {book.genre}
                </span>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {book.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Find Your Next Book</h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keywords (e.g., fiction, business, science, philosophy)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {error && (
          <div className="text-red-600 text-center mb-4">
            {error}
          </div>
        )}

        {displayState === 'initial' ? (
          <>
            {featuredBooks.length > 0 && (
              <BookGrid books={featuredBooks} title="Featured Books" />
            )}

            {recommendedBooks.length > 0 && (
              <BookGrid books={recommendedBooks} title="Recommended Books" />
            )}
          </>
        ) : (
          <>
            {books.length > 0 && (
              <BookGrid books={books} title="Search Results" />
            )}

            {!loading && books.length === 0 && keyword && (
              <div className="text-center text-gray-500 mb-8">
                No books found. Try different keywords.
              </div>
            )}
          </>
        )}

        <BookModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
        />
      </div>
    </div>
  )
}
