import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY || 'AIzaSyClWtHeJOpsCJA8hL1Z7tFoi1C4llxKu1Q';

// API 키 디버깅
console.log('Environment variables:', {
  GOOGLE_BOOKS_API_KEY: process.env.GOOGLE_BOOKS_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
  API_KEY: API_KEY
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const orderBy = searchParams.get('orderBy') || 'relevance';
  const maxResults = searchParams.get('maxResults') || '8';

  console.log('API Key:', API_KEY);
  console.log('Query:', query);

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const url = `${BASE_URL}?q=${query}&orderBy=${orderBy}&maxResults=${maxResults}&key=${API_KEY}&langRestrict=en`;
    console.log('Request URL:', url);
    
    const res = await fetch(url);
    console.log('Response status:', res.status);
    
    const data = await res.json();
    console.log('Response data:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
} 