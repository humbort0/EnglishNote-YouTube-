import { getPostData, getSortedPostsData } from '@/lib/posts';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <article className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors font-medium flex items-center gap-2">
            ← Back to home
          </Link>
        </div>

        <header className="mb-10 text-center">
          <div className="mb-4">
             <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
               {postData.category}
             </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 leading-tight">
            {postData.title}
          </h1>
          <div className="text-gray-500">
            <time dateTime={postData.date}>
              {format(parseISO(postData.date), 'MMMM d, yyyy')}
            </time>
          </div>
        </header>

        {postData.thumbnail && (
          <div className="relative w-full h-64 md:h-96 mb-12 rounded-2xl overflow-hidden shadow-sm">
            <Image
              src={postData.thumbnail}
              alt={postData.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-blue-600 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
        />
      </div>
    </article>
  );
}
