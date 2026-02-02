import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

export default function CreatePost({ refresh }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const username = localStorage.getItem('username');

  const post = async () => {
    if (!text && !image) {
      alert('Post must have text or image');
      return;
    }

    await axios.post('http://localhost:5000/api/posts', {
      username,
      text,
      image
    });

    setText('');
    setImage('');
    refresh();
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <TextField
        label="Write something..."
        fullWidth
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <TextField
        label="Image URL (optional)"
        fullWidth
        sx={{ mt: 1 }}
        value={image}
        onChange={e => setImage(e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 1 }} onClick={post}>
        Create Post
      </Button>
    </div>
  );
}
