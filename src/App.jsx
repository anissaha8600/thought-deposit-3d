import { useLayoutEffect, useState, useEffect, useRef } from 'react';
import './App.css';

// fonts
import "./fonts/OtomanopeeOne-Regular.ttf";

// 3JS
import { Canvas, useLoader, useThree } from '@react-three/fiber'; 
import  { Jar } from './Jar.jsx';
import { JarScene } from './JarScene.jsx';
import { BoxStack } from './BoxStack.jsx'

import { View, OrbitControls, Environment, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { color, faceDirection } from 'three/examples/jsm/nodes/Nodes.js';


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
      <Lighting/>

      
      {/* add objects in scene */}
      <JarScene 
        scale={(viewport.width**.8+6) / 10.} 
        position={[-viewport.width/4.5, 0, 0]} 
        color={new THREE.Color( 'gold' )}
      />
    </>
  ); 
}



// lighting for scene
function Lighting() {
  return (
    <>
      {/* add environment lighting */}
      <Environment preset={"city"} />
      <directionalLight intensity={2} position={[0, 2, 3]} /> 
    </>
  );
}

// Landing Page Prototype
function App() {
  const emotionProperties = [
    {
      'name' : 'Gratitude',
      'color' : 'gold'
    },
    {
      'name' : 'Sadness',
      'color' : 'blue'
    },
    {
      'name' : 'Anger',
      'color' : 'red'
    },
    {
      'name' : 'Fear',
      'color' : 'purple'
    },
    {
      'name' : 'Envy',
      'color' : 'green'
    },
    {
      'name' : 'Joy',
      'color' : 'yellow'
    },
    {
      'name' : 'Anxiety',
      'color' : 'orange'
    },
    {
      'name' : 'Excitement',
      'color' : "rgb(250, 231, 122)" 
    },
    {
      'name' : 'Faith',
      'color' : "white"
    }    
  ];

  // reference for r3f canvas event source
  const ref = useRef(); 

  // we will be using these states and references to cycle through 
  // emotions and their corresponding colors
  const [currentEmotionId, setCurrentEmotionId] = useState(0);
  const [fade, setFade] = useState(true);
  const emotionHeader = useRef(); // reference to emotion header in hero section
  const jarSceneRefs = [useRef(), useRef()]; // reference to Jar models

  // iterate through colors
  useEffect(() => {
    const display_duration = 10000;
    const fade_duration = 1000;

    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentEmotionId((old) => (old+1) % emotionProperties.length);
        setFade(true);
      }, fade_duration);
    }, display_duration);

    return () => clearInterval(intervalId);
    }, []);

  return (
    <div className="landing">
      

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
        <div ref={ref} className="jar-section">
          {/* background animation render */}
          <View index={1} className="back-jar">
            <color attach="background" args={['#000']}/>
            <OrthographicCamera makeDefault 
              position={[0, 0, 11]}
              rotation={[0, 0, 0]}
              
              zoom={100}
            />
            <Lighting color={emotionProperties[currentEmotionId].color} />
            <JarScene 
              position={[-8, 5, 0]}
              scale={10} 
              color={emotionProperties[currentEmotionId].color} 

              particles={0}
              particleFieldScale={[.5, .5, 0]}
              particleFieldPosition={[0.4, -.5, 0]}
            />
          </View>
          <View index={2} className="side-jar">
            <color attach="background" args={['#000']}/>
            <OrthographicCamera makeDefault 
              position={[0, 0, 4]}
              rotation={[0, 0, 0]}
              
              zoom={100}
            />
            <Lighting color={emotionProperties[currentEmotionId].color} />
            <JarScene color={emotionProperties[currentEmotionId].color} />
          </View>
        </div>

        {/* hero page text + call to action */}
        <div className="landing-text-section">
          <h1>Deposit Your</h1>
          <h1 
            ref={emotionHeader} className="emotion-flair" 
            style={{
              'color': emotionProperties[currentEmotionId].color,
              'textShadow' : `1px 1px 10px ${emotionProperties[currentEmotionId].color}`,
              'opacity': fade ? 1 : 0,
              'transition': 'opacity 1s ease-in-out'
            }}
          >
            {emotionProperties[currentEmotionId].name}
          </h1>
          <p className="landing-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Inspired by Inside Out.</p>
          <div className="button-bar">
            <button className="btn-primary">Try Free</button>
            <button className="btn-secondary">Sign in</button>
          </div>
        </div>
      </div>
      <Canvas eventSource={ref} className="canvas">
        <View.Port />
      </Canvas>
    </div>
  );
}

export default App;
