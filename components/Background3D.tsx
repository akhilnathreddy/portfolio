"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

const FluidShader = {
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform float uScrollSpeed;
    uniform float uActivity;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      float ratio = uResolution.x / uResolution.y;
      uv.x *= ratio;
      
      vec2 mouse = uMouse;
      mouse.x *= ratio;
      
      float dist = distance(uv, mouse);
      float mouseInfluence = smoothstep(0.5, 0.0, dist);
      
      // Scroll influence on noise frequency and time
      float scrollEffect = uScrollSpeed * 2.0; // Extreme multiplier for visibility
      
      // Create swirling noise
      float n1 = snoise(uv * (3.0 + scrollEffect) + uTime * 0.1 + mouseInfluence);
      float n2 = snoise(uv * 6.0 - uTime * (0.2 + scrollEffect) + n1);
      float n3 = snoise(uv * 10.0 + uTime * 0.1 + n2);
      
      // Color mixing
      vec3 colorA = vec3(0.5, 0.0, 1.0); // Purple
      vec3 colorB = vec3(0.0, 0.8, 1.0); // Cyan
      vec3 colorC = vec3(1.0, 0.5, 0.0); // Orange
      
      // Shift colors based on scroll speed - make it brighter/more intense
      vec3 finalColor = mix(colorA, colorB, n1 * 0.5 + 0.5);
      finalColor = mix(finalColor, colorC, n2 * 0.5 + 0.5);
      
      // Add intensity flash on scroll
      finalColor += vec3(scrollEffect * 0.2);
      
      // Masking to create smoke shape - always visible, not faded by mouse
      float alpha = n3 * 0.5 + 0.5;
      
      // Brighter near mouse but always visible everywhere
      alpha = 0.3 + alpha * 0.5 + mouseInfluence * 0.2;
      
      // Add a base ambient swirl
      float ambient = snoise(uv * 2.0 + uTime * 0.05);
      alpha += ambient * 0.1;
      
      // Add subtle grain/noise
      float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
      finalColor += grain * 0.03;

      // Fade out when page is static (no activity)
      gl_FragColor = vec4(finalColor, alpha * uActivity);
    }
  `
};

function FluidPlane() {
    const mesh = useRef<THREE.Mesh>(null);
    const { viewport, size } = useThree();
    const scrollSpeed = useRef(0);
    const lastScrollY = useRef(0);
    const activity = useRef(1); // 0 = idle, 1 = active
    const lastMousePos = useRef({ x: 0.5, y: 0.5 });

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
            uScrollSpeed: { value: 0 },
            uActivity: { value: 1 },
        }),
        []
    );

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = Math.abs(currentScrollY - lastScrollY.current);
            scrollSpeed.current += delta * 2.0;
            scrollSpeed.current = Math.min(scrollSpeed.current, 300);
            lastScrollY.current = currentScrollY;
            activity.current = 1; // Mark as active
        };

        const handleMouseMove = () => {
            activity.current = 1; // Mark as active
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useFrame((state) => {
        if (mesh.current) {
            const material = mesh.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();

            // Decay scroll speed
            scrollSpeed.current = THREE.MathUtils.lerp(scrollSpeed.current, 0, 0.05);
            material.uniforms.uScrollSpeed.value = scrollSpeed.current;

            // Normalize mouse to 0..1
            const x = (state.mouse.x + 1) / 2;
            const y = (state.mouse.y + 1) / 2;

            // Check if mouse moved significantly
            const mouseDelta = Math.abs(x - lastMousePos.current.x) + Math.abs(y - lastMousePos.current.y);
            if (mouseDelta > 0.01) {
                activity.current = 1;
            }
            lastMousePos.current = { x, y };

            // Decay activity when idle
            activity.current = THREE.MathUtils.lerp(activity.current, 0, 0.01);
            material.uniforms.uActivity.value = activity.current;

            // Smooth lerp for mouse
            material.uniforms.uMouse.value.lerp(new THREE.Vector2(x, y), 0.1);
            material.uniforms.uResolution.value.set(size.width, size.height);
        }
    });

    return (
        <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={FluidShader.vertexShader}
                fragmentShader={FluidShader.fragmentShader}
                transparent
                depthWrite={false}
            />
        </mesh>
    );
}

export default function Background3D() {
    return (
        <>
            <div className="fixed inset-0 -z-20 bg-white" />
            <div className="fixed inset-0 -z-10">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <FluidPlane />
                </Canvas>
            </div>
        </>
    );
}
