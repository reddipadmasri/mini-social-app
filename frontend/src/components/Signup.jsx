import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; // Use environment variable

  const signup = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      // Store token + username immediately after signup
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);

      // Navigate to social feed
      navigate('/social');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || 'Signup failed. Email may already exist.');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Signup</h2>
      <TextField
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        sx={{ mt: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        sx={{ mt: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={signup}>
        Signup
      </Button>
    </div>
  );
}
