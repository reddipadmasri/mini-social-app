import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; // Use environment variable

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email: email.trim(),
        password: password.trim()
      });

      // Store token & username
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);

      // Go to Social page
      navigate('/social');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || 'Login failed. Check your credentials.');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>
      <TextField
        label="Email"
        fullWidth
        sx={{ mb: 2 }}
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        sx={{ mb: 2 }}
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <Button variant="contained" sx={{ mb: 2 }} onClick={login}>
        Login & Go Social
      </Button>

      <p>
        Don't have an account? <a href="/signup">Signup here</a>
      </p>
    </div>
  );
}
