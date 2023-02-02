import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";

function CreateBlogpost(props) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [categories, setCategories] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [tags, setTags] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.addBlogpost({ 
        slug, 
        title, 
        description, 
        content, 
        ogTitle, 
        ogDescription, 
        ogImage, 
        canonicalUrl, 
        author, 
        categories,
        featuredImage, 
        tags,
        password
     })).then(() => {window.location = `/posts/${slug}`})
  };


  return (
    <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className="flex flex-col">
          <label className="mx-4 text-l">
            Enter a slug
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="mx-2 mt-4 h-10 w-14 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
            Enter a title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mx-2 mt-4 h-10 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
           description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mx-2 mt-4 h-10 w-14 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
           OG Title
            <input
              type="text"
              value={ogTitle}
              onChange={(e) => setOgTitle(e.target.value)}
              required
              className="mx-2 mt-4 h-10 w-14 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
           OG Description
            <input
              type="text"
              value={ogDescription}
              onChange={(e) => setOgDescription(e.target.value)}
              required
              className="mx-2 mt-4 h-10 w-14 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
           OG Image
            <input
              type="text"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              required
              className="mx-2 mt-4 h-10 w-14 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
           CanonicalUrl
            <input
              type="text"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              required
              className="mx-2 mt-4 h-10 w-14 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
           Author
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="mx-2 mt-4 h-10 w-14 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
           Categories
            <input
              type="text"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              required
              className="mx-2 mt-4 h-10 w-14 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
          Featured Image
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              required
              className="mx-2 mt-4 h-10 w-14 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
          Tags
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
              className="mx-2 mt-4 h-10 w-14 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
          Password
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mx-2 mt-4 h-10 w-14 p-2 border border-sky-500"
            />
          </label>
          <label className="mx-4 text-l">
           Content
            <textarea
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="mx-2 mt-4 h-10 p-2 border border-sky-500"
            />
          </label>
          </div>
          <button className="m-6 mt-10 w-28 h-10 bg-slate-300 border text-l" type="submit">Create Post</button>
        </form>
    </div>
  );
}

export default CreateBlogpost;