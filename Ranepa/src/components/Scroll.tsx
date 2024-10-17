import React, { useState, useEffect } from "react";

const Scroll: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        console.log("scrollY:", window.scrollY); // Отладочное сообщение
        setIsVisible(window.scrollY > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <div className="scroll-to-top">
            {isVisible && (
                <button className="scroll-to-top__button" onClick={scrollToTop}>
                    ↑ Наверх
                </button>
            )}
        </div>
    );
};

export default Scroll;
