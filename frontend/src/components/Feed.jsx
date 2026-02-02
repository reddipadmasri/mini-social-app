{posts.map(p => (
  <div key={p._id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
    <b>{p.username}</b>

    {p.text && <p>{p.text}</p>}

    {p.image && (
      <img
        src={p.image}
        alt="post"
        style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }}
      />
    )}

    <p>👍 Likes: {p.likes.length}</p>
    <Button size="small" onClick={() => like(p._id)}>Like</Button>

    <p>💬 Comments: {p.comments.length}</p>
  </div>
))}
