import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import Flyer from './flyer'; // Flyer-Komponente importieren

function Litfasssaeule() {
  const { scene } = useGLTF('/litfass.glb'); // Modellpfad relativ zum 'public'-Ordner
  const [rotation, setRotation] = useState([0, 0, 0]); // Rotation der Litfaßsäule
  const [selectedFlyer, setSelectedFlyer] = useState(null); // Für Pop-up

  // Drehung der Litfaßsäule durch Scrollen
  const handleScroll = (event) => {
    setRotation((prevRotation) => [0, prevRotation[1] + event.deltaY * 0.001, 0]);
  };

  const handleFlyerClick = (id) => {
    setSelectedFlyer(id);
  };

  return (
    <div
      onWheel={handleScroll} // Scroll-Event-Listener
      style={{ height: '100vh', width: '100%', overflow: 'hidden' }} // Verhindert Seitenscrollen
    >
      {/* 3D-Canvas */}
      <Canvas
        camera={{
          position: [3, 2, 15],
          fov: 50,
        }}
        style={{ height: '100vh', width: '100%' }}
      >
        {/* Beleuchtung */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        {/* Litfaßsäule */}
        <primitive
          object={scene}
          position={[0, -4, 0]}
          scale={[2, 2, 2]}
          rotation={rotation} // Rotation der Litfaßsäule
        />

        {/* Flyer */}
        <Flyer
          texturePath="/flyers/project1.png"
          position={[0, 2, 2.5]}
          rotation={[0, 0, 0]}
          onClick={() => handleFlyerClick(1)}
        />
        <Flyer
          texturePath="/flyers/project2.png"
          position={[1.5, 0, 2]}
          rotation={[0, 0.5, 0]}
          onClick={() => handleFlyerClick(2)}
        />
        <Flyer
          texturePath="/flyers/project3.png"
          position={[-1.5, -2, 2]}
          rotation={[0, -0.5, 0]}
          onClick={() => handleFlyerClick(3)}
        />
      </Canvas>

      {/* Pop-up für Flyer */}
      {selectedFlyer && (
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
          onClick={() => setSelectedFlyer(null)}
        >
          <h2>Projekt {selectedFlyer}</h2>
          <p>Details über das Projekt {selectedFlyer}...</p>
          <button>Mehr erfahren</button>
        </div>
      )}
    </div>
  );
}

export default Litfasssaeule;
