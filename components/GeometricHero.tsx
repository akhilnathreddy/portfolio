"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, TorusKnot, Float, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function AnimatedShape() {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh
                ref={mesh}
                scale={hovered ? 1.2 : 1}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
                <MeshDistortMaterial
                    color={hovered ? "#ec4899" : "#6366f1"}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
}

export default function GeometricHero() {
    return (
        <div className="absolute top-0 right-0 w-full h-full md:w-1/2 md:h-full z-0 opacity-50 md:opacity-100 pointer-events-auto">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 5]} intensity={1} />
                <AnimatedShape />
            </Canvas>
        </div>
    );
}
