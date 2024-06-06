import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    useRouteError,
    isRouteErrorResponse,
    useLocation,
} from "react-router-dom";

const URL = "https://magaz.tonwinners.com/api/error-report";

const ErrorContent = ({ children }) => {
    return (
        <div
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
            }}
        >
            <p
                style={{
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    fontSize: "24px",
                    textAlign: "center",
                }}
            >
                {children}
            </p>
        </div>
    );
};

export const Errorpage = () => {
    const user = useSelector((state) => state.user);
    const error = useRouteError();
    const { pathname: location } = useLocation();

    const sendReport = async () => {
        const stack = isRouteErrorResponse(error) ? error.error.stack : error;
        const body = { location, stack, user: user?._id || null };
        const response = await axios.post(URL, { body });
    };

    useEffect(() => {
        sendReport();
    }, []);

    if (isRouteErrorResponse(error)) {
        return <ErrorContent>Not found {error.status} 😓</ErrorContent>;
    }

    return <ErrorContent>Something went wrong 😕</ErrorContent>;
};
