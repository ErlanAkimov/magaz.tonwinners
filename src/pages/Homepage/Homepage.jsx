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
import axios from "axios";


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
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [displayCount, setDisplayCount] = useState(6);
    
    useEffect(() => {
        fetchProducts();
    }, []);
    
    const fetchProducts = async () => {
        await axios.get(`https://magaz.tonwinners.com/x-api/products/homepage`)
        .then(res => {
        console.log(res)
        setProducts(res.data);
        setDisplayedProducts(res.data.slice(0, displayCount));
        })
        .catch(error => {
        console.error('Error fetching products:', error);
        });
    };
    
    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
        setLoading(true);
        setDisplayCount(displayCount + 2);
        setDisplayedProducts(products.slice(0, displayCount + 2));
        setLoading(false);
        }
        };

        window.addEventListener('scroll', handleScroll);

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
                    {displayedProducts.map((data, index) => (
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