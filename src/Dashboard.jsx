import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import logo from './assets/logo.jpg';

export default function Dashboard() {
  const navigate = useNavigate();

  const [showPostForm, setShowPostForm] = useState(false);
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState('');
  const [price, setPrice] = useState(''); 

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); 
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Caption:', caption);
    console.log('Images:', images);

    setImages([]);
    setCaption('');
    setShowPostForm(false);
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <img src={logo} alt="Logo" className="dashboard-logo" />
      </header>

      <div className="dashboard-container">
        <h1>This will be the marketplace main page</h1>

        <button className="make-post-button" onClick={() => setShowPostForm(prev => !prev)}>
          Make a Post
        </button>

        {showPostForm && (
  <>
    <div className="post-form-overlay" onClick={() => setShowPostForm(false)} />
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <p>{images.length}/5 images selected</p>

      <textarea
        placeholder="Enter caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <textarea
        placeholder="Enter price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button type="submit">Post</button>
      <button type="button" onClick={() => setShowPostForm(false)}>Cancel</button>
    </form>
  </>
)}


        <button className="logout-button" onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}>Logout</button>
      </div>
    </div>
  );
}
