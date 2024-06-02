'use client'
import { useEffect, useRef, useState } from 'react';

interface InfinitySliderProps {
  images: string[];
}

const InfinitySlider: React.FC<InfinitySliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [autoSlide, setAutoSlide] = useState(true);
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const slideInterval = useRef<NodeJS.Timeout | null>(null);
    const transitionTimeout = useRef<NodeJS.Timeout | null>(null);
  
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      if (currentIndex >= images.length) {
        setCurrentIndex(0);
      } else if (currentIndex < 0) {
        setCurrentIndex(images.length - 1);
      }
    };
  
    const startSlide = () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
      slideInterval.current = setInterval(() => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1));
      }, 3000);
    };
  
    const stopSlide = () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  
    const nextSlide = () => {
      if (!buttonEnabled) return;
      stopSlide();
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1));
      setAutoSlide(false);
      setButtonEnabled(false);
  
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
      transitionTimeout.current = setTimeout(() => {
        setButtonEnabled(true);
      }, 500); 
    };
  
    const prevSlide = () => {
      if (!buttonEnabled) return;
      stopSlide();
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1));
      setAutoSlide(false);
      setButtonEnabled(false);
  
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
      transitionTimeout.current = setTimeout(() => {
        setButtonEnabled(true);
      }, 500); 
    };
  
    useEffect(() => {
      if (autoSlide) startSlide();
      return () => stopSlide();
    }, [autoSlide]);
  
    useEffect(() => {
      if (!isTransitioning && currentIndex === images.length) {
        setCurrentIndex(0);
      }
    }, [currentIndex, isTransitioning, images.length]);
  
    useEffect(() => {
      if (!autoSlide) {
        const timeout = setTimeout(() => {
          setAutoSlide(true);
        }, 10000); 
        return () => clearTimeout(timeout);
      }
    }, [autoSlide]);
  
    return (
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? 'transform 0.5s ease' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {images.concat(images[0]).map((image, index) => (
            <div key={index} className="min-w-full">
              <img src={image} alt={`Slide ${index}`} className="relative w-full h-full lg:h-[500px] rounded-lg object-cover" />
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
          disabled={!buttonEnabled}
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
          disabled={!buttonEnabled}
        >
          &gt;
        </button>
      </div>
    );
  };
  
  export default InfinitySlider;
