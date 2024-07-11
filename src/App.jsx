import { useLayoutEffect, useState } from 'react';
import './App.css';
import { Canvas, useLoader, useThree } from '@react-three/fiber'; 

import  { Jar } from './Jar.jsx';
import { JarScene } from './JarScene.jsx';
import { BoxStack } from './BoxStack.jsx'

import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';


const min = (a, b) => a < b ? a : b

// Component containing environment lighting and Jar Scene Prototype
function Scene(props) {
  
  // normalize position and size of rendered scene to window size of user
  const { viewport } = useThree();
  const [jarScale, setJarScale] = useState(viewport.width / 10);

  // function for determining Jar Scale based on window size
  useLayoutEffect(() => {
    const updateSize = () => setJarScale(min(window.width / 100., 10));
    window.addEventListener('resize', updateSize);
  }, []);


  return (
    <>
      {/* Add landing page text and interface */}

      {/* add environment lighting */}
      <Environment preset={"city"} />
      <directionalLight intensity={2} position={[0, 2, 3]} /> 
      
      {/* add objects in scene */}
      <JarScene 
        scale={(viewport.width**.8+6) / 10.} 
        position={[-viewport.width/4.5, 0, 0]} 
        color={new THREE.Color( 'gold' )}
      />

      
    </>
  ); 
}

// Landing Page Prototype
function App() {

  return (
    <>
      <h1 className='landing'>Thought Deposit</h1>
      
       {/**orthographic camera plays better with 2D interface*/}
        <Canvas orthographic
          camera = {{
            zoom: 60,
            position: [0, 0, 5]
          }}
          dpr = {window.devicePixelRatio}  
          style = {{background: '#00000000'}}
        >
          <Scene />
        </Canvas>
        {/* Add landing page text and interface */}
      </>
  );
}

export default App;
