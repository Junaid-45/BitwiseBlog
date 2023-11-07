import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../slices/singlepostslice";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import { Facebook, Instagram, Twitter, User } from "lucide-react";

import parser from "html-react-parser";
import { useFirebaseContext } from "../firebase/FirebaseProvider";
import preview from "../assets/image-preview.png";

const SingleArticle = () => {
  const firebase = useFirebaseContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  const { post } = useSelector((state) => state.singlePostState);
  const { user } = useSelector((state) => state.userState);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (id) {
      firebase
        .getSinglePost(id)
        .then((post) => {
          console.log("IN SINGLE POST PAGE", post);
          dispatch(setPost(post));
          return firebase.getImage(post.thumbnail);
        })
        .then((url) => setImage(url))
        .catch((err) => toast.error(err.message || "Something went wrong"))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  // console.log(image)

  const handleDelete = async () => {
    try {
      if (id) {
        let res = await firebase.deletePost(id);
        if (res) {
          toast.success("Post Deleted Successfully");
          navigate("/articles");
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      console.log("ERROR IN SINGLE ARTICLE PAGE WHILE DELETING POST", error);
      toast.error(error.message || "Something went wrong");
    }
  };
  console.log("IN SINGLE ARTICLE PAGE", user);
  console.log("IN SINGLE ARTICLE PAGE", post);

  return isLoading ? (
    <div className="min-h-screen min-w-full flex items-center justify-center">
      <ScaleLoader color="#4f46e5" height={50} width={6} />
    </div>
  ) : (
    <div className="min-h-screen">
      <div className="max-w-[1080px] mx-auto  py-[50px]">
        <div className="flex items-center justify-between">
          <h1 className="text-[15px] text-[#1c1c1c] font-semibold flex items-center gap-3 ">
            <span className="bg-gray-300 p-2 rounded-full">
              <User className="stroke-gray-600" />
            </span>{" "}
            {post?.username || "Guest User"}
          </h1>
          <div className="flex items-center gap-4">
            <Facebook
              size={18}
              color="#8e8e8e"
              className="cursor-pointer hover:stroke-indigo-600 transition-all duration-200 hover:scale-125"
            />
            <Instagram
              size={18}
              color="#8e8e8e"
              className="cursor-pointer hover:stroke-indigo-600 transition-all duration-200 hover:scale-125"
            />
            <Twitter
              size={18}
              color="#8e8e8e"
              className="cursor-pointer hover:stroke-indigo-600 transition-all duration-200 hover:scale-125"
            />
          </div>
        </div>
        <div className="mt-5 mb-2">
          <h1 className="text-[35px] text-[#1c1c1c] font-bold leading-[55px]">
            {post?.title}
          </h1>
        </div>
        {post?.userid === user?.uid && (
          <div className="mb-3 flex gap-3 items-center">
            <button
              onClick={handleDelete}
              className="bg-red-500 rounded-lg py-[6px] px-4 text-white font-semibold text-[13px]"
            >
              Delete
            </button>
            <button
              onClick={() => {
                navigate(`/add-article?postid=${id}`);
              }}
              className="bg-orange-500 rounded-lg py-[6px] px-4 text-white font-semibold text-[13px]"
            >
              Update
            </button>
          </div>
        )}
        {/* <div>
          <p className="text-[15px] font-medium text-[#8e8e8e]">
            PUBLISHED :{" "}
            {format(
              new Date(post?.$createdAt),
              "eee, MMM d yyyy"
            ).toUpperCase()}{" "}
            <span>|</span> UPDATED AT :{" "}
            {format(
              new Date(post?.$updatedAt),
              "eee, MMM d yyyy"
            ).toUpperCase()}
          </p>
        </div> */}
        <div className="h-[411px] my-6">
          <img
            className="max-h-full object-contain object-center"
            src={image || preview}
            alt=""
          />
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#8e8e8e]">
            {post?.summary}
          </p>
        </div>
        <div className="my-[50px]">
          <div className="max-w-full w-[80%] mr-auto">
            {parser(post?.content)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;
