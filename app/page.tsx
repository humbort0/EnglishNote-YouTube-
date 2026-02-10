import { getSortedPostsData } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            My Blog
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            A collection of thoughts, ideas, and snippets.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
