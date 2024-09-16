import { useState, useCallback } from 'react'
import C1 from './Components/C1'
import C2 from './Components/C2'
import C3 from './Components/C3'
import {Header} from './Components/Header'

import "./CSS/reset.css"
import "./CSS/App.css"

function App() {
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const setSecondSlide = () => {
    setCurrentSlide(1)
  }

  const slides = [<C1 key={1} Go={setSecondSlide}/>, <C2 key={2}/>, <C3 key={3}/>];
  

  const setPrevSlide = useCallback(() => {
    if (currentSlide !== 0) {
      setCurrentSlide((prev) => (prev - 1))
    }
  }, [setCurrentSlide, currentSlide]);

  const setNextSlide = useCallback(() => {
    if (currentSlide !== slides.length - 1) {
      setCurrentSlide((prev) => (prev + 1))
    }
  }, [setCurrentSlide, slides.length, currentSlide]);

  const [touchStart, setTouchStart] = useState(null)
const [touchEnd, setTouchEnd] = useState(null)

const minSwipeDistance = 50 

const onTouchStart = (e) => {
    if (!e || !e.touches || !e.touches[0]) return;
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };
  
  const onTouchMove = (e) => {
    if (!e || !e.touches || !e.touches[0]) return;
    setTouchEnd(e.touches[0].clientX);
  };
  
  const onTouchEnd = (e) => {
    if (!e || !touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setNextSlide()
    }
    if (isRightSwipe) {
      setPrevSlide()
    }
  };

  const resetSlide = () => {
    setCurrentSlide(0)
  }






  return (
    <div className='app'>
      <Header onHeaderClick={resetSlide}/>
      <div  onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>{slides[currentSlide]}</div>
      {/* <button onClick={setPrevSlide}>Назад</button>
      <button onClick={setNextSlide}>Вперед</button> */}
    </div>
  );
};

export default App
