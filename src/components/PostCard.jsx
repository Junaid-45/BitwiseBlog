import { Heart, MessageCircle } from "lucide-react";
import React from "react";

const PostCard = ({ post, active, index }) => {
  return (
    <div
      className={`flex-shrink-0 max-w-[280px] max-h-[390px] h-[390px] rounded-2xl bg-white overflow-hidden`}
    >
      <div className="h-[60%]">
        <img className="h-full" src={post.thumbnail} alt={post.title} />
      </div>
      <div className="h-[40%] px-[18px] py-[10px]">
        <h2
          className="text-[14px] mb-[6px] font-semibold text-[#1c1c1c]"
          title={post.title}
        >
          {post.title.length > 27
            ? post.title.slice(0, 23) + "..."
            : post.title}
        </h2>
        <p className="text-[12px] font-medium text-[#424242]">
          {" "}
          {post.summary.length > 67
            ? post.summary.slice(0, 65) + "..."
            : post.summary}
        </p>
        <div className="flex justify-between items-center mt-[14px]">
          <div className="flex flex-col gap-2">
            <p className="text-[12px] font-medium text-[#4242426f]">10h ago</p>
            <p className="flex items-center gap-1 text-[12px] font-medium text-[#1c1c1c]">
              30 <Heart /> 24 <MessageCircle />
            </p>
          </div>
          <div>
            <button className="bg-indigo-600 py-3 font-semibold px-5 rounded-full text-white text-[12px]">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
