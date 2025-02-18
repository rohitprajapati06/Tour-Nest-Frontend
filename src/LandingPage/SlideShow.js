import React, { useState, useEffect } from 'react';
import './Slideshow.css';
import ImageGrid from './ImageGrid/ImageGrid'

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    const slides = document.getElementsByClassName('mySlides');
    const dots = document.getElementsByClassName('dot');
    if (slideIndex > slides.length) setSlideIndex(1);
    if (slideIndex < 1) setSlideIndex(slides.length);

    Array.from(slides).forEach((slide) => (slide.style.display = 'none'));
    Array.from(dots).forEach((dot) => {
      dot.className = dot.className.replace(' active', '');
    });

    if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = 'block';
    if (dots[slideIndex - 1]) dots[slideIndex - 1].className += ' active';
  }, [slideIndex]);

  const plusSlides = (n) => {
    setSlideIndex((prevIndex) => prevIndex + n);
  };

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  return (
    <div>
      <div className="slideshow-container">
      <div className="mySlides fade">
  <video
    src="/Video/Landing_Screen.mp4"
    alt="Slide 1"
    controls
    autoPlay
    loop
    muted
    style={{ width: '100%', height: 'auto' }}
  />
</div>


      <div className="mySlides fade">
            <div className="grid-wrapper">
               <ImageGrid />
            </div>
      </div>


        <button className="prev" onClick={() => plusSlides(-1)}>
          ❮
        </button>
        <button className="next" onClick={() => plusSlides(1)}>
          ❯
        </button>

        {/* Dots Container */}
        <div className="dots-container">
          <span className="dot" onClick={() => currentSlide(1)}></span>
          <span className="dot" onClick={() => currentSlide(2)}></span>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
