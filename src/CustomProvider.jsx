import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slice/userSlice";
import { Loader } from "./components/Loader";
import { api_server } from "./main";
import { initProductsList } from "./redux/slice/productsSlice";
import PropTypes from "prop-types";

function CustomProvider({ children }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [userLoaded, setUserLoaded] = useState(false);
    const [productLoaded, setProductLoaded] = useState(true);

    useEffect(() => {
        let body = {};
        const url = new URL(window.location.href);
        const tgWebAppStartParam = url.searchParams.get("tgWebAppStartParam");

        console.log(window.Telegram);

        const referer = Number(tgWebAppStartParam);

        if (Object.keys(window.Telegram.WebApp.initDataUnsafe).length === 0) {
            if (localStorage.getItem("testerMark")) {
                body.id = Number(localStorage.getItem("testerMark"));
            } else {
                body.id = 322;
            }
        }

        if (Object.keys(window.Telegram.WebApp.initDataUnsafe).length > 0) {
            body = {
                ...window.Telegram.WebApp.initDataUnsafe.user,
                webAppLaunched: true,
            };
        }

        if (referer) {
            body.referer = referer;
        }

        axios
            .post(`https://magaz.tonwinners.com/api/user`, body)
            .then((res) => {
                if (res.data !== "no user") {
                    dispatch(setUser(res.data));
                    setUserLoaded(true);
                }
            });
    }, [dispatch]);

    useEffect(() => {
        if (userLoaded && productLoaded) {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    }, [userLoaded, productLoaded]);

    return <>{loading ? <Loader /> : children}</>;
}

CustomProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CustomProvider;
