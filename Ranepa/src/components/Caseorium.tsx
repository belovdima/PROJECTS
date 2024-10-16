import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Импорт навигации
import "./../styles/swiper/caseorium.css";

// Import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export const Caseorium = () => {
    return (
        <div className="project-showcase-outer" id="caseorium">
            <div className="c__project-showcase">
                <Swiper
                    slidesPerView={1} // Отображение только одного слайда
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
                        <div className="project-card">
                            <h3>Успешный проект 1</h3>
                            <p>Описание успешного проекта 1.</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="project-card">
                            <h3>Успешный проект 2</h3>
                            <p>Описание успешного проекта 2.</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="project-card">
                            <h3>Успешный проект 3</h3>
                            <p>Описание успешного проекта 3.</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="project-card">
                            <h3>Успешный проект 4</h3>
                            <p>Описание успешного проекта 4.</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};
