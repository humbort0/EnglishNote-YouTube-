import React from 'react';
import { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200 flex flex-col h-full group">
      <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {post.title}
      </h2>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag, index) => (
            <span
              key={`${post.id}-tag-${index}`}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
        {post.content}
      </p>

      <div className="text-xs text-gray-400 mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
        <time dateTime={post.created_at}>
          {new Date(post.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>
    </div>
  );
};
