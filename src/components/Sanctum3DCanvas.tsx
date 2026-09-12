import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    THREE?: any;
  }
}

export const Sanctum3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let renderer: any;
    let cleanupListeners: () => void = () => {};

    const initThree = () => {
      const THREE = window.THREE;
      if (!THREE) return false;

      const width = container.clientWidth || 500;
      const height = container.clientHeight || 500;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 8);

      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        container.innerHTML = '';
        container.appendChild(renderer.domElement);
      } catch (e) {
        return false;
      }

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      scene.add(ambientLight);

      const pointLightTeal = new THREE.PointLight(0x00d166, 3.2, 20);
      pointLightTeal.position.set(5, 5, 4);
      scene.add(pointLightTeal);

      const pointLightBlue = new THREE.PointLight(0x0072ce, 3.0, 20);
      pointLightBlue.position.set(-5, -4, 4);
      scene.add(pointLightBlue);

      // Central Sanctum Group
      const coreGroup = new THREE.Group();
      scene.add(coreGroup);

      // Central luminous sphere
      const sphereGeo = new THREE.SphereGeometry(1.6, 64, 64);
      const sphereMat = new THREE.MeshPhongMaterial({
        color: 0x06181b,
        emissive: 0x003322,
        specular: 0x00d166,
        shininess: 90,
        transparent: true,
        opacity: 0.88,
      });
      const centralSphere = new THREE.Mesh(sphereGeo, sphereMat);
      coreGroup.add(centralSphere);

      // Internal wireframe pulse
      const wireGeo = new THREE.IcosahedronGeometry(1.75, 2);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00d166,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const wireGlobe = new THREE.Mesh(wireGeo, wireMat);
      coreGroup.add(wireGlobe);

      // Shield Ring 1 (Emerald - Survivor Isolation)
      const ringGeo1 = new THREE.TorusGeometry(2.3, 0.04, 16, 100);
      const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00d166, transparent: true, opacity: 0.9 });
      const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
      ring1.rotation.x = Math.PI / 3;
      coreGroup.add(ring1);

      // Shield Ring 2 (Cerulean - Counselor Relay)
      const ringGeo2 = new THREE.TorusGeometry(2.6, 0.035, 16, 100);
      const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x0099ff, transparent: true, opacity: 0.85 });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      ring2.rotation.x = -Math.PI / 4;
      ring2.rotation.y = Math.PI / 6;
      coreGroup.add(ring2);

      // Shield Ring 3 (Cyan Outer Orbit)
      const ringGeo3 = new THREE.TorusGeometry(2.9, 0.02, 16, 100);
      const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.4 });
      const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
      ring3.rotation.z = Math.PI / 5;
      coreGroup.add(ring3);

      // Particle swarm
      const particleCount = 260;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorGreen = new THREE.Color(0x00d166);
      const colorBlue = new THREE.Color(0x00b2ff);

      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 2.0 + Math.random() * 2.2;

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        const lerpVal = Math.random();
        const c = colorGreen.clone().lerp(colorBlue, lerpVal);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.075,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      coreGroup.add(particles);

      // Mouse interaction
      let targetX = 0;
      let targetY = 0;
      let mouseX = 0;
      let mouseY = 0;

      const onMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      };
      window.addEventListener('mousemove', onMouseMove);

      const onResize = () => {
        if (!container) return;
        const w = container.clientWidth || 500;
        const h = container.clientHeight || 500;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      cleanupListeners = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
      };

      const clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        targetX += (mouseX * 0.45 - targetX) * 0.05;
        targetY += (mouseY * 0.45 - targetY) * 0.05;

        coreGroup.rotation.y = elapsedTime * 0.35 + targetX;
        coreGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.15 - targetY;

        ring1.rotation.z += 0.008;
        ring2.rotation.y -= 0.012;
        ring3.rotation.x += 0.006;
        wireGlobe.rotation.y -= 0.004;

        coreGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

        renderer.render(scene, camera);
      };

      animate();
      return true;
    };

    // If Three.js is loaded, initialize immediately; otherwise poll or fallback
    if (!initThree()) {
      const interval = setInterval(() => {
        if (window.THREE) {
          clearInterval(interval);
          initThree();
        }
      }, 100);
      const timeout = setTimeout(() => clearInterval(interval), 4000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }

    return () => {
      cancelAnimationFrame(animId);
      cleanupListeners();
      if (renderer && renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
    >
      {/* Fallback geometric backdrop if WebGL is initializing */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <div className="w-80 h-80 rounded-full border border-dashed border-teal-500/40 animate-spin" style={{ animationDuration: '40s' }} />
        <div className="absolute w-56 h-56 rounded-full border border-teal-400/30" />
      </div>
    </div>
  );
};
