import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";

import { addToCart, pushWallet } from "/src/redux/slice/userSlice";

import { Description } from "../description/Description";
import { Slider } from "../slider/Slider";
import { Title } from "../title/Title";
import { PriceAndOrderButton } from "../priceandorderbutton/PriceAndOrderButton";
import { Colors } from "../colors/Colors";
import { Sizes } from "../sizes/Sizes";
import { Button } from "../button/Button";
import { Line } from "../line/Line";
import { Banner } from "../banner/Banner";
import { SocialFeedback } from "../socialfeedback/SocialFeedback";

export const Product = ({ data }) => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const friendlyAddress = useTonAddress();
    const [currentVariation, setCurrentVariation] = useState(0);
    const [size, setSize] = useState(0);
    const [tonConnectUI] = useTonConnectUI();
    const user = useSelector((state) => state.user);
    const productInCart = useSelector(
        (state) =>
            state.user.cart.filter((item) => item._id === productId)[0]?.counter
    );

    const addToCartHandler = (product) => {
        () => {
            if (productInCart > 0) {
                navigate("/orders");
                return;
            }

            dispatch(addToCart(product));
            navigate("/orders");
        };
    };

    const setCurrentVariationHandler = (index) => {
        setCurrentVariation(index);
        setSize(0);
    };

    useEffect(() => {
        tonConnectUI.uiOptions = {
            actionsConfiguration: {
                modals: ["before", "success", "error"],
                notifications: ["before", "success", "error"],
            },
        };

        const gohome = () => {
            window.Telegram.WebApp.onEvent("backButtonClicked", gohome);
            navigate("/");
        };

        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.onEvent("backButtonClicked", gohome);
    }, [navigate, tonConnectUI]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [data]);

    useEffect(() => {
        if (friendlyAddress && !user.wallets.includes(friendlyAddress)) {
            dispatch(pushWallet(friendlyAddress));
        }
    }, [friendlyAddress, dispatch, user.wallets]);

    return (
        <>
            <Slider
                variations={data.variations}
                currentVariation={currentVariation}
                id={productId}
            />
            <Title name={data.name} seller={data.seller} />
            <PriceAndOrderButton
                addToCart={addToCartHandler}
                user={user}
                price={data.variations[currentVariation].types[size].price}
            />
            <Colors
                variations={data.variations}
                onChange={setCurrentVariationHandler}
                currentVariation={currentVariation}
            />
            <Sizes
                data={data.variations[currentVariation].types}
                currentSize={size}
                onChange={setSize}
            />
            <Line />
            <SocialFeedback likes={data.likes} comments={data.comments} />
            <Description text={data.description} />
            <Line />
            <Banner />
            <Button productInCart={productInCart} />
        </>
    );
};
