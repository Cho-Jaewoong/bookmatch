import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - BookMatch",
  description: "Learn more about BookMatch - Your AI Book Recommendation Service",
}

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About BookMatch</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Welcome to BookMatch</h2>
            <p className="text-gray-700 mb-4">
              BookMatch is your go-to platform for discovering books that match your interests. Whether you're looking for the latest bestsellers, exploring new genres, or searching for specific topics, we've got you covered.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Featured Books: Discover the latest and most popular books</li>
              <li>Recommended Books: Find curated selections based on current trends</li>
              <li>Smart Search: Search for books by title, author, or topic</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Browse our featured and recommended books on the home page</li>
              <li>Use the search bar to find specific books or topics</li>
              <li>Click on any book to view more details</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">For Everyone</h2>
            <p className="text-gray-700">
              Whether you're a student, professional, or casual reader, BookMatch helps you find your next great read. Our platform is designed to make book discovery simple and enjoyable for everyone.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 