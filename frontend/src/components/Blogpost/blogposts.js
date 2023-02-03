import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { csrfFetch } from '../../store/csrf';

function BlogPosts() {
  const [blogpost, setBlogPost] = useState({});
  const [additionalblogpost, setAdditionalBlogPost] = useState([]);
  let { slug } = useParams();
  let formattedPosts = [];

  useEffect(() => {
    const fetchBlogPost = async (slug) => {
      const response = await csrfFetch(`/api/posts/latest/${slug}`, {
        method: "GET"
      });
      const data = await response.json();
      setBlogPost(data)
    };
    
    const fetchAdditionalPosts = async () => {
      const response = await csrfFetch(`/api/posts/additional-posts`, {
        method: "GET"
      });
      const data = await response.json();
      data.forEach(post => {
        formattedPosts.push(<a href={`${post.canonicalUrl}`}>{post.title}</a>)
      })
      setAdditionalBlogPost(formattedPosts);
    };
    fetchBlogPost(slug);
    fetchAdditionalPosts()
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
            <img className="h-96 px-28 mt-20 w-5/6" src={blogpost.featuredImage}  alt="" />
          </div>
          <div className="flex justify-center">
            <h1 className="px-28 mt-20 text-4xl">{blogpost.title}</h1>
          </div>
          <p className="px-80 mt-20 text-l leading-8 tracking-wide font-serif">{blogpost.content}</p>
          <p className="px-80 mt-20 text-l leading-8 tracking-wide font-serif" >Related Links:</p>
          <p className="flex flex-col px-80 mt-6 text-l leading-8 tracking-wide font-serif">{additionalblogpost}</p>
        </div>
      </>
  );
};

export default BlogPosts;