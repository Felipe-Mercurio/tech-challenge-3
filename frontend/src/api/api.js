const API_BASE = 'https://seu-backend-url.onrailway.app';

export async function getPosts() {
  const res = await fetch(`${API_BASE}/posts`);
  return res.json();
}

export async function searchPosts(query) {
  const res = await fetch(`${API_BASE}/posts/search?q=${encodeURIComponent(query)}`);
  return res.json();
}

export async function getPostById(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`);
  return res.json();
}

// ... outros métodos createPost, updatePost, deletePost, login etc.
