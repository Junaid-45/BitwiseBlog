import { Heart, MessageSquare, StarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import preview from "../assets/image-preview.png";
import { Link } from "react-router-dom";
import { useFirebaseContext } from "../firebase/FirebaseProvider";

const ArticleCard = ({ post, id }) => {
  const firebase = useFirebaseContext();
  const [image, setImage] = useState("");

  useEffect(() => {
    firebase
      .getImage(post.thumbnail)
      .then((url) => {
        setImage(url);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="flex h-[180px] overflow-hidden p-[15px] w-full gap-4 shadow-sm shadow-gray-300 rounded-xl my-3 bg-white ">
      <div className="w-[150px] h-[140px] rounded-2xl overflow-hidden">
        {" "}
        <img
          className="h-full w-full  object-cover object-center"
          src={image || preview}
          alt=""
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h2 className="pl-2 text-[15px] font-semibold">{post.title}</h2>
          <p className="pl-2 text-[13px] text-[#4242426e]">12h ago</p>
        </div>
        <p className="pl-2 text-[13px] text-[#424242] mb-2">
          {post.summary.length > 280
            ? post.summary.slice(0, 250) + "..."
            : post.summary || "No Summary Provided"}
          ...
        </p>
        <p className="text-[14px] font-medium text-[#1c1c1c] flex gap-2 items-center mb-2 pl-2">
          {post.username || "Guest"} <StarIcon size={18} />
        </p>
        <div className="flex justify-between items-center my-3">
          <div>
            <span className="bg-green-600 py-2 px-3 text-[12px] font-bold text-white tracking-wider rounded-3xl">
              Environment
            </span>
          </div>
          <div className="flex gap-5">
            <div className="flex text-[14px] text-[#1c1c1c] font-semibold items-center gap-1">
              41 <Heart size={17} /> 21 <MessageSquare size={17} />
            </div>
            <div>
              <Link
                to={`/article/${id}`}
                className="bg-indigo-600 text-white py-2 text-[13px] px-4 rounded-full cursor-pointer"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
