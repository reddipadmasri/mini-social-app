import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Social.css";

export default function Social() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [theme, setTheme] = useState("light"); // light or dark
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch posts (useCallback to avoid useEffect warning)
  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/posts`, {
        headers: { "x-auth-token": token },
      });

      const enhancedPosts = res.data.map((p) => ({
        ...p,
        likes: [],
        comments: [],
        showCommentInput: false,
      }));
      setPosts(enhancedPosts);
    } catch (err) {
      console.error(err);
    }
  }, [API_URL, token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Create post
  const submitPost = async () => {
    if (!text && !image) return;

    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post(`${API_URL}/api/posts`, formData, {
        headers: { "x-auth-token": token },
      });

      setPosts([{ ...res.data, likes: [], comments: [], showCommentInput: false }, ...posts]);
      setText("");
      setImage(null);
    } catch (err) {
      alert("Failed to create post");
    }
  };

  // Like / Unlike
  const toggleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p._id === postId
          ? {
              ...p,
              likes: p.likes.includes(username)
                ? p.likes.filter((u) => u !== username)
                : [...p.likes, username],
            }
          : p
      )
    );
  };

  // Toggle comment input
  const toggleCommentInput = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p._id === postId ? { ...p, showCommentInput: !p.showCommentInput } : p
      )
    );
  };

  // Add comment
  const addComment = (postId, commentText) => {
    if (!commentText) return;
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p._id === postId
          ? {
              ...p,
              comments: [...p.comments, { user: username, text: commentText }],
              showCommentInput: false,
            }
          : p
      )
    );
  };

  // Share post
  const sharePost = async (post) => {
    try {
      await navigator.clipboard.writeText(
        `${username} shared a post:\n${post.text}\n(From TaskPlanet App)`
      );
      alert("Post copied! You can share it anywhere 🌟");
    } catch {
      alert("Clipboard copy failed!");
    }
  };

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="container navbar-content">
          <div className="logo">
            <span>TaskPlanet</span>
          </div>

          <div className="user-profile">
            <img src={`https://ui-avatars.com/api/?name=${username}`} alt="user" />
            <span>{username}</span>
            <button className="theme-btn" onClick={toggleTheme}>
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
      </header>

      {/* FEED */}
      <main className="container main-feed">
        {/* CREATE POST */}
        <section className="card post-input-card">
          <div className="post-input-header">
            <img
              className="avatar"
              src={`https://ui-avatars.com/api/?name=${username}`}
              alt="user"
            />
            <textarea
              placeholder="Share something with the world..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="post-input-footer">
            <input
              type="file"
              hidden
              id="imageUpload"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button
              className="icon-btn"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              📷
            </button>

            <button className="btn-primary" onClick={submitPost}>
              Post
            </button>
          </div>
        </section>

        {/* POSTS */}
        {posts.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6B7280" }}>
            No posts yet. Be the first one ✨
          </p>
        ) : (
          posts.map((p) => (
            <article className="card feed-post" key={p._id}>
              <div className="post-header">
                <img
                  className="avatar"
                  src={`https://ui-avatars.com/api/?name=${p.username}`}
                  alt={p.username}
                />
                <div className="post-meta">
                  <h3>{p.username}</h3>
                  <span className="timestamp">
                    {new Date(p.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="post-content">
                <p>{p.text}</p>
                {p.image && (
                  <div className="post-image-container">
                    <img src={`${API_URL}/${p.image}`} className="post-media" alt="post" />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="post-actions">
                <button className="action-btn" onClick={() => toggleLike(p._id)}>
                  {p.likes.includes(username) ? "❤️ Liked" : "👍 Like"} ({p.likes.length})
                </button>
                <button className="action-btn" onClick={() => toggleCommentInput(p._id)}>
                  💬 Comment ({p.comments.length})
                </button>
                <button className="action-btn" onClick={() => sharePost(p)}>
                  🔗 Share
                </button>
              </div>

              {/* Inline Comment Input */}
              {p.showCommentInput && (
                <div className="comment-input">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addComment(p._id, e.target.value);
                    }}
                  />
                </div>
              )}

              {/* Comments */}
              {p.comments.length > 0 && (
                <div className="post-comments">
                  {p.comments.map((c, i) => (
                    <div key={i} className="comment">
                      <b>{c.user}:</b> {c.text}
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))
        )}
      </main>
    </>
  );
}
