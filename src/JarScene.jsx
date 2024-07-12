import { Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Jar } from "./Jar.jsx";
import * as THREE from 'three';
import { useRef } from "react";

export function JarScene({
    color, title, scale = 1, 
    particles=30,
    particleFieldScale=[1.5, 2, 1.5],
    particleFieldPosition=[0, -0.4, 0],
    ...propsRest}) 
{

    return (
        <group {...propsRest} scale={scale}>
            <Jar color={ new THREE.Color(color)}/>
            <Sparkles 
            count={particles}
            size={scale * 2}  
            scale={particleFieldScale}
            position={particleFieldPosition}
            color={ new THREE.Color(color) }
            />
        </group>
    );
}