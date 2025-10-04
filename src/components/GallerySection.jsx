import { useEffect, useRef, useState } from 'react';
import './GallerySection.css';

// Import gallery images
import flagship1 from '../assets/gallery/flagship1-d10fc726.webp';
import flagship2 from '../assets/gallery/flagship2-d54aefae.webp';
import flagship3 from '../assets/gallery/flagship3-787f3178.webp';
import speaker1 from '../assets/gallery/Daksh_sethi_speaker1-bfe00455.webp';
import speaker2 from '../assets/gallery/speaker2-e825cbff.webp';
import speaker3 from '../assets/gallery/speaker3-d744eecc.webp';

const galleryImages = [
  { image: flagship1, text: 'Flagship Event 1' },
  { image: flagship2, text: 'Flagship Event 2' },
  { image: flagship3, text: 'Flagship Event 3' },
  { image: speaker1, text: 'Speaker Session' },
  { image: speaker2, text: 'Industry Expert' },
  { image: speaker3, text: 'Keynote Speaker' }
];

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (translateX > 100) {
      handlePrevious();
    } else if (translateX < -100) {
      handleNext();
    }
    
    setTranslateX(0);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDragging, currentIndex]);

  return (
    <div className="gallery-section">
      {/* Background decorative elements */}
      <div className="gallery-bg-decoration">
        <div className="gallery-bg-circle circle-1"></div>
        <div className="gallery-bg-circle circle-2"></div>
        <div className="gallery-bg-circle circle-3"></div>
      </div>

      <div className="gallery-content">
        <div className="gallery-header">
          <h2 className="gallery-title">Glimpses of Last Year</h2>
          <p className="gallery-subtitle">
            Relive the most memorable moments from our flagship event
          </p>
        </div>

        <div className="gallery-wrapper">
          <div 
            className="gallery-container"
            ref={containerRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <button 
              className="gallery-nav gallery-nav-left" 
              onClick={handlePrevious} 
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="gallery-track" style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
              transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
            }}>
              {galleryImages.map((item, index) => (
                <div key={index} className="gallery-slide">
                  <div className="gallery-image-wrapper">
                    <div className="image-overlay"></div>
                    <img 
                      src={item.image} 
                      alt={item.text || `Gallery image ${index + 1}`}
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                  {item.text && (
                    <div className="gallery-caption">
                      <span className="caption-icon">📸</span>
                      <span>{item.text}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              className="gallery-nav gallery-nav-right" 
              onClick={handleNext} 
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Progress indicator */}
            <div className="gallery-progress">
              <div className="progress-text">
                {String(currentIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="gallery-dots">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`gallery-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
