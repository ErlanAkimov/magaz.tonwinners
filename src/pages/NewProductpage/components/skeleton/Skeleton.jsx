import ContentLoader from "react-content-loader";

export const Skeleton = () => {
    const defaultAttributes = { rx: "5px", ry: "5px" };

    return (
        <ContentLoader
            speed={2}
            height={"100vh"}
            width={"100vw"}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" width="100%" height={"100vw"} />
            <rect
                y={"calc(100vw + 20px)"}
                x={"15px"}
                width={"110px"}
                height={"17.5px"}
                {...defaultAttributes}
            />
            <rect
                y={"calc(100vw + 20px)"}
                x={"calc(100vw - 15px - 125px)"}
                width={"125px"}
                height={"17.5px"}
                {...defaultAttributes}
            />
            <rect
                y={"calc(100vw + 20px + 17.5px + 10px)"}
                x={"15px"}
                width={"120px"}
                height={"42px"}
                {...defaultAttributes}
            />
            <rect
                y={"calc(100vw + 20px + 17.5px + 10px)"}
                x={"calc(100vw - 15px - 100px)"}
                width={"100px"}
                height={"42px"}
                {...defaultAttributes}
            />
            <rect
                y={"calc(100vw + 20px + 17.5px + 10px + 38px + 30px)"}
                x={"15px"}
                width={"100px"}
                height={"50px"}
                {...defaultAttributes}
            />
            <rect
                y={"calc(100vw + 20px + 17.5px + 10px + 38px + 30px)"}
                x={"calc(100px + 15px + 6px)"}
                width={"100px"}
                height={"50px"}
                {...defaultAttributes}
            />
            <rect
                y={
                    "calc(100vw + 20px + 17.5px + 10px + 38px + 30px + 50px + 10px)"
                }
                x={"15px"}
                width={"40px"}
                height={"40px"}
                {...defaultAttributes}
            />
            <rect
                y={
                    "calc(100vw + 20px + 17.5px + 10px + 38px + 30px + 50px + 10px)"
                }
                x={"calc(15px + 40px + 6px)"}
                width={"40px"}
                height={"40px"}
                {...defaultAttributes}
            />
            <rect
                y={
                    "calc(100vw + 20px + 17.5px + 10px + 38px + 30px + 50px + 10px + 40px + 20px)"
                }
                x={"15px"}
                width={"calc(100vw - 30px)"}
                height={"1px"}
                {...defaultAttributes}
            />
            <rect
                y={
                    "calc(100vw + 20px + 17.5px + 10px + 38px + 30px + 50px + 10px + 40px + 20px + 1px + 20px)"
                }
                x={"15px"}
                width={"calc((100vw - 30px) * 0.195)"}
                height={"63px"}
                {...defaultAttributes}
            />
            <rect
                y={
                    "calc(100vw + 20px + 17.5px + 10px + 38px + 30px + 50px + 10px + 40px + 20px + 1px + 20px)"
                }
                x={"calc(15px + (100vw - 30px) * 0.195 + 7px)"}
                width={"calc((100vw - 30px) * 0.388)"}
                height={"63px"}
                {...defaultAttributes}
            />
            <rect
                y={
                    "calc(100vw + 20px + 17.5px + 10px + 38px + 30px + 50px + 10px + 40px + 20px + 1px + 20px)"
                }
                x={
                    "calc(15px + (100vw - 30px) * 0.195 + 7px + (100vw - 30px) * 0.388 + 7px)"
                }
                width={"calc((100vw - 30px) * 0.388)"}
                height={"63px"}
                {...defaultAttributes}
            />
            <rect
                y={
                    "calc(100vw + 20px + 17.5px + 10px + 38px + 30px + 50px + 10px + 40px + 20px + 1px + 20px + 63px + 22px)"
                }
                x={"15px"}
                width={"calc(100vw - 30px)"}
                height={"99px"}
                {...defaultAttributes}
            />
            <rect
                y={
                    "calc(100vw + 20px + 17.5px + 10px + 38px + 30px + 50px + 10px + 40px + 20px + 1px + 20px + 63px + 22px + 99px + 20px)"
                }
                x={"15px"}
                width={"calc(100vw - 30px)"}
                height={"1px"}
                {...defaultAttributes}
            />
            <rect
                y={
                    "calc(100vw + 20px + 17.5px + 10px + 38px + 30px + 50px + 10px + 40px + 20px + 1px + 20px + 63px + 22px + 99px + 20px + 1px + 20px)"
                }
                x={"15px"}
                width={"calc(100vw - 30px)"}
                height={"110px"}
                {...defaultAttributes}
            />
        </ContentLoader>
    );
};
