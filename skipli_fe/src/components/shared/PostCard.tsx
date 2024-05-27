import React from "react";
import {
  FacebookShareButton,
  EmailShareButton,
  FacebookIcon,
  EmailIcon,
} from "react-share";
import Button from "./Button";

type PostCardProps = {
  caption: string;
  shareUrl?: string;
  onClick: () => void;
  saveButton?: boolean;
};

const PostCard: React.FC<PostCardProps> = ({
  caption,
  shareUrl,
  onClick,
  saveButton = true,
}) => {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-white mb-4">
      <p>{caption}</p>
      <div className="flex gap-x-2 mt-2 items-center justify-end">
        <FacebookShareButton url={shareUrl ? shareUrl : ""}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <EmailShareButton url={caption} subject={`Check out the post`}>
          <EmailIcon size={32} round />
        </EmailShareButton>
        {saveButton && (
          <Button onClick={onClick} className="w-fit py-2 h-fit">
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
