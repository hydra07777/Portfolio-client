// app/page.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDeviceType } from '@/hooks/useDeviceType';
import AboutSection from '@/components/about-section';
import ServicesSection from '@/components/services-section';
import TechnologiesSection from '@/components/technologies-section';
import ProcessSection from '@/components/process-section';

export default function Home() {
  const { isMobile, isTablet } = useDeviceType();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  // Icônes SVG pour les réseaux sociaux
  const SocialIcon = ({ type }: { type: string }) => {
    switch(type) {
      case 'twitter':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
          </svg>
        );
      case 'github':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        );
      default:
        return null;
    }
  };

  // Icônes pour les fonctionnalités
  const FeatureIcon = ({ type }: { type: string }) => {
    switch(type) {
      case 'rocket':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
            <path d="M12 15l-3-3 6-6 3 3-6 6z"/>
            <path d="M16.5 10.5L21 6l-3-3-4.5 4.5"/>
            <path d="M9 12.5L5 16.5 7.5 19 11.5 15"/>
          </svg>
        );
      case 'chart':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12v-2a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v2"/>
            <circle cx="12" cy="16" r="5"/>
            <path d="M12 11v5"/>
            <path d="M9 13h6"/>
          </svg>
        );
      case 'api':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 7h-4.5L15 4H9L8.5 7H4v13h16V7z"/>
            <circle cx="12" cy="13" r="3"/>
            <path d="M12 10v6"/>
            <path d="M9 13h6"/>
          </svg>
        );
      case 'backup':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 11H5M5 11l4-4m-4 4l4 4"/>
            <path d="M5 13h14m-4-4l4 4-4 4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
      case 'cdn':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82L12 22z"/>
            <path d="M4.6 9a1.65 1.65 0 0 0-.33 1.82c.26.61.86.99 1.51 1h12.44a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82L12 2z"/>
          </svg>
        );
      case 'auth':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            <circle cx="12" cy="16" r="1"/>
            <path d="M12 16v2"/>
          </svg>
        );
      default:
        return null;
    }
  };

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
      const maxScroll = document.body.scrollHeight - window.innerHeight;
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
    <>
      {/* Canvas Three.js */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
          display: "block",
        }}
      />

      {/* Contenu overlay */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          pointerEvents: 'auto',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          color: '#f0f0f0',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Navigation */}
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '1.2rem 1.5rem' : isTablet ? '1.5rem 2rem' : '1.8rem 4rem',
            width: '100%',
            backdropFilter: 'blur(8px)',
            background: 'rgba(10, 10, 15, 0.4)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '0 0 24px 24px',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            flexWrap: 'wrap',
            gap: isMobile ? '1rem' : '2.5rem',
          }}
        >
          <span
            className="gradient-text glow"
            style={{
              fontWeight: 700,
              fontSize: isMobile ? '1.4rem' : isTablet ? '1.6rem' : '1.8rem',
              letterSpacing: '-0.02em',
            }}
          >
            ArcaneCore
          </span>
          <div
            style={{
              display: isMobile ? 'none' : 'flex',
              gap: isMobile ? '1rem' : isTablet ? '1.5rem' : '2.5rem',
              alignItems: 'center',
              fontWeight: 500,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <a href="#" style={{ color: '#ddd', textDecoration: 'none', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
              Fonctionnalités
            </a>
            <a href="#about" style={{ color: '#ddd', textDecoration: 'none', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
              A propos
            </a>
            <a href="#stack" style={{ color: '#ddd', textDecoration: 'none', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
              Stacks
            </a>
            <a href="#contact" style={{ color: '#ddd', textDecoration: 'none', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
              Contact
            </a>
          </div>
          <div
            style={{
              display: isMobile ? 'none' : 'flex',
              gap: isMobile ? '0.8rem' : isTablet ? '1rem' : '1.5rem',
              alignItems: 'center',
              fontWeight: 500,
            }}
          >
            <a
              href="/commencer"
              className="btn-primary glow"
              style={{ padding: isMobile ? '0.36rem 0.8rem' : '0.45rem 1rem', fontSize: isMobile ? '0.85rem' : '0.95rem' }}
            >
              Commencer
            </a>
          </div>
          {isMobile && (
            <button
              onClick={() => setMenuOpen((s) => !s)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                width: 'auto',
                marginLeft: 'auto',
                padding: '0.6rem 0.5rem',
              }}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          )}
          {/* Mobile dropdown rendered below nav when open */}
          {isMobile && menuOpen && (
            <div style={{ width: '100%', background: 'linear-gradient(180deg, rgba(11,15,25,0.95), rgba(11,15,25,0.9))', padding: '0.8rem 1rem', boxShadow: '0 8px 30px rgba(0,0,0,0.6)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[{ a: 'A propos', b :  '#about'}, { a: 'Stacks', b : '#stack'}, { a: 'Contact', b : '#contact'}].map((label, id) => (
                  <a
                    key={id}
                    href={label.b}
                    onClick={() => setMenuOpen(false)}
                    style={{ color: '#cbd5e1', padding: '0.6rem 0.8rem', borderRadius: '8px', textDecoration: 'none' }}
                  >
                    {label.a}
                  </a>
                ))}
                <a
                  href="/commencer"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary glow"
                  style={{ padding: '0.7rem 0.8rem', width: '100%', textAlign: 'center' }}
                >
                  Commencer
                </a>
              </div>
            </div>
          )}
        </nav>

        <main style={{ flex: 1 }}>
          {/* Hero section */}
          <div
            style={{
              maxWidth: '1200px',
              margin: '4rem auto 0',
              padding: isMobile ? '0 1.5rem' : isTablet ? '0 2rem' : '0 3rem',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(107, 140, 255, 0.12)',
                border: '1px solid rgba(107, 140, 255, 0.3)',
                backdropFilter: 'blur(4px)',
                padding: '0.5rem 1.4rem',
                borderRadius: '60px',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.3px',
                color: '#b5ccff',
                marginBottom: '2rem',
              }}
            >
              Agence digitale haute performance
            </div>
            <div className="text-sm text-[#94A3B8] mb-4">Suite complète de solutions digitales modernes</div>
            <div className="text-lg text-[#94A3B8] mb-6">Nous propulsons vos expériences digitales à pleine vitesse</div>
            <h1
              style={{
                fontSize: isMobile ? '2.5rem' : isTablet ? '4rem' : '5.5rem',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(to right, #ffffff, #c0d0ff, #a2b8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem',
              }}
            >
              Nous propulsons vos<br />expériences digitales à pleine vitesse.
            </h1>
            <div
              style={{
                fontSize: isMobile ? '1.1rem' : isTablet ? '1.4rem' : '1.8rem',
                fontWeight: 400,
                color: '#cbd5e1',
                marginBottom: '1.2rem',
              }}
            >
              La plateforme moderne pour les équipes qui déploient vite.
            </div>
            <div
              style={{
                fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.2rem',
                maxWidth: '600px',
                color: '#a0a8b8',
                marginBottom: '2.8rem',
                lineHeight: 1.5,
              }}
            >
              Conçue pour l&apos;échelle, pensée pour la vitesse. Tout ce dont vous avez besoin pour builder, déployer et évoluer.
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row', width: isMobile ? '100%' : 'auto' }}>
              <a
                href="/commencer"
                className="btn-primary glow"
                style={{ padding: isMobile ? '0.9rem 1rem' : '1rem 2.8rem', fontSize: isMobile ? '1rem' : '1.2rem', textDecoration: 'none', width: isMobile ? '100%' : 'auto', textAlign: 'center' }}
              >
                Commencer →
              </a>
              {/* <a
                href="#"
                className="btn-outline"
                style={{ padding: isMobile ? '0.9rem 1rem' : '1rem 2.5rem', fontSize: isMobile ? '1rem' : '1.2rem', textDecoration: 'none', width: isMobile ? '100%' : 'auto', textAlign: 'center', marginTop: isMobile ? '0.6rem' : '0' }}
              >
                Voir la démo
              </a> */}
            </div>
            </div>

          {/* À propos - Mission / Vision / Approche */}
          <div id='#about'
            style={{
              maxWidth: '1200px',
              margin: isMobile ? '4rem auto 0' : isTablet ? '5rem auto 0' : '8rem auto 0',
              padding: isMobile ? '0 1.5rem' : isTablet ? '0 2rem' : '0 3rem',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : isTablet ? '3rem' : '4rem' }}>
              <h2
                style={{
                  fontSize: isMobile ? '2rem' : isTablet ? '2.8rem' : '3.5rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #ffffff, #a0b9ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem',
                }}
              >
                À Propos d'ArcaneCore
              </h2>
              <p
                style={{
                  fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.3rem',
                  color: '#b0b8cc',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                Nos valeurs fondamentales qui guident chaque projet
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: isMobile ? '1.5rem' : isTablet ? '2rem' : '2.5rem',
              }}
            >
              {/* Mission */}
              <div
                className="card"
                style={{
                  padding: isMobile ? '1.5rem' : '2rem',
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(37, 99, 235, 0.02))',
                  border: '1px solid rgba(37, 99, 235, 0.2)',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  animation: 'fadeUp 0.8s forwards',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.4)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ marginBottom: '1rem' }}>
                  <circle cx="20" cy="20" r="18" stroke="#2563EB" strokeWidth="2"/>
                  <circle cx="20" cy="20" r="6" fill="#2563EB"/>
                  <line x1="20" y1="4" x2="20" y2="10" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="20" y1="30" x2="20" y2="36" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="4" y1="20" x2="10" y2="20" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="30" y1="20" x2="36" y2="20" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h3 style={{ fontSize: isMobile ? '1.4rem' : '1.6rem', fontWeight: 600, color: '#fff', marginBottom: '0.8rem' }}>
                  Notre Mission
                </h3>
                <p style={{ color: '#b0b8cc', lineHeight: 1.6, fontSize: isMobile ? '0.95rem' : '1rem' }}>
                  Permettre aux entreprises de réussir grâce à des solutions digitales innovantes qui génèrent une croissance mesurable.
                </p>
              </div>

              {/* Vision */}
              <div
                className="card"
                style={{
                  padding: isMobile ? '1.5rem' : '2rem',
                  background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(124, 58, 237, 0.02))',
                  border: '1px solid rgba(124, 58, 237, 0.2)',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  animation: 'fadeUp 0.8s forwards 0.1s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.4)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ marginBottom: '1rem' }}>
                  <path d="M20 8C14 8 10 14 10 20S14 32 20 32C26 32 30 26 30 20C30 14 26 8 20 8Z" stroke="#7C3AED" strokeWidth="2" fill="none"/>
                  <circle cx="20" cy="20" r="4" fill="#7C3AED"/>
                  <path d="M20 12V8M20 32V28M12 20H8M32 20H28" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h3 style={{ fontSize: isMobile ? '1.4rem' : '1.6rem', fontWeight: 600, color: '#fff', marginBottom: '0.8rem' }}>
                  Notre Vision
                </h3>
                <p style={{ color: '#b0b8cc', lineHeight: 1.6, fontSize: isMobile ? '0.95rem' : '1rem' }}>
                  Devenir l'agence digitale leader reconnue pour transformer les idées en produits mondiaux de classe.
                </p>
              </div>

              {/* Approche */}
              <div
                className="card"
                style={{
                  padding: isMobile ? '1.5rem' : '2rem',
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(6, 182, 212, 0.02))',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  animation: 'fadeUp 0.8s forwards 0.2s',
                  cursor: 'default',
                  gridColumn: isMobile ? 'span 1' : isTablet ? 'span 2' : 'span 1',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(6, 182, 212, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ marginBottom: '1rem' }}>
                  <circle cx="12" cy="12" r="4" stroke="#06B6D4" strokeWidth="2" fill="none"/>
                  <circle cx="28" cy="12" r="4" stroke="#06B6D4" strokeWidth="2" fill="none"/>
                  <circle cx="20" cy="28" r="4" stroke="#06B6D4" strokeWidth="2" fill="none"/>
                  <line x1="15" y1="14" x2="25" y2="14" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="24" y1="15" x2="22" y2="24" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="16" y1="15" x2="18" y2="24" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h3 style={{ fontSize: isMobile ? '1.4rem' : '1.6rem', fontWeight: 600, color: '#fff', marginBottom: '0.8rem' }}>
                  Notre Approche
                </h3>
                <p style={{ color: '#b0b8cc', lineHeight: 1.6, fontSize: isMobile ? '0.95rem' : '1rem' }}>
                  Nous mêlons créativité et expertise technique pour construire des solutions à la fois belles et fonctionnelles.
                </p>
              </div>
            </div>
          </div>

          {/* Inserted Sections: About, Services, Technologies, Process */}
          <div style={{ maxWidth: '1200px', margin: isMobile ? '4rem auto 0' : isTablet ? '5rem auto 0' : '8rem auto 0', padding: isMobile ? '0 1.5rem' : isTablet ? '0 2rem' : '0 3rem' }}>
            <AboutSection />
          </div>

          <div style={{ maxWidth: '1200px', margin: isMobile ? '3rem auto 0' : isTablet ? '4rem auto 0' : '6rem auto 0', padding: isMobile ? '0 1.5rem' : isTablet ? '0 2rem' : '0 3rem' }}>
            <ServicesSection />
          </div>

          <div id='#stack' style={{ maxWidth: '1200px', margin: isMobile ? '3rem auto 0' : isTablet ? '4rem auto 0' : '6rem auto 0', padding: isMobile ? '0 1.5rem' : isTablet ? '0 2rem' : '0 3rem' }}>
            <TechnologiesSection />
          </div>

          <div style={{ maxWidth: '1200px', margin: isMobile ? '3rem auto 0' : isTablet ? '4rem auto 0' : '6rem auto 0', padding: isMobile ? '0 1.5rem' : isTablet ? '0 2rem' : '0 3rem' }}>
            <ProcessSection />
          </div>

          {/* Features section */}
          <div
            style={{
              maxWidth: '1200px',
              margin: isMobile ? '4rem auto 3rem' : isTablet ? '8rem auto 4rem' : '18rem auto 6rem',
              padding: isMobile ? '0 1.5rem' : isTablet ? '0 2rem' : '0 3rem',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: isMobile ? '1.5rem' : '2.5rem',
            }}
          >
            {[
              {
                icon: '🌐',
                title: 'Ingénierie Web Sur-Mesure',
                desc: 'Des expériences numériques immersives, sculptées pour la vitesse et conçues pour subjuguer vos utilisateurs dès la première seconde.',
              },
              {
                icon: '📱',
                title: 'Applications Mobiles Natives',
                desc: 'Des écosystèmes fluides, réactifs et puissants dans la poche de vos clients. L\'excellence de bout en bout sur iOS et Android.',
              },
              {
                icon: '⚡',
                title: 'Performance & Scalabilité',
                desc: 'Infrastructures de pointe taillées pour des millions de requêtes. Encaissez des pics de trafic massifs sans la moindre friction.',
              },
              {
                icon: '🎨',
                title: 'Design UI/UX Avant-Gardiste',
                desc: 'Une esthétique radicale et professionnelle. Nous fusionnons l\'art et la technique pour forger des interfaces mémorables et captivantes.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="card"
                style={{
                  padding: '2.5rem 2rem',
                  transform: 'translateY(30px)',
                  opacity: 0,
                  animation: `fadeUp 0.8s forwards ${index * 0.1}s`,
                  borderColor: 'rgba(107, 140, 255, 0.1)',
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.1))'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-4xl mb-6 transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#E2E8F0] mb-4 group-hover:text-blue-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p style={{ color: '#94A3B8', lineHeight: 1.6, fontSize: '1.05rem', position: 'relative', zIndex: 1 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Nouvelle section : Notre écosystème */}
          <div
            style={{
              maxWidth: '1200px',
              margin: isMobile ? '4rem auto' : isTablet ? '6rem auto' : '10rem auto',
              padding: isMobile ? '0 1.5rem' : isTablet ? '0 2rem' : '0 3rem',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? '2rem' : isTablet ? '2.8rem' : '3.5rem',
                fontWeight: 700,
                marginBottom: '2rem',
                background: 'linear-gradient(135deg, #ffffff, #a0b9ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Notre écosystème
            </h2>
            <p
              style={{
                fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.3rem',
                color: '#b0b8cc',
                maxWidth: '800px',
                margin: '0 auto 4rem',
                lineHeight: 1.6,
              }}
            >
              Une suite complète d'outils intégrés pour accélérer votre développement
            </p>
            
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: isMobile ? '1.5rem' : '2rem',
              }}
            >
              {[
                {
                  icon: 'rocket',
                  title: 'CI/CD Intégré',
                  desc: 'Pipeline automatisé de la build à la production',
                },
                {
                  icon: 'chart',
                  title: 'Monitoring temps réel',
                  desc: 'Métriques détaillées et alertes intelligentes',
                },
                {
                  icon: 'api',
                  title: 'API Gateway',
                  desc: 'Gérez toutes vos APIs en un seul endroit',
                },
                {
                  icon: 'backup',
                  title: 'Backup automatique',
                  desc: 'Sauvegardes quotidiennes et restauration instantanée',
                },
                {
                  icon: 'cdn',
                  title: 'CDN Global',
                  desc: 'Distribution mondiale en quelques clics',
                },
                {
                  icon: 'auth',
                  title: 'Auth intégrée',
                  desc: 'Authentification et autorisations prêtes à l\'emploi',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="card"
                  style={{
                    padding: '2rem 1.5rem',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    cursor: 'default',
                    animation: `fadeUp 0.8s forwards ${index * 0.1 + 0.5}s`,
                    opacity: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = 'rgba(107, 140, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <div style={{ color: 'var(--electric-blue)', marginBottom: '1rem' }}>
                    <FeatureIcon type={item.icon} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.8rem', color: '#fff' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#a0a8b8', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer with contact form */}
        <footer
          style={{
            background: 'rgba(10, 10, 15, 0.95)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            padding: isMobile ? '2rem 1.5rem 1rem' : isTablet ? '3rem 2rem 1.5rem' : '4rem 2rem 2rem',
            marginTop: isMobile ? '3rem' : '4rem',
            width: '100%',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: isMobile ? '1.5rem' : '2rem',
            }}
          >
            {/* Colonne 1 : Logo et description */}
            <div style={{ gridColumn: 'span 1' }}>
              <a href="#" className="flex items-center gap-2 group">
              <span className="gradient-text glow" style={{ fontWeight: 700, fontSize: '2rem', display: 'inline-block' }}>
                ArcaneCore
              </span>
            </a>
              <p style={{ color: '#a0a8b8', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Une agence digitale pensée pour la performance, la fluidité et l'immersion. Nous accompagnons les entreprises ambitieuses dans la création d'écosystèmes digitaux robustes.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[
                  { type: 'twitter', label: 'Twitter' },
                  { type: 'linkedin', label: 'LinkedIn' },
                  { type: 'github', label: 'GitHub' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={social.label}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--muted)',
                      textDecoration: 'none',
                      transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(37,99,235,0.12)';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,99,235,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.color = 'var(--muted)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <SocialIcon type={social.type} />
                  </a>
                ))}
              </div>
            </div>

            {/* Colonne 2 : Quick Links */}
            <div style={{ gridColumn: 'span 1' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff' }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['About', 'Blog', 'Careers', 'Press', 'Partners'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.8rem' }}>
                    <a
                      href="#"
                      style={{
                        color: '#a0a8b8',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        fontSize: '0.95rem',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#a0a8b8')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 3 : Support */}
            <div style={{ gridColumn: 'span 1' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff' }}>
                Support
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Help Center', 'Documentation', 'FAQ', 'Status', 'Contact'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.8rem' }}>
                    <a
                      href="#"
                      style={{
                        color: '#a0a8b8',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        fontSize: '0.95rem',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#fff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#a0a8b8")
                      }
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 4 : Contact Form */}
            <div id='#contact' style={{ gridColumn: 'span 1' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff' }}>
                Contact Us
              </h4>
              {formSubmitted && (
                <div
                  style={{
                    background: 'rgba(107, 255, 140, 0.1)',
                    border: '1px solid rgba(107, 255, 140, 0.3)',
                    color: '#b5ffcc',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                  }}
                >
                  ✓ Message envoyé avec succès !
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    marginBottom: '0.8rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6b8cff")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Votre numéro"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    marginBottom: "1rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6b8cff")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    marginBottom: '0.8rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6b8cff")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
                <textarea
                  name="message"
                  placeholder="Votre message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    marginBottom: '1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6b8cff")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #6b8cff, #4a6fe0)',
                    color: '#fff',
                    border: 'none',
                    padding: '0.7rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px -5px rgba(107, 140, 255, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div
            style={{
              maxWidth: '1200px',
              margin: '3rem auto 0',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'center',
              color: '#5c6a87',
              fontSize: '0.85rem',
            }}
          >
            © 2025 ArcaneCore. Tous droits réservés. | Mentions légales | Politique de confidentialité
          </div>
        </footer>
      </div>

      {/* Styles pour l'animation + variables thème */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&display=swap');
        
        :root {
          --bg-dark: #0B0F19;
          --electric-blue: #2563EB;
          --modern-violet: #7C3AED;
          --accent-cyan: #06B6D4;
          --muted: #a0a8b8;
          --card-bg: rgba(20,22,32,0.6);
          --glass: rgba(255,255,255,0.03);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background-color: var(--bg-dark);
          color: #f0f0f0;
          overflow-x: hidden;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gradient-text {
          background: linear-gradient(90deg, var(--electric-blue), var(--modern-violet));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .glow {
          filter: drop-shadow(0 8px 30px rgba(37,99,235,0.12)) drop-shadow(0 4px 16px rgba(124,58,237,0.06));
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--electric-blue), var(--modern-violet));
          color: #fff !important;
          box-shadow: 0 10px 30px rgba(37,99,235,0.16), 0 0 30px rgba(124,58,237,0.06);
          border-radius: 60px;
          transition: transform .18s ease, box-shadow .18s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-primary:hover { transform: scale(1.03); box-shadow: 0 18px 40px rgba(37,99,235,0.22), 0 0 40px rgba(124,58,237,0.12); }

        .btn-outline {
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(4px);
          color: #fff !important;
          background: rgba(255,255,255,0.02);
          border-radius: 60px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        nav { background: linear-gradient(180deg, rgba(11,15,25,0.6), rgba(11,15,25,0.35)); }

        .card {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 24px;
          box-shadow: 0 6px 30px rgba(37,99,235,0.04);
        }

        /* Tablet and smaller than 1024px */
        @media (max-width: 1023px) {
          body { font-size: 14px; }
          footer > div:first-of-type { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* Mobile: Less than 768px */
        @media (max-width: 767px) {
          html { font-size: 14px; }
          h1 { font-size: 2rem; line-height: 1.2; }
          h2 { font-size: 1.8rem; }
          h3 { font-size: 1.2rem; }
          p { font-size: 0.95rem; }
          button, a { font-size: 0.95rem; }
          footer > div:first-of-type { grid-template-columns: 1fr !important; }
          -webkit-user-select: none; user-select: none;
        }

        /* Small mobile: Less than 480px */
        @media (max-width: 479px) {
          h1 { font-size: 1.5rem; }
          h2 { font-size: 1.4rem; }
          h3 { font-size: 1rem; }
        }

        /* Landscape mobile */
        @media (max-height: 500px) and (orientation: landscape) {
          nav { padding: 0.8rem 1rem !important; }
        }
      `}</style>
    </>
  );
}
