import { useState, useCallback } from 'react'
import C1 from './Components/C1'
import C2 from './Components/C2'
import C3 from './Components/C3'

function App() {
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [<C1 />, <C2 />, <C3 />];

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  });

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  });

  const [touchStart, setTouchStart] = useState(null)
const [touchEnd, setTouchEnd] = useState(null)

// the required distance between touchStart and touchEnd to be detected as a swipe
const minSwipeDistance = 50 

const onTouchStart = (e) => {
    if (!e || !e.touches || !e.touches[0]) return;
    console.log('Touch Start:', e.touches[0].clientX);
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };
  
  const onTouchMove = (e) => {
    if (!e || !e.touches || !e.touches[0]) return;
    console.log('Touch Move:', e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
  };
  
  const onTouchEnd = (e) => {
    if (!e || !touchStart || !touchEnd) return;
    console.log('Touch End');
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe) {
      console.log('Swipe', isLeftSwipe ? 'left' : 'right');
    }
    if (isLeftSwipe) {
      prevSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  };

  return (
    <div>
      <div  onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>{slides[currentSlide]}</div>
      <button onClick={prevSlide}>Назад</button>
      <button onClick={nextSlide}>Вперед</button>
    </div>
  );
};

export default App
