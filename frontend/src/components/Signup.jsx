import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });

      // Store token + username immediately after signup
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);

      navigate('/social');
    } catch (err) {
      console.error(err);
      alert('Signup failed. Email may already exist.');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Signup</h2>
      <TextField label="Username" fullWidth onChange={e => setUsername(e.target.value)} />
      <TextField label="Email" fullWidth sx={{ mt: 2 }} onChange={e => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth sx={{ mt: 2 }} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" sx={{ mt: 2 }} onClick={signup}>Signup</Button>
    </div>
  );
}
