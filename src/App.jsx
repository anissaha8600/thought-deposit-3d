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
      {/* nav bar */}
      <div className='nav'>
        <span className='logo'>
          <button>Emotion</button>
        </span>
        <span className='nav-items'>
          <button id="nav-about">About</button>
          <button id="nav-pricing">Pricing</button>
          <button id="nav-contact">Contact Us</button>
          <button id="nav-sign-in">Sign In</button>
        </span>
      </div>

      {/* hero content */}
      <div className="content">

        {/* full view of emotion jar */}
        <div className="jar-section">
          <p>Jar goes here</p>
        </div>

        {/* hero page text + call to action */}
        <div className="landing-text-section">
          <h1>Deposit Your</h1>
          <h1 className="emotion-flair">Gratitude</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Inspired by Inside Out.</p>
          <div className="button-bar">
            <button className="btn-primary">Try Free</button>
            <button className="btn-secondary">Sign in</button>
          </div>
        </div>
      </div>
    </>
  );
}

function AppCanvas() {

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
