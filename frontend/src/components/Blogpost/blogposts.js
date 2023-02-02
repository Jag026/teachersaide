import React, { useState, useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { csrfFetch } from '../../store/csrf';

function BlogPosts() {
  const [blogpost, setBlogPost] = useState({});
  let { slug } = useParams();

  useEffect(() => {
    const fetchBlogPost = async (slug) => {
      const response = await csrfFetch(`/api/posts/${slug}`, {
        method: "GET"
      });
      const data = await response.json();
      setBlogPost(data)
    };
    fetchBlogPost(slug);
  }, [slug]);

  return (
      <>
        <Helmet>
          <title>{blogpost.title}</title>
          <meta name="description" content={blogpost.description} />
          <meta property="og:title" content={blogpost.ogTitle} />
          <meta property="og:description" content={blogpost.ogDescription} />
          <meta property="og:image" content={blogpost.ogImage} />
          <meta property="og:url" content={blogpost.canonicalUrl} />
          <meta property="og:type" content="article" />
          <meta property="article:author" content={blogpost.author} />
          <meta property="article:published_time" content={blogpost.createdAt} />
          <meta property="article:modified_time" content={blogpost.updatedAt} />
          <meta property="article:section" content={blogpost.categories} />
          <meta property="article:tag" content={blogpost.categories} />
          <meta property="article:image" content={blogpost.featuredImage} />
          <meta property="twitter:card" content={blogpost.featuredImage} />
          <meta property="twitter:title" content={blogpost.title} />
          <meta property="article:description" content={blogpost.description} />
          <meta property="article:image" content={blogpost.featuredImage} />
          <link rel="canonical" href={blogpost.canonicalUrl} />
        </Helmet>
        <div className="flex flex-col">
          <div className="flex justify-center">
            <img className="h-96 px-28 mt-20 w-5/6" src={blogpost.featuredImage}  alt="computer in classroom" />
          </div>
          <div className="flex justify-center">
            <h1 className="px-28 mt-20 text-4xl">{blogpost.title}</h1>
          </div>
          <p className="px-80 mt-20 text-l leading-8 tracking-wide font-serif">{blogpost.content}</p>
        </div>
      </>
  );
};

export default BlogPosts;