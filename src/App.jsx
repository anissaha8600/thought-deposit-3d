import { Suspense, useState, useRef } from 'react';
import './App.css';
import { Canvas, useLoader } from '@react-three/fiber'; 

import  { Jar } from './Jar.jsx';
import { BoxStack } from './BoxStack.jsx'

import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';



function JarScene(props) {
  //const { scene } = useGLTF('./assets/jar.glb');
  //return <primative object={scene} {...props} />

  return (
    <Jar />
  ); 
}

function App() {
  const [count, setCount] = useState(0);
  //const gtlf = useLoader(GLTFLoader, '/assets/jar.glb');

  return (
      
     // orthographic camera plays better with 2D interface
      <Canvas orthographic
        camera = {{
          zoom: 100,
          position: [0, 0, 4]
        }}
        dpr = {window.devicePixelRatio}  
        an
      >
        {/* add environment lighting */}
        <Environment preset={"city"} />
        <directionalLight intensity={2} position={[0, 2, 3]} /> 
        
        {/* add objects in scene */}
        <Jar />
        <BoxStack count={2} scale={[0.2, 0.2, 0.2]} />

        <OrbitControls />
        
      </Canvas>
  );
}

export default App;
