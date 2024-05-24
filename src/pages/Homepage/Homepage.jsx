// styles
import styles from "./homepage.module.scss";
import "swiper/swiper-bundle.css";

// images 
import mac from "../../assets/images/g93.png";
import g94 from "../../assets/images/g95.png";
import g95 from "../../assets/images/g94.png";
import macMini from "../../assets/images/mac mini.png";
import coins from "../../assets/images/coin mini.png";
import pods from "../../assets/images/pods.png";
import phones from "../../assets/images/iphones.png";
import sneak from "../../assets/images/sneakers.png";

// components
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Nav } from "../../components/Nav/Nav";
import { ButtonDefault } from "../../components/ButtonDefault";

// utils
import xApi from "/src/axios";

// dependencies
import { useTonConnectModal, useTonWallet } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const cats = [
    {
        img: macMini,
        text: "macbooks",
    },
    {
        img: coins,
        text: "dropcoins",
    },
    {
        img: pods,
        text: "headphones",
    },
    {
        img: phones,
        text: "iphones",
    },
    {
        img: sneak,
        text: "sneakers",
    },
];

function Homepage() {
    const [slide, setSlide] = useState(0);
    const wallet = useTonWallet();
    const { open } = useTonConnectModal();
    const [productsList, setProductsList] = useState(null);
    const { ref, inView } = useInView();

    const fetchProducts = async (params) => {
        try {
            const response = await xApi("/products/homepage", { params })
            setProductsList([...(productsList || []), ...response.data]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // prettier-ignore
        const params = productsList?.length ? { limit: productsList?.length } : {};
        inView && fetchProducts(params);
    }, [inView]);

    return (
        <div className={styles.wrapper}>
            <Nav />
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

            {/* <div className={styles.categories}>
				{cats.map((cat) => {
					return (
						<div key={cat.text} className={styles.catItems}>
							<div className={styles.catImageBlock}>
								<img src={cat.img} alt="" />
							</div>
							<p className={styles.catText}>{cat.text}</p>
						</div>
					);
				})}
			</div> */}

            <h2 className={styles.catalogTitle}>New from MAGAZ</h2>
            <div className={styles.catalog}>
                {productsList &&
                    productsList.map((data, index) => (
                        <ProductCard key={index} data={data} />
                    ))}
                <div ref={ref} /> {/* Trigger */}
            </div>

            {!wallet && (
                <ButtonDefault onClick={open}>Connect Wallet</ButtonDefault>
            )}
        </div>
    );
}
export default Homepage;
