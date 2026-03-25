"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Setup scène, caméra, renderer ---
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);
    
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.002);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 2, 12);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: false,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Lumières
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(1, 3, 2);
    dirLight.castShadow = true;
    dirLight.receiveShadow = true;
    scene.add(dirLight);

    const backLight = new THREE.PointLight(0x4466ff, 0.8);
    backLight.position.set(-2, 1, -4);
    scene.add(backLight);

    const pointLight2 = new THREE.PointLight(0xffaa88, 1);
    pointLight2.position.set(3, 1, 4);
    scene.add(pointLight2);

    // --- Création d'éléments visuels ---
    const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);

    // Groupe principal
    const mainGroup = new THREE.Group();

    // Couleurs
    const colors = [0x4a80f0, 0xa36eff, 0x5ac8fa, 0xff9f4b, 0x6ce0b0];

    // Constellation de formes
    for (let i = 0; i < 40; i++) {
      let mesh;
      if (Math.random() > 0.4) {
        mesh = new THREE.Mesh(
          geometry,
          new THREE.MeshStandardMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            emissive: 0x111122,
            roughness: 0.2,
            metalness: 0.3,
          }),
        );
      } else {
        const sphereGeo = new THREE.SphereGeometry(0.22, 16, 16);
        mesh = new THREE.Mesh(
          sphereGeo,
          new THREE.MeshStandardMaterial({
            color: 0x88aaff,
            emissive: 0x111830,
            roughness: 0.15,
          }),
        );
      }

      const angle = (i / 40) * Math.PI * 2;
      const radius = 3.5 + Math.sin(i * 1.5) * 1.2;
      const x = Math.cos(angle * 2.3) * radius * 0.8;
      const y = Math.sin(i * 0.9) * 2.5;
      const z = Math.sin(angle * 1.7) * radius * 1.2 - 3;

      mesh.position.set(x, y, z);

      mesh.userData = {
        originalY: y,
        originalX: x,
        originalZ: z,
      };

      mainGroup.add(mesh);
    }

    // Ajout d'éléments filaires
    const torusGeo = new THREE.TorusKnotGeometry(0.9, 0.22, 128, 16);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x3a5faa,
      emissive: 0x0f1a30,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const torusKnot = new THREE.Mesh(torusGeo, torusMat);
    torusKnot.scale.set(1.2, 1.2, 1.2);
    torusKnot.position.set(-1, 0.5, -4);
    mainGroup.add(torusKnot);

    const sphereBigGeo = new THREE.SphereGeometry(1.1, 32, 32);
    const sphereBigMat = new THREE.MeshStandardMaterial({
      color: 0x2a3f77,
      emissive: 0x0a1025,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const sphereWire = new THREE.Mesh(sphereBigGeo, sphereBigMat);
    sphereWire.position.set(2.2, -0.8, -6);
    mainGroup.add(sphereWire);

    scene.add(mainGroup);

    // Particules (étoiles)
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 800;
    const posArray = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 40;
      posArray[i + 1] = (Math.random() - 0.5) * 30;
      posArray[i + 2] = (Math.random() - 0.5) * 40 - 15;
    }
    starsGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xaab9ff,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
    });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    // --- Animation et scroll ---
    let targetRotationY = 0;
    let targetCameraY = 2;

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const progress = Math.min(1, window.scrollY / (maxScroll * 0.7));

      targetRotationY = progress * Math.PI * 1.5;
      targetCameraY = 2 + progress * 2.5;

      mainGroup.rotation.x = progress * 0.3;
      stars.rotation.y = progress * 0.5;
    };

    window.addEventListener("scroll", handleScroll);

    // Animation loop
    let animationFrame: number;

    function animate() {
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.03;

      camera.position.y += (targetCameraY - camera.position.y) * 0.02;
      camera.position.x = Math.sin(Date.now() * 0.0005) * 0.8;
      camera.position.z = 12 + Math.sin(Date.now() * 0.0003) * 0.4;
      
      torusKnot.rotation.x += 0.001;
      torusKnot.rotation.y += 0.002;

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
        opacity: 0.6
      }}
    />
  );
}
