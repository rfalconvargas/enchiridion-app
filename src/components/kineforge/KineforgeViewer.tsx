"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Html } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { SpinosaurusModel } from "@/components/three/SpinosaurusModel";
import { PlaceholderModel } from "@/components/three/PlaceholderModel";
import { ModelErrorBoundary } from "@/components/three/ModelErrorBoundary";

/**
 * Kineforge hero viewer — the same Spinosaurus reconstruction the rest of the
 * Enchiridion app ships, re-lit for a cinematic, volcanic stage: a warm amber
 * key light, a teal science rim, and a soft contact shadow on a dark floor.
 *
 * It deliberately reuses the production model + error boundary, so a missing or
 * broken GLB degrades to the on-brand placeholder rather than an empty frame.
 */

const CAMERA: [number, number, number] = [4.5, 1.6, 8];

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <span className="h-7 w-7 animate-spin rounded-full border-2 border-ds-primary/30 border-t-ds-primary" />
        <span className="text-[11px] uppercase tracking-[0.18em] text-ds-faint">
          Loading specimen
        </span>
      </div>
    </Html>
  );
}

export default function KineforgeViewer({
  autoRotate = true,
  onInteract,
}: {
  autoRotate?: boolean;
  onInteract?: () => void;
}) {
  const controls = useRef<OrbitControlsImpl | null>(null);

  // R3F auto-sizes from a ResizeObserver on its container. When the canvas
  // mounts inside a lazily-loaded, still-animating wrapper it can lose that
  // first measurement and stick at the 300×150 default. Nudge a remeasure on
  // the first two frames so it always fills its stage.
  useEffect(() => {
    // Fire across the entrance-animation settle window, not just the first
    // frame — the wrapper's aspect-ratio height resolves a beat after mount.
    const timers = [0, 120, 360, 700].map((t) =>
      setTimeout(() => window.dispatchEvent(new Event("resize")), t)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      // Continuous frames only while the turntable spins; once it stops (user
      // interaction or reduced-motion) render on demand so the page goes idle.
      frameloop={autoRotate ? "always" : "demand"}
      // Measure from offsetWidth/Height — robust inside aspect-ratio containers.
      resize={{ offsetSize: true }}
      camera={{ position: CAMERA, fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#0a0807"), 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      {/* Low ambient so the volcanic dark reads; key/rim do the shaping. */}
      <hemisphereLight intensity={0.28} color="#ffd8a3" groundColor="#0a0807" />
      {/* Amber forge key light. */}
      <directionalLight
        position={[6, 7, 4]}
        intensity={2.6}
        color="#ffb24d"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      {/* Teal science rim — keeps the Enchiridion DNA, separates the silhouette. */}
      <directionalLight position={[-7, 2, -5]} intensity={1.4} color="#2dd4bf" />
      {/* Soft fill from below to lift the belly out of pure black. */}
      <pointLight position={[0, -3, 3]} intensity={12} distance={14} color="#c97e10" />

      <Suspense fallback={<Loader />}>
        <ModelErrorBoundary fallback={<PlaceholderModel autoRotate={autoRotate} />}>
          {/* Camera does the turntable (below); keep the model itself still. */}
          <SpinosaurusModel autoRotate={false} scale={1} />
        </ModelErrorBoundary>
      </Suspense>

      <ContactShadows
        position={[0, -1.7, 0]}
        opacity={0.55}
        scale={16}
        blur={2.6}
        far={5}
        color="#000000"
      />

      <OrbitControls
        ref={controls}
        enablePan={false}
        minDistance={4}
        maxDistance={12}
        maxPolarAngle={Math.PI / 1.9}
        enableDamping
        dampingFactor={0.08}
        autoRotate={autoRotate}
        autoRotateSpeed={0.4}
        onStart={onInteract}
      />
    </Canvas>
  );
}
