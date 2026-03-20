"use client";

import React from "react";
import * as THREE from "three";

// True 3D container using Three.js
export default function ThreeContainer({ width = 2, height = 2, length = 5, textures = [], rotateSpeed = 0.01 }) {
  const mountRef = React.useRef(null);

  React.useEffect(() => {
    let mounted = true;
    let scene, camera, renderer, mesh, frame;

    const init = () => {
      const el = mountRef.current;
      const w = el.clientWidth || 600;
      const h = el.clientHeight || 400;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
      camera.position.z = Math.max(width, height, length) * 2.2;

      // World units from provided dimensions
      const wUnit = Math.max(0.5, width);
      const hUnit = Math.max(0.5, height);
      const lUnit = Math.max(0.5, length);

      const geometry = new THREE.BoxGeometry(wUnit, hUnit, lUnit);

      const loader = new THREE.TextureLoader();
      const mats = [];
      for (let i = 0; i < 6; i++) {
        const t = textures[i % textures.length];
        if (t) mats.push(new THREE.MeshStandardMaterial({ map: loader.load(t) }));
        else mats.push(new THREE.MeshStandardMaterial({ color: 0x888888 }));
      }

      mesh = new THREE.Mesh(geometry, mats);
      scene.add(mesh);

      const ambient = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(ambient);
      const dir = new THREE.DirectionalLight(0xffffff, 0.6);
      dir.position.set(5, 5, 5);
      scene.add(dir);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(w, h);
      el.appendChild(renderer.domElement);
    };

    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (mesh) {
        mesh.rotation.y += rotateSpeed;
        mesh.rotation.x += rotateSpeed * 0.5;
      }
      if (renderer && scene && camera) renderer.render(scene, camera);
    };

    init();
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const el = mountRef.current;
      const w = el.clientWidth || 600;
      const h = el.clientHeight || 400;
      if (renderer) {
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frame) cancelAnimationFrame(frame);
      if (renderer && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // dispose geometry/materials
      if (mesh) {
        mesh.geometry.dispose();
        mesh.material.forEach((m) => m.dispose());
      }
      if (renderer) renderer.dispose();
    };
  }, [width, height, length, textures, rotateSpeed]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', minHeight: 280 }} />;
}
