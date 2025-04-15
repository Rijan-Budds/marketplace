import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to Dashboard!</h1>
      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
}
