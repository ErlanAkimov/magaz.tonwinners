import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

import styles from "./prodCard.module.scss";

import { LikeToggler } from "../../components/LikeToggler";

import useSlider from "/src/hooks/useSlider";

export const ProductCard = ({ data }) => {
    const navigate = useNavigate();
    const { images, setSlide, currentSlide } = useSlider({ images: data.images });

    return (
        <div className={styles.wrapper} style={{ position: "relative" }}>
            <LikeToggler productId={data._id} top={10} right={12} width={30} />
            <Swiper className={styles.imgBlock} onSlideChange={(s) => setSlide(s.activeIndex)} onClick={() => navigate(`/product/${data._id}`)}>
                {images
                    .filter((name) => name?.split("-")[1] !== "video")
                    .map((image, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <img loading="lazy" style={{ userSelect: "none" }} src={image} alt="" />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
            <div className={styles.dots}>
                {images
                    .filter((name) => name?.split("-")[1] !== "video")
                    .map((_, index) => {
                        return <div key={index} className={styles.dot} style={{ backgroundColor: currentSlide === index && "#a9a1a1" }}></div>;
                    })}
            </div>
            <div onClick={() => navigate(`/product/${data._id}`)}>
                <h3 className={styles.name}>{data.name}</h3>
                <div className={styles.price}>
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.5 0C4.9775 0 0.5 4.4775 0.5 10C0.5 15.5225 4.9775 20 10.5 20C16.0225 20 20.5 15.5225 20.5 10C20.5 4.4775 16.0225 0 10.5 0ZM7.085 5.58083H13.915C15.1692 5.58083 15.9667 6.9375 15.3358 8.03083L11.12 15.335C11.057 15.4436 10.9666 15.5338 10.8578 15.5965C10.749 15.6592 10.6256 15.6922 10.5 15.6922C10.3744 15.6922 10.251 15.6592 10.1422 15.5965C10.0334 15.5338 9.94299 15.4436 9.88 15.335L5.66583 8.03083C5.03417 6.93583 5.83 5.58083 7.085 5.58083ZM11.1217 6.8275V13.1442L12.04 11.3708L14.2533 7.4075C14.2872 7.3483 14.3049 7.2812 14.3045 7.21299C14.3042 7.14478 14.2858 7.07786 14.2513 7.01902C14.2168 6.96017 14.1674 6.91147 14.1081 6.87784C14.0487 6.84421 13.9815 6.82685 13.9133 6.8275H11.1217ZM7.08333 6.82917C7.01527 6.82843 6.94821 6.84567 6.88895 6.87915C6.82968 6.91263 6.78031 6.96117 6.74581 7.01985C6.71131 7.07853 6.69292 7.14527 6.69248 7.21334C6.69205 7.28141 6.70959 7.34838 6.74333 7.4075L8.95833 11.3692L9.87667 13.1442V6.82917H7.08333Z"
                            fill="#06A5FF"
                        />
                    </svg>
                    <p>
                        {data.price} {data.currency}
                    </p>
                </div>

                <div className={styles.dCost}>
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.87606 5.81999L7.21939 7.06199C7.54273 8.23199 7.70406 8.81732 8.17939 9.08332C8.65473 9.34999 9.25806 9.19266 10.4647 8.87932L11.7447 8.54599C12.9514 8.23266 13.5547 8.07599 13.8294 7.61532C14.1041 7.15399 13.9427 6.56865 13.6187 5.39865L13.2761 4.15732C12.9527 2.98665 12.7907 2.40132 12.3161 2.13532C11.8401 1.86866 11.2367 2.02599 10.0301 2.33999L8.75006 2.67199C7.54339 2.98532 6.94006 3.14266 6.66606 3.60399C6.39139 4.06466 6.55273 4.64999 6.87606 5.81999Z"
                            fill={"#EDA44E"}
                        />
                        <path
                            d="M2.018 3.498C2.03557 3.43468 2.06544 3.37545 2.10591 3.32368C2.14638 3.27192 2.19666 3.22864 2.25387 3.19632C2.31108 3.164 2.3741 3.14327 2.43933 3.13532C2.50455 3.12738 2.57071 3.13236 2.634 3.15L3.76934 3.46466C4.07023 3.54638 4.34482 3.70466 4.56634 3.92408C4.78786 4.1435 4.94875 4.41656 5.03334 4.71666L6.46734 9.90733L6.57267 10.272C6.99784 10.4287 7.35612 10.727 7.58734 11.1167L7.794 11.0527L13.7073 9.516C13.7709 9.49945 13.8371 9.49559 13.9021 9.50462C13.9672 9.51366 14.0298 9.53542 14.0865 9.56866C14.1431 9.60191 14.1927 9.64598 14.2323 9.69837C14.2719 9.75076 14.3008 9.81044 14.3173 9.874C14.3339 9.93756 14.3377 10.0038 14.3287 10.0688C14.3197 10.1339 14.2979 10.1965 14.2647 10.2531C14.2314 10.3098 14.1874 10.3593 14.135 10.3989C14.0826 10.4385 14.0229 10.4675 13.9593 10.484L8.068 12.0147L7.848 12.0827C7.844 12.9293 7.25934 13.704 6.37467 13.9333C5.31467 14.2093 4.22467 13.5987 3.94067 12.5707C3.65667 11.542 4.286 10.4847 5.346 10.2093C5.39823 10.1959 5.45093 10.1843 5.504 10.1747L4.06934 4.98266C4.03072 4.84927 3.95823 4.72815 3.85893 4.63107C3.75963 4.53399 3.6369 4.46426 3.50267 4.42866L2.36667 4.11333C2.30337 4.09583 2.24413 4.06603 2.19234 4.02564C2.14056 3.98524 2.09724 3.93504 2.06486 3.8779C2.03248 3.82075 2.01168 3.75779 2.00364 3.69261C1.9956 3.62742 2.00048 3.56129 2.018 3.498Z"
                            fill={"#EDA44E"}
                        />
                    </svg>
                    <p>{"Free Delivery"}</p>
                </div>
            </div>
        </div>
    );
};
