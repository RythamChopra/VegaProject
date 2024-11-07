import { useState } from 'react';
import CanvasEditor from './components/CanvasEditor';
import SearchPage from './components/SearchPage';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #000000, #4b4b4b)', 
      minHeight: '90vh', 
      minWidth: '100vh',
      borderRadius: '10px', 
      color: '#fff',
      border: '2px solid grey'
    }}>
    
      <h1 style={{ textAlign: 'center', padding: '20px' }}>Weird Photos for Vega....</h1>
      

      <SearchPage onImageSelect={setSelectedImage} />

      {selectedImage && <CanvasEditor imageUrl={selectedImage} />}
    </div>
  );
};

export default App;
