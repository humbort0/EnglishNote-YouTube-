import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PostData } from '@/lib/posts';
import { format, parseISO } from 'date-fns';

interface PostCardProps {
  post: PostData;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`} className="block group h-full">
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="relative w-full h-48 overflow-hidden bg-gray-50">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="p-5 flex flex-col flex-grow">
          {/* Category */}
          <div className="mb-3">
            <span className="inline-block px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h2>

          {/* Date */}
          <div className="mt-auto pt-4 flex items-center text-sm text-gray-500 border-t border-gray-50">
            <time dateTime={post.date}>
              {format(parseISO(post.date), 'MMMM d, yyyy')}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
};
