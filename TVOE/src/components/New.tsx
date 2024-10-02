import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";

export const New = () => {
    return (
        <div className="new">
            <div className="new__writing">Новинки</div>
            <div className="new__posters">
                <Swiper spaceBetween={20} slidesPerView={6}>
                    <SwiperSlide>
                        <div className="new__element">
                            <div className="new__element--rating">9,9</div>
                            <img
                                className="new__poster new__1"
                                src="/public/new1.png"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="new__element">
                            <div className="new__element--rating">9,9</div>
                            <img
                                className="new__poster new__2"
                                src="/public/new2.png"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="new__element">
                            <div className="new__element--rating">9,9</div>
                            <img
                                className="new__poster new__3"
                                src="/public/new3.png"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="new__element">
                            <div className="new__element--rating">9,9</div>
                            <img
                                className="new__poster new__4"
                                src="/public/new4.png"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="new__element">
                            <div className="new__element--rating">9,9</div>
                            <img
                                className="new__poster new__5"
                                src="/public/new5.png"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="new__element">
                            <div className="new__element--rating">9,9</div>
                            <img
                                className="new__poster new__6"
                                src="/public/new6.png"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="new__element">
                            <div className="new__element--rating">9,9</div>
                            <img
                                className="new__poster new__7"
                                src="/public/new7.png"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};
