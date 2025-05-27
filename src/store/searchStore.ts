import { create } from 'zustand'
import { Book } from '@/lib/books'

interface SearchState {
  keyword: string
  books: Book[]
  displayState: 'initial' | 'search'
  setKeyword: (keyword: string) => void
  setBooks: (books: Book[]) => void
  setDisplayState: (state: 'initial' | 'search') => void
  resetSearch: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  keyword: '',
  books: [],
  displayState: 'initial',
  setKeyword: (keyword) => set({ keyword }),
  setBooks: (books) => set({ books }),
  setDisplayState: (state) => set({ displayState: state }),
  resetSearch: () => set({ keyword: '', books: [], displayState: 'initial' }),
})) 