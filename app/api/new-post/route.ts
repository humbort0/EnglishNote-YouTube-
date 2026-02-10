import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseServerConfigured } from '@/lib/supabase-server';
import { CreatePostInput, ApiResponse, Post } from '@/lib/types';

export async function POST(request: Request) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseServerConfigured()) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Supabase is not configured. Please set environment variables.' },
        { status: 500 }
      );
    }

    // Parse request body
    const body: CreatePostInput = await request.json();
    const { title, content, tags = [] } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Validate title length
    if (title.length > 200) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Title must be 200 characters or less' },
        { status: 400 }
      );
    }

    // Validate content length
    if (content.length > 50000) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Content must be 50,000 characters or less' },
        { status: 400 }
      );
    }

    // Validate tags
    if (tags && !Array.isArray(tags)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Tags must be an array' },
        { status: 400 }
      );
    }

    if (tags && tags.length > 10) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Maximum 10 tags allowed' },
        { status: 400 }
      );
    }

    // Insert post into database
    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert([
        {
          title: title.trim(),
          content: content.trim(),
          tags: tags.map((tag: string) => tag.trim()).filter(Boolean),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Failed to create post. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json<ApiResponse<Post>>(
      { 
        message: 'Post created successfully', 
        data: data as Post 
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('API error:', err);
    
    // Handle JSON parse errors
    if (err instanceof SyntaxError) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    return NextResponse.json<ApiResponse<null>>(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Optional: Add GET endpoint to verify API is working
export async function GET() {
  const isConfigured = isSupabaseServerConfigured();
  
  return NextResponse.json(
    {
      message: 'Blog API is running',
      endpoint: '/api/new-post',
      method: 'POST',
      requiredFields: ['title', 'content'],
      optionalFields: ['tags'],
      supabaseConfigured: isConfigured,
    },
    { status: 200 }
  );
}
