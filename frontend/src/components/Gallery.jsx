import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Gallery() {
  const [images, setImages] = useState([]);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    axios.get('https://api.unsplash.com/photos/random?client_id=nJpedc5nw_yajfU-EInqACpZjFLYsMmvLUbDRcebLVw', {
      params:
      {
        count: 5,
        orientation: "portrait"
      }
    })
      .then(res => setImages(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleLike = async (image) => {
    try {
      await axios.post(
        `http://localhost:4000/images/${image.id}/like`,
        {
          url: image.urls.regular
        },
        {
          headers: { 'Authorization': `Bearer ${token}` },

        }
      );
      alert('Liked!');
    } catch {
      if(!token){
        alert('Veuillez vous connecter');
      }
      else{
        alert('Erreur lors du like');
      }
    }
  };

  const handleDislike = async (image) => {
    try {
      await axios.post(
        `http://localhost:4000/images/${image.id}/dislike`,
        {
          url: image.urls.regular
        },
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );
      alert('Disliked!');
    } catch {
      if(!token){
        alert('Veuillez vous connecter');
      }
      else{
        alert('Erreur lors du dislike');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gallery</h2>
      <div className="row">
        {images.map(img => (
          <div key={img.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={img.urls.regular} className="card-img-top" alt={img.description} />
              <div className="card-body">
                <p className="card-text">{img.alt_description}</p>
                <button className="btn btn-success me-2" onClick={() => handleLike(img)}>Like</button>
                <button className="btn btn-danger" onClick={() => handleDislike(img)}>Dislike</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;