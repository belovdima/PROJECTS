import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Импорт навигации
import "./../styles/swiper/expert.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export const Expert = () => {
    return (
        <div className="expert-outer">
            <div className="c__expert">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    autoplay={{
                        delay: 3000, // Время между переключениями слайдов в миллисекундах
                        disableOnInteraction: false, // Продолжать автоматическое переключение после взаимодействия
                    }}
                    navigation={true} // Включаем навигацию стрелками
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Navigation, Autoplay]} // Добавьте модули
                    className="mySwiper">
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Эксперт 1</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Эксперт 2</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Эксперт 3</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Эксперт 4</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Эксперт 5</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Эксперт 6</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Эксперт 7</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Эксперт 8</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Эксперт 9</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Эксперт 10</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Эксперт 11</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Эксперт 12</h3>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};
