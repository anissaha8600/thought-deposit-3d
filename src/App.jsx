import { Suspense, useState, useRef } from 'react';
import './App.css';
import { Canvas, useLoader, useThree } from '@react-three/fiber'; 

import  { Jar } from './Jar.jsx';
import { BoxStack } from './BoxStack.jsx'

import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';



function Scene(props) {
  
  const { viewport } = useThree();

  return (
    <>
      {/* add environment lighting */}
      <Environment preset={"city"} />
      <directionalLight intensity={2} position={[0, 2, 3]} /> 
      
      {/* add objects in scene */}
      <Jar scale={viewport.width / 10} position={[-viewport.width /5, 0, 0]}/>
    </>
  ); 
}

function App() {

  return (
      
     // orthographic camera plays better with 2D interface
      <Canvas orthographic
        camera = {{
          zoom: 60,
          position: [0, 0, 5]
        }}
        dpr = {window.devicePixelRatio}  
        style = {{background: '#040404'}}
      >
        <Scene />

        
      </Canvas>
  );
}

export default App;
