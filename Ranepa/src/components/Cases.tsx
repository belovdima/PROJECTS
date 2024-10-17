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

export const Cases = () => {
    return (
        <div className="expert-outer" id="expert">
            <div className="c__expert--writing">НАШИ КЕЙСЫ</div>
            <div className="c__expert">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
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
                            <h3>Кейс 1</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Кейс 2</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Кейс 3</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Кейс 4</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Кейс 5</h3>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="expert-card">
                            <h3>Кейс 6</h3>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};
