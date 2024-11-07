import { useState } from 'react';
import axios from 'axios';

const SearchPage = ({ onImageSelect }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const res = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: { query, per_page: 25 },
      headers: {
        Authorization: `Client-ID J-7n3DDKuFSexD5xUsQbuU0rEQHUwsnRACXhqTeZ-ww`,
      },
    });
    setImages(res.data.results);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images"
      />
      <button onClick={fetchImages}>Search</button>
      <div>
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={image.urls.small}
              alt={image.description}
              onClick={() => onImageSelect(image.urls.full)}
              style={{ width: '100px', cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
