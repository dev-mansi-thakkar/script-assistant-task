import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Button, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validUsername = 'user';
  const validPassword = 'user';

  const handleLogin = () => {
    if (!username || !password) {
      setError('Both fields are required');
      return;
    }
    if (username === validUsername && password === validPassword) {
      login();
      navigate('/resources');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-xl rounded-lg p-8 h-96 w-96 m-5">
        <div className="text-center pb-5">
          <h1 className="text-2xl font-bold">Login</h1>
        </div>
        <TextInput
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <TextInput
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}
        <Button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
