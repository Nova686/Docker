import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Gallery() {
  const [images, setImages] = useState([]);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    axios.get('http://localhost:4000/images')
      .then(res => setImages(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleLike = async (imageId) => {
    try {
      await axios.post(
        `http://localhost:4000/images/${imageId}/like`,
        {}, 
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      alert('Liked!');
    } catch {
      alert('Erreur lors du like');
    }
  };

  const handleDislike = async (imageId) => {
    try {
      await axios.post(
        `http://localhost:4000/images/${imageId}/dislike`,
        {},
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      alert('Disliked!');
    } catch {
      alert('Erreur lors du dislike');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gallery</h2>
      <div className="row">
        {images.map(img => (
          <div key={img.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={img.url} className="card-img-top" alt={img.description} />
              <div className="card-body">
                <p className="card-text">{img.description}</p>
                <button className="btn btn-success me-2" onClick={() => handleLike(img.id)}>Like</button>
                <button className="btn btn-danger" onClick={() => handleDislike(img.id)}>Dislike</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;