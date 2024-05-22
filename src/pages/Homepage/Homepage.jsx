import styles from "./homepage.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import mac from "../../assets/images/g93.png";
import g94 from "../../assets/images/g95.png";
import g95 from "../../assets/images/g94.png";

import macMini from "../../assets/images/mac mini.png";
import coins from "../../assets/images/coin mini.png";
import pods from "../../assets/images/pods.png";
import phones from "../../assets/images/iphones.png";
import sneak from "../../assets/images/sneakers.png";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Nav } from "../../components/Nav/Nav";
import { ButtonDefault } from "../../components/ButtonDefault";

import { useTonConnectModal, useTonWallet } from "@tonconnect/ui-react";
import { useSelector } from "react-redux";
import { useState } from "react";

import "swiper/swiper-bundle.css";

import { Autoplay, Pagination } from "swiper/modules";

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

const productList = [
    {
        _id: "66447e09b20e2f30173329d3",
        product_id: 987654,
        name: "Nike Dunk Low",
        description:
            "The Nike Dunk Low offers comfort, style, and a classic look.",
        brand: "Nike",
        category: ["Footwear", "Sneakers"],
        attributes: {
            color: "Black/White",
            size: "US 10",
        },
        variations: [
            {
                name: "beige",
                avatar_small: "sample_image_url",
                product_card_images: [
                    "https://magaz.tonwinners.com/api/media/66485fe7b1b73f24f0e1263f",
                    "https://magaz.tonwinners.com/api/media/66485fe8b1b73f24f0e12641",
                    "https://magaz.tonwinners.com/api/media/66485fe8b1b73f24f0e12643",
                    "https://magaz.tonwinners.com/api/media/66485fe8b1b73f24f0e12645",
                    "https://magaz.tonwinners.com/api/media/66485fe8b1b73f24f0e12647",
                    "https://magaz.tonwinners.com/api/media/66485fe9b1b73f24f0e12649",
                ],
                images: ["sample_image_url_1", "sample_image_url_2"],
                types: [
                    {
                        name: "42",
                        stock: 15,
                        price: 120,
                        attributes: null,
                    },
                    {
                        name: "41",
                        stock: 20,
                        price: 130,
                        attributes: null,
                    },
                ],
            },
            {
                name: "red",
                avatar_small: "sample_image_url",
                product_card_images: [
                    "https://sport.pibig.info/uploads/posts/2023-10/1696767567_sport-pibig-info-p-belo-krasnie-krossovki-dlya-voleibola-vkon-52.jpg",
                    "https://sport.pibig.info/uploads/posts/2023-10/1696767567_sport-pibig-info-p-belo-krasnie-krossovki-dlya-voleibola-vkon-52.jpg",
                ],
                images: ["sample_image_url_1", "sample_image_url_2"],
                types: [
                    {
                        name: "43",
                        stock: 20,
                        price: 130,
                        attributes: null,
                    },
                    {
                        name: "42",
                        stock: 15,
                        price: 120,
                        attributes: null,
                    },
                    {
                        name: "41",
                        stock: 20,
                        price: 130,
                        attributes: null,
                    },
                ],
            },
        ],
        seller: "Sneaker Emporium",
        seller_id: 12345,
        seller_wallet: "TON_wallet_address_2",
        likes: 50,
    },
];

function Homepage() {
    const [slide, setSlide] = useState(0);
    const wallet = useTonWallet();
    const { open } = useTonConnectModal();
    // const productsList = useSelector((state) => state.products.productsList);

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
                {productList.map((data, index) => (
                    <ProductCard key={index} data={data} />
                ))}
            </div>
            {!wallet && (
                <ButtonDefault onClick={open}>Connect Wallet</ButtonDefault>
            )}
        </div>
    );
}
export default Homepage;
