import React, { useRef, useLayoutEffect, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './GallerySection.css';
import logoFallback from '../assets/logo.png'; // optional fallback if images missing

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Simple ErrorBoundary so canvas errors don't kill the app
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err) { console.error('Gallery ErrorBoundary:', err); }
  render() {
    if (this.state.hasError) return <div style={{padding:40,color:'#fff'}}>Gallery failed to load.</div>;
    return this.props.children;
  }
}

// Image plane for the cylinder
function ImagePlane({ texture, index, total, radius = 5 }) {
  const angle = (index / total) * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  return (
    <mesh position={[x, 0, z]} rotation={[0, Math.PI / 2 - angle, 0]}>
      <planeGeometry args={[3, 2]} />
      <meshBasicMaterial map={texture} toneMapped={false} side={2} />
    </mesh>
  );
}

function CylinderGallery({ urls, rotationYRef }) {
  const groupRef = useRef();
  const textures = useTexture(urls);
  const radius = 5;

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y = rotationYRef.current;
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {textures.map((tx, i) => (
        <ImagePlane key={i} texture={tx} index={i} total={textures.length} radius={radius} />
      ))}
    </group>
  );
}

export default function GallerySection() {
  const sectionRef = useRef(null);
  const rotationY = useRef(0);
  const [urls, setUrls] = useState(null);

  // list of intended images (update or move these files to public/images/)
  const desired = [
    '/images/event-photo-1.jpg',
    '/images/event-photo-2.jpg',
    '/images/event-photo-3.jpg',
    '/images/event-photo-4.jpg',
    '/images/event-photo-5.jpg',
    '/images/event-photo-6.jpg',
    '/images/event-photo-7.jpg',
    '/images/event-photo-8.jpg',
  ];

  // Check each URL and replace failed ones with fallback
  useEffect(() => {
    let cancelled = false;
    async function checkAll() {
      const results = await Promise.all(
        desired.map(async (u) => {
          try {
            // try fetching the image; if not ok, use fallback
            const res = await fetch(u, { method: 'GET', cache: 'no-store' });
            return res.ok ? u : logoFallback;
          } catch (e) {
            return logoFallback;
          }
        })
      );
      if (!cancelled) setUrls(results);
    }
    checkAll();
    return () => { cancelled = true; };
  }, []);

  useLayoutEffect(() => {
    // gentle rotation tied to scroll
    const onScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const pct = 1 - Math.max(0, Math.min(1, (rect.top + rect.height) / (window.innerHeight + rect.height)));
      rotationY.current = pct * Math.PI * 2;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full relative z-10">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white">Last Year's Highlights</h2>
        <p className="text-lg text-blue-200 mt-2">An immersive journey through our milestone event.</p>
      </div>

      <div style={{ width: '100%', height: '100vh' }}>
        <ErrorBoundary>
          <Suspense fallback={<div style={{color:'#fff',padding:20}}>Loading gallery...</div>}>
            {urls ? (
              <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1.2} />
                <CylinderGallery urls={urls} rotationYRef={rotationY} />
              </Canvas>
            ) : (
              <div style={{color:'#fff',padding:20}}>Preparing gallery...</div>
            )}
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
}