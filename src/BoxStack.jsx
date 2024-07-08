import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// procedural component for generating a stack of boxes of varying sizes and rotation (just playing around)
export function BoxStack({
    count=3, 
    sizeRange=[0.5,1.5],
    xOffsetRange = [-0.01, 0.01],
    zOffsetRange = [-0.01, 0.01], 
    ...propsRest}) 
  {
    
    // generate boxes
    const boxes = [];
    const refs = [];

    let ypos = 0.0;
    let { xOffset, zOffset } = [0., 0.];
    for (let i=0; i<count; i++) {

      // generate random scale factor and rotation
      const scale = Math.random() * (sizeRange[1]-sizeRange[0]) + sizeRange[0]
      const yRotation = Math.random() * 2*Math.PI;
      
      ypos += scale/2.0; // ensure boxes stack nicely on top of eachother

      // add box to stack
      boxes.push(
        <Box 
          position={[0, ypos, 0]}
          rotation={[0, yRotation, 0]}
          scale={[scale, scale, scale]}
          key={`box-stack-${i}`}
        />
      );

      // increment y-position for next box
      ypos += scale/2.0;
    }
  
    return (
      <group {...propsRest}>
        {boxes}
      </group>
    );
}

function Box(props) {
  const ref = useRef();
  const rotationSpeed = Math.random();
  useFrame(() => {
    ref.current.rotation.y += 0.06 * rotationSpeed - 0.02;
  });

  return (
    <mesh {...props}
      ref={ref}
    >
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>

  );
  
}