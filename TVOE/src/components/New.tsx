import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";

export const New = () => {
    return (
        <div className="new">
            <div className="new__writing">Новинки</div>
            <Swiper spaceBetween={20} slidesPerView={6}>
                <SwiperSlide></SwiperSlide> //TODO SLIDER
            </Swiper>
        </div>
    );
};
