import { LikeToggler } from "../../components/LikeToggler";
import { Slider } from "./components/slider/Slider";
import { Info } from "./components/info/Info";

const DEFAULT_VARIATION = 0;

export const ProductCard = ({ data }) => {
    const { product_card_images, types } = data.variations[DEFAULT_VARIATION];

    return (
        <div style={{ position: "relative" }}>
            <LikeToggler productId={data._id} top={10} right={12} width={30} />
            <Slider id={data._id} photos={product_card_images} />
            <Info name={data.name} id={data._id} price={types[0].price} />
        </div>
    );
};
