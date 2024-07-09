import { Sparkles } from "@react-three/drei";
import { Jar } from "./Jar.jsx";

export function JarScene({
    color, title, scale = 1,
    ...propsRest}) 
{
    return (
        <group {...propsRest} scale={scale}>
            <Jar color={color}/>
            <Sparkles 
            count={60}
            size={scale * 2}
            scale={[1.2, 2.2, 0]}
            position={[0, -0.5, 0]}
            color={color}
            />
        </group>
    );
}

function FireFly(props) 
{
    return (
        <Sparkles 
         count={50}
         scale={[1.5, 2, 1.5]}
         position={[0, 0, 0]}
        />
    );

}