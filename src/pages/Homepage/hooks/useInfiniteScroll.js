// dependencies
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

// utils
import xApi from "/src/axios";

const products = [
    {
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
        comments: [
            {
                user: "user-1",
                date: "25.05.2024",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, iure?",
                rating: 5,
            },
            {
                user: "user-2",
                date: "25.05.2024",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, iure?  consectetur adipisicing elit. Nam, iure?",
                rating: 3,
            },
            {
                user: "user-3",
                date: "25.05.2024",
                text: "Lorem ipsum dolor sit amet",
                rating: 4,
            },
        ],
    },
    {
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
        comments: [
            {
                user: "user-1",
                date: "25.05.2024",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, iure?",
                rating: 5,
            },
            {
                user: "user-2",
                date: "25.05.2024",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, iure?  consectetur adipisicing elit. Nam, iure?",
                rating: 3,
            },
            {
                user: "user-3",
                date: "25.05.2024",
                text: "Lorem ipsum dolor sit amet",
                rating: 4,
            },
        ],
    },
    {
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
        comments: [
            {
                user: "user-1",
                date: "25.05.2024",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, iure?",
                rating: 5,
            },
            {
                user: "user-2",
                date: "25.05.2024",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, iure?  consectetur adipisicing elit. Nam, iure?",
                rating: 3,
            },
            {
                user: "user-3",
                date: "25.05.2024",
                text: "Lorem ipsum dolor sit amet",
                rating: 4,
            },
        ],
    },
];

export default () => {
    // const [products, setProducts] = useState(null);
    const { ref, inView } = useInView();

    const fetchProducts = async (params) => {
        try {
            const response = await xApi("/products/homepage", { params });

            setProducts([...(products || []), ...response.data]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // prettier-ignore
        const params = products?.length ? { limit: products?.length } : {};

        // inView && fetchProducts(params);
    }, [inView]);

    return { ref, products };
};
