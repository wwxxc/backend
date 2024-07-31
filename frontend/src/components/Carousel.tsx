'use client'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

interface InfinitySliderProps {
  images: string[];
}

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [autoSlide, setAutoSlide] = useState(true);
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const slideInterval = useRef<NodeJS.Timeout | null>(null);
    const transitionTimeout = useRef<NodeJS.Timeout | null>(null);
    const [sliders, setSliders] = useState<Slider[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
      const fetchImg = async () => {
        try {
          const response = await axios.get(API_URL + '/slider');
          setSliders(response.data);
          setLoading(false);
        } catch (error) {
          // setLoading(false);
          setError('Failed to fetch images');
        }
      };
      fetchImg();
    }, []);
  
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      if (currentIndex >= sliders.length) {
        setCurrentIndex(0);
      } else if (currentIndex < 0) {
        setCurrentIndex(sliders.length - 1);
      }
    };
  
    const startSlide = () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
      slideInterval.current = setInterval(() => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1));
      }, 8000);
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
      if (!isTransitioning && currentIndex === sliders.length) {
        setCurrentIndex(0);
      }
    }, [currentIndex, isTransitioning, sliders.length]);
  
    useEffect(() => {
      if (!autoSlide) {
        const timeout = setTimeout(() => {
          setAutoSlide(true);
        }, 10000); 
        return () => clearTimeout(timeout);
      }
    }, [autoSlide]);
  
    return (
      <>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
          </div>
        ) : (
          <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? 'transform 0.5s ease' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {sliders.concat(sliders[0]).map((image, index) => (
            <div key={index} className="min-w-full">
              <img src={image.slider_img} alt={`Slide ${index}`} className="relative w-full h-full lg:h-[500px] rounded-lg object-cover" />
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 opacity-50 text-white p-2 rounded-full"
          disabled={!buttonEnabled}
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 opacity-50 text-white p-2 rounded-full"
          disabled={!buttonEnabled}
        >
          &gt;
        </button>
      </div>
      )}
      </>
    );
  };
  
  export default Carousel;
