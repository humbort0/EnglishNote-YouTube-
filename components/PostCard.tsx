import React from 'react';

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  tags?: string[];
}

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group cursor-pointer">
      <h2 className="text-xl font-bold text-[#37352f] mb-2 transition-colors">
        {post.title}
      </h2>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={`${post.id}-tag-${index}`}
              className="px-2.5 py-0.5 bg-gray-100 text-[#37352f] text-[10px] uppercase tracking-wider rounded-md font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-[#37352f]/70 text-sm mb-6 line-clamp-4 flex-grow leading-relaxed">
        {post.content}
      </p>

      <div className="text-[11px] text-gray-400 mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
        <time dateTime={post.created_at} className="font-medium">
          {new Date(post.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-300 font-bold">
          →
        </span>
      </div>
    </div>
  );
};
