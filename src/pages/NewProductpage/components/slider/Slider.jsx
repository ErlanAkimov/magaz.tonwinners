import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./slider.module.scss";

import { Like } from "../like/Like";

export const Slider = ({ variations, _id }) => {
    const [slide, setSlide] = useState(0);
    // const { productId } = useParams();
    // const { images, _id } = useSelector(
    //     (state) =>
    //         state.products.productsList.filter((a) => a._id === productId)[0]
    // );

    return (
        <Swiper
            className={styles.swiper}
            modules={[Pagination]}
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
        >
            <Like productId={_id} className={styles.like} />
            {variations[0].product_card_images.map((banner, index) => (
                <SwiperSlide key={index} className={styles.swiperSlide}>
                    {banner.split("-")[1] === "video" ? (
                        <video
                            loop
                            preload="true"
                            autoPlay={true}
                            src={banner.split("-")[0]}
                        />
                    ) : (
                        <img src={banner} alt="banner image" />
                    )}
                </SwiperSlide>
            ))}
            <div
                className={`myDots ${styles.dots}`}
                style={{ left: "20px", bottom: "20px" }}
            ></div>
        </Swiper>
    );
};
