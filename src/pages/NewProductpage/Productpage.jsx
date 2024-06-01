import { Product } from "./components/product/Product";
import { OtherProducts } from "./components/otherproducts/OtherProducts";
import { Nav } from "/src/components/Nav/Nav";

import styles from "./productpage.module.scss";
import { Skeleton } from "./components/skeleton/Skeleton";

const data = {
    product: {
        _id: "60c1f1b8a9d5a2e4b4c8a7f1",
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
    otherProducts: [
        {
            _id: "60c1f1b8a9d5a2e4b4c8a7f0",
            product_id: 123456,
            name: "Smartphone X",
            description:
                "This is a high-performance smartphone with advanced features.",
            brand: "TechMaster",
            category: ["Electronics", "Smartphones"],
            attributes: {
                color: "Black",
                weight: "150g",
            },
            variations: [
                {
                    name: "Color",
                    avatar_small: "sample_image_url",
                    product_card_images: [
                        "https://magaz.tonwinners.com/api/media/66447e09b20e2f30173329c8",
                        "https://magaz.tonwinners.com/api/media/66447e09b20e2f30173329ca",
                        "https://magaz.tonwinners.com/api/media/66447e09b20e2f30173329c9",
                        "https://magaz.tonwinners.com/api/media/66447e09b20e2f30173329c7",
                        "https://magaz.tonwinners.com/api/media/66447e09b20e2f30173329cb",
                    ],
                    images: ["sample_image_url_1", "sample_image_url_2"],
                    types: [
                        {
                            name: "Black",
                            stock: 10,
                            price: 500,
                            attributes: null,
                        },
                        {
                            name: "White",
                            stock: 5,
                            price: 550,
                            attributes: null,
                        },
                    ],
                },
            ],
            seller: "Gadget Universe",
            seller_id: 98765,
            seller_wallet: "TON_wallet_address_1",
            likes: 25,
        },
        {
            _id: "60c1f1b8a9d5a2e4b4c8a7f0",
            product_id: 123456,
            name: "Smartphone X",
            description:
                "This is a high-performance smartphone with advanced features.",
            brand: "TechMaster",
            category: ["Electronics", "Smartphones"],
            attributes: {
                color: "Black",
                weight: "150g",
            },
            variations: [
                {
                    name: "Color",
                    avatar_small: "sample_image_url",
                    product_card_images: [
                        "https://magaz.tonwinners.com/api/media/66447e09b20e2f30173329c8",
                        "https://magaz.tonwinners.com/api/media/66447e09b20e2f30173329ca",
                        "https://magaz.tonwinners.com/api/media/66447e09b20e2f30173329c9",
                        "https://magaz.tonwinners.com/api/media/66447e09b20e2f30173329c7",
                        "https://magaz.tonwinners.com/api/media/66447e09b20e2f30173329cb",
                    ],
                    images: ["sample_image_url_1", "sample_image_url_2"],
                    types: [
                        {
                            name: "Black",
                            stock: 10,
                            price: 500,
                            attributes: null,
                        },
                        {
                            name: "White",
                            stock: 5,
                            price: 550,
                            attributes: null,
                        },
                    ],
                },
            ],
            seller: "Gadget Universe",
            seller_id: 98765,
            seller_wallet: "TON_wallet_address_1",
            likes: 25,
        },
    ],
};

const Productpage = () => {
    return (
        <div className={styles.wrapper}>
            <Product data={data.product} />
            <OtherProducts data={data.otherProducts} />
            <Nav />
        </div>
    );
};

export default Productpage;