import React from "react";

type PostCardProps = {
  children: React.ReactNode;
};

const PostCard: React.FC<PostCardProps> = ({ children }) => {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-white mb-4">
      {children}
    </div>
  );
};

export default PostCard;
