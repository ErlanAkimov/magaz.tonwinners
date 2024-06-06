import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeToggler } from "../redux/slice/userSlice";

import { LikeIcon } from "/src/icons/like/LikeIcon";

export const LikeToggler = ({ ...props }) => {
    const user = useSelector((state) => state.user);
    const [like, setLike] = React.useState(false);

    React.useEffect(() => {
        if (user) {
            const s = user.likedProducts.filter((a) => a === props.productId);
            s.length === 0 ? setLike(false) : setLike(true);
        }
    }, [user, props.productId]);
    const dispatch = useDispatch();

    return (
        <div
            onClick={() => dispatch(likeToggler(props.productId))}
            style={{
                width: Number(props.width),
                borderRadius: 100,
                backgroundColor: "#fff",
                position: "absolute",
                top: Number(props.top),
                right: Number(props.right),
                aspectRatio: 1,
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
            }}
        >
            <LikeIcon isActive={like} />
        </div>
    );
};
