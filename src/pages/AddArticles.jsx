import React, { useEffect, useState } from "react";
import { Image, User } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFirebaseContext } from "../firebase/FirebaseProvider";

const AddArticles = () => {
  const firebase = useFirebaseContext();
  const navigate = useNavigate();
  const [query] = useSearchParams();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const { user } = useSelector((state) => state.userState);
  const [preview, setPreview] = useState("");

  const postid = query.get("postid");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user && title && slug && content && thumbnail && summary) {
        if (postid) {
          // update here
          let res = await firebase.updatePost(postid, {
            title,
            slug,
            content,
            thumbnail,
            summary,
          });
          if (res) {
            toast.success("Post Updated Successfully");
            navigate("/");
          } else {
            toast.error("Something went wrong while creating post");
          }
        } else {
          let res = await firebase.uploadFile({
            file: thumbnail,
            title,
            slug,
            content,
            userid: user?.uid,
            username: user.name || "Guest",
            summary,
          });
          if (res) {
            toast.success("Post Created Successfully");
            navigate("/");
          } else {
            toast.error("Something went wrong while creating post");
          }
        }
        //   console.log("RESPONSE IN ADD ARTICLE", res);
      } else {
        toast.error("All Fields are required");
      }
    } catch (error) {
      console.log("ERROR IN ADD ARTICLE", error);
    }
  };

  useEffect(() => {
    if (postid) {
      firebase
        .getSinglePost(postid)
        .then((post) => {
          setTitle(post.title);
          setSlug(post.slug);
          setSummary(post.summary);
          setThumbnail(post.thumbnail);
          setContent(post.content);
        })
        .catch(console.log);
    }
  }, []);

  useEffect(() => {
    setSlug(title.trim().toLowerCase().split(" ").join("-"));
  }, [title]);

  // console.log(thumbnail)

  return (
    <div>
      <div className="max-w-[1080px]  mx-auto py-[30px] mt-[50px]">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Add Post
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoComplete="title"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Post Title...."
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Slug
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="slug"
                        id="slug"
                        disabled
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        autoComplete="slug"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Post Slug...."
                      />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a slug for this post.
                  </p>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="summary"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Summary
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="summary"
                        id="summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        autoComplete="summary"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Post Summary in less than 150 characters...."
                      />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a slug for this post.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Thumbnail
                  </label>
                  <div className="mt-2 flex items-center gap-x-3  ">
                    <span className="flex w-fit items-center gap-3">
                      {preview ? (
                        <>
                          <img
                            className="h-[50px] w-[50px] rounded-full overflow-hidden object-cover object-center "
                            src={preview}
                            alt=""
                          />
                          <span className="h-fit rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            {thumbnail.name.slice(0, 12) + "..."}
                          </span>
                        </>
                      ) : (
                        <User
                          className="h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("fileinput").click()
                      }
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      {thumbnail ? "Change" : "Upload"} Thumbnail
                    </button>
                    <input
                      onChange={(e) => {
                        let reader = new FileReader();

                        reader.onload = function (file) {
                          setPreview(file.target.result);
                        };
                        reader.readAsDataURL(e.target.files[0]);
                        setThumbnail(e.target.files[0]);
                      }}
                      type="file"
                      id="fileinput"
                      accept="image/*"
                      className="sr-only"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Content
                  </label>
                  <Editor
                    initialValue="Please Enter Some text here..."
                    init={{
                      branding: false,
                      toolbar: [
                        "image link lists numlist bullist undo redo | formatselect | bold italic | alignleft aligncentre alignright alignjustify | indent outdent | copy paste cut",
                      ],
                    }}
                    plugins={[
                      "image",
                      "anchor",
                      "link",
                      "emoticons",
                      "wordcount",
                      "lists",
                      "quickbars table media autoresize help",
                    ]}
                    onEditorChange={(value) => setContent(value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticles;
