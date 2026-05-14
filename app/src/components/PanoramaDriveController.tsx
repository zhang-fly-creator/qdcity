import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface Props {
  enabled: boolean;
  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>;
  onExit: () => void;
}

export function PanoramaDriveController({ enabled, cameraRef, onExit }: Props) {
  const keysRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onExit();
        return;
      }
      keysRef.current[event.code] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysRef.current[event.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      keysRef.current = {};
    };
  }, [enabled, onExit]);

  useFrame((_, delta) => {
    if (!enabled || !cameraRef.current) return;

    const camera = cameraRef.current;
    const keys = keysRef.current;
    const speed = (keys.ShiftLeft || keys.ShiftRight ? 2.4 : 1.15) * delta;
    const turnSpeed = 1.35 * delta;

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up).normalize();

    if (keys.KeyW || keys.ArrowUp) {
      camera.position.addScaledVector(forward, speed);
    }
    if (keys.KeyS || keys.ArrowDown) {
      camera.position.addScaledVector(forward, -speed);
    }
    if (keys.KeyA) {
      camera.position.addScaledVector(right, -speed);
    }
    if (keys.KeyD) {
      camera.position.addScaledVector(right, speed);
    }
    if (keys.ArrowLeft || keys.KeyQ) {
      camera.rotation.y += turnSpeed;
    }
    if (keys.ArrowRight || keys.KeyE) {
      camera.rotation.y -= turnSpeed;
    }

    camera.position.y = Math.max(camera.position.y, 0.035);
  });

  return null;
}
