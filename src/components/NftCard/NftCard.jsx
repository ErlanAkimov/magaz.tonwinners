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
            <div className={`${styles.rating} ${isVisible && styles.active}`}>
                <p>
                    R: <span>{data?.rarityFrom}</span>/5555
                    {/* Поле поставил для примера, не уверен что верно 'rarityFrom' */}
                </p>
            </div>
            <div className={styles.top} onClick={() => navigate(`/bundles/${data.nft_address}`)}>
                <div className={styles.img}>
                    <img src={data.image.sized} />
                </div>
                <div className={styles.marker}>
                    <img src={"/src/assets/images/marker.svg"} />
                </div>
            </div>
            <div className={styles.info}>
                <p className={styles.name}>{data.name}</p>
                <p className={styles.desc}>{data.description}</p>
            </div>
        </div>
    );
};
