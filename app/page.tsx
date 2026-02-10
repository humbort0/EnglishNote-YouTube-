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
      <div className="flex items-center justify-center min-h-screen text-red-500 font-sans">
        Error loading posts. Please try again later.
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 md:p-16 lg:p-24 bg-white font-sans selection:bg-[#f5f5f5]">
      <header className="mb-16 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
            📝
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#37352f]">
            Minimal Blog
          </h1>
        </div>
        <p className="text-xl text-[#37352f]/60 max-w-2xl leading-relaxed">
          A space for minimal thoughts and clean designs. Built with Next.js, Supabase, and Inter.
        </p>
      </header>

      <div className="max-w-6xl mx-auto">
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-[#37352f]/50 text-lg mb-2">No posts yet.</p>
            <p className="text-sm text-gray-400">
              Send a POST request to <code className="bg-gray-100 px-1 rounded text-[#37352f]">/api/new-post</code> to get started.
            </p>
          </div>
        )}
      </div>

      <footer className="mt-24 max-w-6xl mx-auto pt-8 border-t border-gray-100 flex justify-between items-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Minimal Blog</p>
        <div className="flex gap-4">
          <span className="hover:text-gray-600 cursor-pointer transition-colors">Twitter</span>
          <span className="hover:text-gray-600 cursor-pointer transition-colors">GitHub</span>
        </div>
      </footer>
    </main>
  );
}
