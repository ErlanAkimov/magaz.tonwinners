import { createRef, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import styles from "./slider.module.scss";

import mac from "/src/assets/images/g93.png";
import g94 from "/src/assets/images/g95.png";
import g95 from "/src/assets/images/g94.png";

const slides = [
  {
    id: 0,
    img: mac,
  },
  {
    id: 1,
    img: g94,
  },
  {
    id: 2,
    img: g95,
  },
];

export const Slider = () => {
  const [slide, setSlide] = useState(0);
  const progressBarRef = useRef([]);

  progressBarRef.current = slides.map(
    (_, i) => progressBarRef.current[i] ?? createRef()
  );

  const setProgressProperty = (value, i = slide) => {
    progressBarRef.current[i].current.style.setProperty("--progress", value);
  };

  const onAutoplayTimeLeft = (_, __, progress) => {
    setProgressProperty((1 - progress) * 100);
  };

  useEffect(() => {
    return () => {
      setProgressProperty(0, slide);
    };
  }, [slide]);

  return (
    <>
      <Swiper
        className={styles.banner}
        spaceBetween={30}
        onSlideChange={(e) => setSlide(e.activeIndex)}
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id} className={styles.bannerItem}>
            <img src={slide.img} alt="" />
            <div
              ref={progressBarRef.current[idx]}
              className={styles.progress}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.dots}>
        {[0, 0, 0].map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${slide === i ? styles.activeDot : null}`}
          />
        ))}
      </div>
    </>
  );
};
