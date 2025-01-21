import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Gallery() {
  const [images, setImages] = useState([]);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    // Récupérer la liste des images
    axios.get('http://localhost:4000/images')
      .then(res => {
        setImages(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleLike = async (imageId) => {
    try {
      await axios.post(
        `http://localhost:4000/images/${imageId}/like`,
        {}, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert('Liked!');
    } catch (error) {
      alert('Erreur lors du like');
    }
  };

  const handleDislike = async (imageId) => {
    try {
      await axios.post(
        `http://localhost:4000/images/${imageId}/dislike`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert('Disliked!');
    } catch (error) {
      alert('Erreur lors du dislike');
    }
  };

  return (
    <div>
      <h2>Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map(img => (
          <div key={img.id} style={{ margin: 10 }}>
            <img src={img.url} alt={img.description} width="200" />
            <p>{img.description}</p>
            <button onClick={() => handleLike(img.id)}>Like</button>
            <button onClick={() => handleDislike(img.id)}>Dislike</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;