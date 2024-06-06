// styles
import styles from "./slides.module.scss";

// images
import mac from "/src/assets/images/g93.png";
import g94 from "/src/assets/images/g95.png";
import g95 from "/src/assets/images/g94.png";

// dependencies
import { useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// custom hooks
import useSlider from "/src/hooks/useSlider";

const dbImages = [
    { id: 0, src: mac, link: null },
    { id: 1, src: g94, link: "https://docs.google.com/forms/d/e/1FAIpQLSdwAbVjahSqHeCfcuky4kH1F_Qf1yqVW19pJVVOBfddXCH6jQ/viewform" },
    { id: 2, src: g95, link: null },
];

export const Slider = () => {
    const { setSlide, currentSlide, images } = useSlider({ images: dbImages });

    return (
        <>
            <Swiper
                loop={true}
                modules={[Autoplay, Pagination]}
                pagination={{
                    el: ".myDots",
                    clickable: true,
                    bulletClass: styles.dot,
                    bulletActiveClass: styles.activeDot,
                    renderBullet: (index, className) => `<div class="${className} ${index === slide ? styles.activeDot : ""}"></div>`,
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                onSlideChange={(e) => setSlide(e.activeIndex)}
                className={styles.banner}
                spaceBetween={30}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className={styles.bannerItem}>
                        {image?.link ? (
                            <a target="_blank" href={image.link}>
                                <img src={image.src} alt="" />
                            </a>
                        ) : (
                            <img src={image?.src} alt="" />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={`myDots ${styles.dots}`}></div>
        </>
    );
};
