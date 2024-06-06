import styles from "./nftCard.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

export const NftCard = ({ data }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={styles.root} onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
            <div className={styles.rating}>
                <p>
                    R: <span>{data?.important}</span>/5555
                </p>
            </div>
            <Swiper className={styles.imgBlock} onSlideChange={(s) => setImageIndex(s.activeIndex)} onClick={() => navigate(`/bundles/${data._id}`)}>
                {data.images
                    .filter((name) => name.split("-")[1] !== "video")
                    .map((image, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <img loading="lazy" style={{ userSelect: "none" }} src={image} alt="" />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
            <div className={styles.dots}>
                {data.images
                    .filter((name) => name.split("-")[1] !== "video")
                    .map((image, index) => (
                        <div key={index} className={styles.dot} style={{ backgroundColor: imageIndex === index && "#a9a1a1" }} />
                    ))}
            </div>
            <div className={styles.info}>
                <p className={styles.name}>{data.name}</p>
                <p className={styles.desc}>{data.description}</p>
            </div>
        </div>
    );
};
