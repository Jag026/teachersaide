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
          <meta property="og:type" content="article" />
          <meta property="article:author" content={blogpost.author} />
          <meta property="article:published_time" content={blogpost.createdAt} />
          <meta property="article:modified_time" content={blogpost.updatedAt} />
          <meta property="article:section" content={blogpost.categories} />
          <meta property="article:tag" content={blogpost.categories} />
          <meta property="og:image" content={blogpost.featuredImage} />
          <link rel="canonical" href={blogpost.canonicalUrl} />
        </Helmet>
        <div>
          <h1>{blogpost.title}</h1>
          <p>{blogpost.content}</p>
        </div>
      </>
  );
};

export default BlogPosts;