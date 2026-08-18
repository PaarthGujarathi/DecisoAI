import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Category palette mapping for Dark Decision Intelligence (Primary: Red)
const CATEGORY_COLORS = [
  "#E63946", // Primary Red
  "#FF3B30", // Bright Red
  "#10b981", // Revenue (Emerald)
  "#f59e0b", // Demand (Amber)
  "#8b5cf6", // Customers (Violet)
  "#5E2025", // Dark Muted Red
];

interface BusinessDataSceneProps {
  isTransitioning?: boolean;
}

// 1. Interactive 3D Bar Chart Grid Component
function DataTerrainBars({
  isTransitioning,
  isMobile,
}: {
  isTransitioning?: boolean;
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const barData = useMemo(() => {
    const items = [];
    const rows = isMobile ? 4 : 5;
    const cols = isMobile ? 4 : 6;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * 0.75 + (Math.random() * 0.2 - 0.1);
        const z = (r - rows / 2) * 0.75 + (Math.random() * 0.2 - 0.1);
        const color = CATEGORY_COLORS[(r + c) % CATEGORY_COLORS.length];
        const baseHeight = 0.4 + Math.random() * 0.8;
        const speed = 0.8 + Math.random() * 1.2;
        const phase = Math.random() * Math.PI * 2;

        items.push({ x, z, color, baseHeight, speed, phase });
      }
    }
    return items;
  }, [isMobile]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const speedFactor = isTransitioning ? 3.5 : 1;

    groupRef.current.children.forEach((child, idx) => {
      const data = barData[idx];
      if (!data) return;

      const scaleY =
        data.baseHeight +
        Math.sin(time * data.speed * speedFactor + data.phase) * 0.35 +
        0.3;

      child.scale.y = THREE.MathUtils.lerp(child.scale.y, Math.max(0.1, scaleY), 0.1);
      child.position.y = child.scale.y / 2;
    });

    if (isTransitioning) {
      groupRef.current.rotation.y += delta * 1.5;
    } else {
      groupRef.current.rotation.y = Math.sin(time * 0.15) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[1.2, -1.2, -0.5]}>
      {barData.map((bar, i) => (
        <mesh key={i} position={[bar.x, 0, bar.z]}>
          <boxGeometry args={[0.22, 1, 0.22]} />
          <meshStandardMaterial
            color={bar.color}
            roughness={0.3}
            metalness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

// 2. Floating Data Nodes & Connected Flow Paths
function DataNodesAndPaths({
  isTransitioning,
  isMobile,
}: {
  isTransitioning?: boolean;
  isMobile: boolean;
}) {
  const pointsGroupRef = useRef<THREE.Group>(null);
  const particlesGroupRef = useRef<THREE.Group>(null);
  const nodeCount = isMobile ? 14 : 26;

  const { nodes, lineGeometry, particles } = useMemo(() => {
    const pts = [];
    for (let i = 0; i < nodeCount; i++) {
      pts.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 3 + 0.5,
          (Math.random() - 0.5) * 4
        ),
        color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
        speed: 0.5 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        scale: 0.08 + Math.random() * 0.06,
      });
    }

    // Connect nearest nodes with path lines
    const linePositions: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dist = pts[i].position.distanceTo(pts[j].position);
        if (dist < 2.2) {
          linePositions.push(
            pts[i].position.x,
            pts[i].position.y,
            pts[i].position.z,
            pts[j].position.x,
            pts[j].position.y,
            pts[j].position.z
          );
        }
      }
    }

    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );

    // Particles traveling along data flows
    const particleList = [];
    for (let k = 0; k < (isMobile ? 12 : 25); k++) {
      const source = pts[k % pts.length].position;
      const target = pts[(k + 1) % pts.length].position;
      particleList.push({
        source,
        target,
        progress: Math.random(),
        speed: 0.2 + Math.random() * 0.4,
        color: CATEGORY_COLORS[k % CATEGORY_COLORS.length],
      });
    }

    return { nodes: pts, lineGeometry: lineGeom, particles: particleList };
  }, [nodeCount, isMobile]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const speedMult = isTransitioning ? 3 : 1;

    // Pulse nodes gently
    if (pointsGroupRef.current) {
      pointsGroupRef.current.children.forEach((mesh, idx) => {
        const node = nodes[idx];
        if (!node) return;
        const pulse = 1 + Math.sin(time * node.speed * speedMult + node.phase) * 0.25;
        mesh.scale.setScalar(node.scale * pulse);
      });
    }

    // Animate flow particles
    if (particlesGroupRef.current) {
      particlesGroupRef.current.children.forEach((pMesh, idx) => {
        const pData = particles[idx];
        if (!pData) return;

        pData.progress += delta * pData.speed * speedMult;
        if (pData.progress > 1) pData.progress = 0;

        pMesh.position.lerpVectors(pData.source, pData.target, pData.progress);
      });
    }
  });

  return (
    <>
      {/* Floating Nodes */}
      <group ref={pointsGroupRef}>
        {nodes.map((node, i) => (
          <mesh key={i} position={node.position}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.4}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Connected Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#94a3b8" transparent opacity={0.2} />
      </lineSegments>

      {/* Moving Particles */}
      <group ref={particlesGroupRef}>
        {particles.map((p, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color={p.color} transparent opacity={0.85} />
          </mesh>
        ))}
      </group>
    </>
  );
}

// 3. Camera Parallax & Smooth Interactive Controller
function CameraController({ isTransitioning }: { isTransitioning?: boolean }) {
  useFrame((state, delta) => {
    const { pointer, camera } = state;
    const targetX = pointer.x * 0.6;
    const targetY = -pointer.y * 0.35 + 1.2;
    const targetZ = isTransitioning ? -2 : 5;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 3);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 3);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 4);

    camera.lookAt(0.5, 0, 0);
  });

  return null;
}

// Main Canvas Scene Container
export default function BusinessDataScene({ isTransitioning }: BusinessDataSceneProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(59,130,246,0.12),_transparent_60%)]" />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 1.2, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.0} />
        <pointLight position={[-4, 3, -2]} intensity={0.8} color="#E63946" />

        {/* Subtle Spatial Grid Floor */}
        <gridHelper
          args={[16, 20, "#252529", "#17181B"]}
          position={[0, -1.2, 0]}
        />

        {/* 3D Scene Components */}
        <DataTerrainBars isTransitioning={isTransitioning} isMobile={isMobile} />
        <DataNodesAndPaths isTransitioning={isTransitioning} isMobile={isMobile} />
        <CameraController isTransitioning={isTransitioning} />
      </Canvas>
    </div>
  );
}
