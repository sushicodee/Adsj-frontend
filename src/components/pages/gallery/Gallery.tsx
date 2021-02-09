import React, { useRef, useState, useDispatch, useSelector } from 'react';
interface Iprops {}
const Gallery: React.FC<Iprops> = (props) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const gallery = useSelector((state) => state.gallery);

  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef) {
        const divBounding = galleyRef.current.getBoundingClientRect();
        const position = window.pageYOffset;
        let letUserLoad = true;
        const LOAD_TIMEOUT = 5000;
        if (position > divBounding.height) {
          if (letUserLoad) {
            setTimeout(() => {
              letUserLoad = true;
            }, LOAD_TIMEOUT);
            letUserLoad = false;
            console.log('load more images');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div ref={galleryRef}></div>;
};

export default Gallery;
