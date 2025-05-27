export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  imageUrl: string;
  genre: string;
}

const API_KEY = 'AIzaSyCGo7c8btl4Rqk5AyUB49_av54wuLcQhW4';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export async function searchBooks(query: string): Promise<Book[]> {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}&maxResults=8`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json();
    
    if (!data.items) {
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ['Unknown Author'],
      description: item.volumeInfo.description || 'No description available',
      imageUrl: item.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.png',
      genre: item.volumeInfo.categories?.[0] || 'Uncategorized',
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

export async function getFeaturedBooks(): Promise<Book[]> {
  try {
    // Featured books are selected based on high ratings and recent publications
    const response = await fetch(
      `${BASE_URL}?q=subject:fiction&orderBy=newest&key=${API_KEY}&maxResults=8&langRestrict=en`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch featured books');
    }

    const data = await response.json();
    
    if (!data.items) {
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ['Unknown Author'],
      description: item.volumeInfo.description || 'No description available',
      imageUrl: item.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.png',
      genre: item.volumeInfo.categories?.[0] || 'Uncategorized',
    }));
  } catch (error) {
    console.error('Error fetching featured books:', error);
    return [];
  }
}

export async function getRecommendedBooks(): Promise<Book[]> {
  try {
    const response = await fetch(
      `${BASE_URL}?q=subject:technology&key=${API_KEY}&maxResults=8&langRestrict=en`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch recommended books');
    }

    const data = await response.json();
    
    if (!data.items) {
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ['Unknown Author'],
      description: item.volumeInfo.description || 'No description available',
      imageUrl: item.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.png',
      genre: item.volumeInfo.categories?.[0] || 'Uncategorized',
    }));
  } catch (error) {
    console.error('Error fetching recommended books:', error);
    return [];
  }
}

// Genre-based color mapping
// export const genreColors: Record<string, string> = {
//   'Fiction': 'bg-blue-100',
//   'Science Fiction': 'bg-blue-100',
//   'Fantasy': 'bg-blue-100',
//   'Mystery': 'bg-blue-100',
//   'Romance': 'bg-blue-100',
//   'Thriller': 'bg-blue-100',
//   'Business': 'bg-purple-100',
//   'Economics': 'bg-purple-100',
//   'Finance': 'bg-purple-100',
//   'Science': 'bg-yellow-100',
//   'Physics': 'bg-yellow-100',
//   'Biology': 'bg-yellow-100',
//   'Chemistry': 'bg-yellow-100',
//   'Philosophy': 'bg-red-100',
//   'Psychology': 'bg-red-100',
//   'Self-Help': 'bg-green-100',
//   'Biography': 'bg-green-100',
//   'History': 'bg-green-100',
//   'default': 'bg-gray-100',
// };

// export function getGenreColor(genre: string): string {
//   return genreColors[genre] || genreColors.default;
// } 