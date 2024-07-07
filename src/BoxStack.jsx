import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// procedural component for generating a stack of boxes of varying sizes and rotation
export function BoxStack({
    count=3, 
    sizeRange=[0.5,1.5],
    xOffsetRange = [-0.01, 0.01],
    zOffsetRange = [-0.01, 0.01], 
    ...propsRest}) 
  {
    
    // generate boxes
    const boxes = [];
    let ypos = 0.0;
    let { xOffset, zOffset } = [0., 0.];
    for (let i=0; i<count; i++) {

        // generate random scale factor and rotation
        const scale = Math.random() * (sizeRange[1]-sizeRange[0]) + sizeRange[0]
        const yRotation = Math.random() * 2*Math.PI;
        
        ypos += scale/2.0;

        /** animate 
        const boxRef = useRef();
        const rotateSpeed = Math.random();
        useFrame((state, delta) => {
            boxRef.current.rotation.y += delta * rotateSpeed;
        });*/

        // add box to stack
        boxes.push(
        <mesh 
         position={[0, ypos, 0]}
         rotation={[0, yRotation, 0]}
         scale={[scale, scale, scale]}
        >
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
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