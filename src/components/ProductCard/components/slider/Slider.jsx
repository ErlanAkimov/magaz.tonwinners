import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

import styles from "./slider.module.scss";

export const Slider = ({ id, photos }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const navigate = useNavigate();

    return (
        <>
            <Swiper
                className={styles.imgBlock}
                onSlideChange={(s) => setImageIndex(s.activeIndex)}
                onClick={() => navigate(`/new-product/${id}`)}
            >
                {photos.map((photo, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={photo}
                            loading="lazy"
                            style={{ userSelect: "none" }}
                            alt=""
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={styles.dots}>
                {photos.map((_, index) => (
                    <div
                        key={index}
                        className={styles.dot}
                        style={{
                            backgroundColor: imageIndex === index && "#a9a1a1",
                        }}
                    />
                ))}
            </div>
        </>
    );
};
