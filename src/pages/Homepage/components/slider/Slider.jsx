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

export const Slider = () => {
    const [slide, setSlide] = useState(0);

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
                    renderBullet: (index, className) =>
                        `<div class="${className} ${
                            index === slide ? styles.activeDot : ""
                        }"></div>`,
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                onSlideChange={(e) => setSlide(e.activeIndex)}
                className={styles.banner}
                spaceBetween={30}
            >
                <SwiperSlide className={styles.bannerItem}>
                    <img src={mac} alt="" />
                </SwiperSlide>
                <SwiperSlide className={styles.bannerItem}>
                    <a
                        target="_blank"
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdwAbVjahSqHeCfcuky4kH1F_Qf1yqVW19pJVVOBfddXCH6jQ/viewform"
                    >
                        <img src={g94} alt="" />
                    </a>
                </SwiperSlide>
                <SwiperSlide className={styles.bannerItem}>
                    <img src={g95} alt="" />
                </SwiperSlide>
            </Swiper>
            <div className={`myDots ${styles.dots}`}></div>
        </>
    );
};
