import React from 'react';
import { useTexture } from '@react-three/drei';

function Flyer({ texturePath, position, rotation, onClick }) {
  const texture = useTexture(texturePath); // Lade die Textur (Bild)

  return (
    <mesh
      position={position}
      rotation={rotation}
      onClick={onClick}
      castShadow // Optional: wirft Schatten
    >
      <planeGeometry args={[2, 3]} /> {/* Größe des Flyers */}
      <meshStandardMaterial map={texture} /> {/* Textur auftragen */}
    </mesh>
  );
}

export default Flyer;
