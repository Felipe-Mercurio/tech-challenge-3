import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api/api';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const data = await getPostById(id);
      setPost(data);
    }
    fetchPost();
  }, [id]);

  if (!post) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p><b>Autor:</b> {post.author}</p>
      <p>{post.content}</p>
    </div>
  );
}
