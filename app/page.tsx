import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { PostCard } from '@/components/PostCard';
import { Post } from '@/lib/types';

export const revalidate = 0; // Always fetch fresh data

async function getPosts(): Promise<Post[]> {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured');
      return [];
    }

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    return (data as Post[]) || [];
  } catch (error) {
    console.error('Unexpected error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();
  const isConfigured = isSupabaseConfigured();

  return (
    <main className="min-h-screen p-8 md:p-16 lg:p-24 bg-white font-sans">
      <header className="mb-12 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          My Minimal Blog
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          A collection of thoughts, ideas, and snippets. Created with Next.js and Supabase.
        </p>
      </header>

      <div className="max-w-5xl mx-auto">
        {!isConfigured ? (
          <div className="text-center py-20 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-yellow-700 mb-2 font-medium">⚠️ Configuration Required</p>
            <p className="text-sm text-yellow-600">
              Please set up your Supabase environment variables in Vercel.
            </p>
            <p className="text-xs text-yellow-500 mt-2">
              Required: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
            </p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-500 mb-2">No posts yet.</p>
            <p className="text-sm text-gray-400">
              Use the API endpoint <code className="px-2 py-1 bg-gray-100 rounded">POST /api/new-post</code> to create one!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
