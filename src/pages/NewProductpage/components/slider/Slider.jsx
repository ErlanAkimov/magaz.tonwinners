import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ContentLoader from "react-content-loader";

import useSlider from "/src/hooks/useSlider";

import styles from "./slider.module.scss";

import { Like } from "../like/Like";

export const Slider = ({ variations, id, currentVariation }) => {
    const { images, setSlide, currentSlide } = useSlider({ images: variations[currentVariation].product_card_images });

    if (!variations || !id) {
        return <Skeleton />;
    }

    return (
        <Swiper
            className={styles.swiper}
            modules={[Pagination]}
            onSlideChange={(e) => setSlide(e.activeIndex)}
            pagination={{
                el: ".myDots",
                clickable: true,
                bulletClass: styles.dot,
                bulletActiveClass: styles.activeDot,
                renderBullet: (index, className) => `<div class="${className} ${index === currentSlide ? styles.activeDot : ""}"></div>`,
            }}
        >
            <Like productId={id} className={styles.like} />
            {images.map((img, index) => (
                <SwiperSlide key={index} className={styles.swiperSlide}>
                    {img?.split("-")[1] === "video" ? (
                        <video loop preload="true" autoPlay={true} src={img.split("-")[0]} />
                    ) : (
                        <img src={img} alt="banner image" />
                    )}
                </SwiperSlide>
            ))}
            <div className={`myDots ${styles.dots}`} style={{ left: "20px", bottom: "20px" }} />
        </Swiper>
    );
};

const Skeleton = () => {
    return (
        <ContentLoader speed={2} height={"100vw"} width={"100vw"} backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
            <rect x="0" y="0" width="100%" height={"100vw"} />
        </ContentLoader>
    );
};
