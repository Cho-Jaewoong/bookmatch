import { Book } from "@/lib/books"
import Image from "next/image"

interface BookModalProps {
  book: Book | null
  onClose: () => void
}

export function BookModal({ book, onClose }: BookModalProps) {
  if (!book) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{book.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-6">
            <div className="relative w-48 h-72 flex-shrink-0">
              <Image
                src={book.imageUrl}
                alt={book.title}
                fill
                className="object-cover rounded-md"
              />
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">저자</h3>
                <p className="text-gray-600">{book.authors.join(", ")}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">장르</h3>
                <p className="text-gray-600">{book.genre}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">설명</h3>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {book.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 