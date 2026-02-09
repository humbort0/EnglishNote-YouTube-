import { supabase } from '@/lib/supabase';
import { PostCard, Post } from '@/components/PostCard';

export const revalidate = 0; // Dynamic rendering for simplicity in this demo

export default async function Home() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading posts. Please try again later.
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 md:p-16 lg:p-24 bg-white font-sans">
      <header className="mb-12 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">My Minimal Blog</h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          A collection of thoughts, ideas, and snippets. Created with Next.js and Supabase.
        </p>
      </header>

      <div className="max-w-5xl mx-auto">
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <PostCard key={post.id} post={post as Post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-500 mb-2">No posts yet.</p>
            <p className="text-sm text-gray-400">Use the API endpoint <code>POST /api/new-post</code> to create one!</p>
          </div>
        )}
      </div>
    </main>
  );
}
