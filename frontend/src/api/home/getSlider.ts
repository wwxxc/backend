'use client'
import { useEffect, useState } from "react";
import Api from "@/utils/service";
const SliderData = () => {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await Api.get('/images');
        console.log(response);
        
        setImages(response.data);
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchImages();
  }, [])
}

export default SliderData