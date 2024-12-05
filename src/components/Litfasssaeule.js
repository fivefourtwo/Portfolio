import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Litfasssaeule() {
  const { scene } = useGLTF('/litfass.glb'); // Modellpfad relativ zum 'public'-Ordner
  const [rotation, setRotation] = useState([0, 0, 0]); // Startrotation [x, y, z]

  // Scroll-Handler für die Drehung
  const handleWheel = (event) => {
    // Verhindern, dass die Seite scrollt
    event.preventDefault();
    
    // Drehung basierend auf dem Scroll-Wert
    setRotation((prevRotation) => [
      prevRotation[0], // Keine Drehung auf der X-Achse
      prevRotation[1] + event.deltaY * 0.01, // Drehung auf der Y-Achse basierend auf scrollen
      prevRotation[2], // Keine Drehung auf der Z-Achse
    ]);
  };

  return (
    <>
      {/* 3D-Canvas */}
      <Canvas
        camera={{
          position: [3, 2, 15], // Kamera-Position
          fov: 50,
        }}
        style={{ height: '100vh', width: '100%' }}
        onWheel={handleWheel} // Scroll-Handler hinzufügen
      >
        {/* Beleuchtung */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        {/* Litfaßsäule */}
        <primitive
          object={scene}
          position={[0, -4, 0]}
          scale={[2, 2, 2]}
          rotation={rotation} // Anwendung der Rotation auf das Modell
        />
      </Canvas>
    </>
  );
}

export default Litfasssaeule;
