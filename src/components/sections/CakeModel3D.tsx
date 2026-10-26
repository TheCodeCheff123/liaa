import { Suspense, useRef, useEffect, useState, Component, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/base_basic_shaded.glb';

// ─── Error boundary ───────────────────────────────────────────────────────────
class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}

// ─── Shared interaction state ─────────────────────────────────────────────────
interface InteractionState {
  // Mouse/gyro passive tilt (when not dragging)
  tiltX: number;
  tiltY: number;
  // Drag rotation accumulator
  rotY: number;
  rotX: number;
  isDragging: boolean;
  lastX: number;
  lastY: number;
}

function useInteraction() {
  const state = useRef<InteractionState>({
    tiltX: 0, tiltY: 0,
    rotY: 0, rotX: 0,
    isDragging: false, lastX: 0, lastY: 0,
  });

  useEffect(() => {
    const s = state.current;

    // ── Passive tilt (mouse hover, no drag) — wider range = more movement ────
    function onMouseMove(e: MouseEvent) {
      if (s.isDragging) return;
      s.tiltX = (e.clientY / window.innerHeight - 0.5) * 0.9;
      s.tiltY = (e.clientX / window.innerWidth  - 0.5) * 1.2;
    }

    // ── Gyroscope (mobile passive tilt) ─────────────────────────────────────
    function onOrientation(e: DeviceOrientationEvent) {
      if (s.isDragging) return;
      s.tiltX = Math.max(-45, Math.min(45, e.beta  ?? 0)) / 45 * 0.3;
      s.tiltY = Math.max(-45, Math.min(45, e.gamma ?? 0)) / 45 * 0.4;
    }

    // ── Drag / rotate ────────────────────────────────────────────────────────
    function startDrag(x: number, y: number) {
      s.isDragging = true;
      s.lastX = x;
      s.lastY = y;
    }
    function moveDrag(x: number, y: number) {
      if (!s.isDragging) return;
      const dx = x - s.lastX;
      const dy = y - s.lastY;
      s.rotY += dx * 0.008;
      s.rotX += dy * 0.005;
      s.rotX = Math.max(-0.6, Math.min(0.6, s.rotX)); // clamp vertical
      s.lastX = x;
      s.lastY = y;
    }
    function endDrag() { s.isDragging = false; }

    // Mouse
    function onMouseDown(e: MouseEvent) { startDrag(e.clientX, e.clientY); }
    function onMouseMoveDoc(e: MouseEvent) { moveDrag(e.clientX, e.clientY); }
    function onMouseUp() { endDrag(); }

    // Touch
    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
    }
    function onTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
    }
    function onTouchEnd() { endDrag(); }

    window.addEventListener('mousemove',       onMouseMove,    { passive: true });
    window.addEventListener('deviceorientation', onOrientation, { passive: true });
    document.addEventListener('mousedown',     onMouseDown);
    document.addEventListener('mousemove',     onMouseMoveDoc, { passive: true });
    document.addEventListener('mouseup',       onMouseUp);
    document.addEventListener('touchstart',    onTouchStart,   { passive: true });
    document.addEventListener('touchmove',     onTouchMove,    { passive: true });
    document.addEventListener('touchend',      onTouchEnd);

    return () => {
      window.removeEventListener('mousemove',       onMouseMove);
      window.removeEventListener('deviceorientation', onOrientation);
      document.removeEventListener('mousedown',     onMouseDown);
      document.removeEventListener('mousemove',     onMouseMoveDoc);
      document.removeEventListener('mouseup',       onMouseUp);
      document.removeEventListener('touchstart',    onTouchStart);
      document.removeEventListener('touchmove',     onTouchMove);
      document.removeEventListener('touchend',      onTouchEnd);
    };
  }, []);

  return state;
}

// ─── 3D scene ─────────────────────────────────────────────────────────────────
function CakeScene({
  interaction,
  onReady,
}: {
  interaction: React.MutableRefObject<InteractionState>;
  onReady: () => void;
}) {
  const { scene } = useGLTF(MODEL_URL) as { scene: THREE.Group };
  const groupRef    = useRef<THREE.Group>(null);
  const { viewport, camera, size } = useThree();
  const firedReady  = useRef(false);

  const isMobile = size.width < 640;
  const DESKTOP  = { camZ: 4.2, scale: 0.34, baseY: -0.12 };
  const MOBILE   = { camZ: 7.2, scale: 0.26, baseY: -0.65 };
  const cfg = isMobile ? MOBILE : DESKTOP;

  const appliedCamZ = useRef(cfg.camZ);
  useFrame(() => {
    if (!groupRef.current) return;
    const s = interaction.current;

    if (Math.abs(camera.position.z - cfg.camZ) > 0.01) {
      camera.position.z = cfg.camZ;
      appliedCamZ.current = cfg.camZ;
    }

    if (s.isDragging) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, s.rotY, 0.28);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, s.rotX, 0.28);
    } else {
      s.rotY = THREE.MathUtils.lerp(s.rotY, s.tiltY, 0.10);
      s.rotX = THREE.MathUtils.lerp(s.rotX, s.tiltX, 0.10);
      groupRef.current.rotation.y = s.rotY;
      groupRef.current.rotation.x = s.rotX;
    }

    groupRef.current.position.y = cfg.baseY + Math.sin(Date.now() * 0.001) * 0.03;

    // Fire onReady after the scene has rendered at least one frame
    if (!firedReady.current) {
      firedReady.current = true;
      onReady();
    }
  });

  return (
    <group ref={groupRef} scale={viewport.width * cfg.scale}>
      <primitive object={scene} />
    </group>
  );
}

// ─── Exported canvas component ────────────────────────────────────────────────
export default function CakeModel3D({ fallback }: { fallback: ReactNode }) {
  const interaction = useInteraction();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { useGLTF.preload(MODEL_URL); }, []);

  return (
    <ModelErrorBoundary fallback={<div className="w-full h-full flex items-end justify-center">{fallback}</div>}>
      <div className="relative w-full h-full" style={{ cursor: 'grab' }}>
        {/* Fallback image — stays until the 3D scene fires its first frame */}
        <div
          className="absolute inset-0 flex items-end justify-center pointer-events-none"
          style={{
            opacity: loaded ? 0 : 1,
            transition: loaded ? 'opacity 0.8s ease' : 'none',
          }}
        >
          {fallback}
        </div>

        <Canvas
          camera={{ position: [0, 0.05, 5.5], fov: 32 }}
          style={{ width: '100%', height: '100%', background: 'transparent', cursor: 'inherit' }}
          onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 5, 3]} intensity={1.2} />
          <directionalLight position={[-3, 2, -2]} intensity={0.4} />
          <Suspense fallback={null}>
            <CakeScene interaction={interaction} onReady={() => setLoaded(true)} />
            <Environment preset="city" />
            <ContactShadows position={[0, -0.72, 0]} opacity={0.3} scale={2.5} blur={2} far={1.2} />
          </Suspense>
        </Canvas>
      </div>
    </ModelErrorBoundary>
  );
}
