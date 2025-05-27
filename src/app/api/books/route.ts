import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const url = `${BASE_URL}?q=${query}&maxResults=8&key=${API_KEY}&langRestrict=en`;
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
} 