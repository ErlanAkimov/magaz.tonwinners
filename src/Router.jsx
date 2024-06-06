import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

// import Productpage from "./pages/Productpage/Productpage";
import NewProductpage from "./pages/NewProductpage/Productpage";
import Homepage from "./pages/Homepage/Homepage";
import GoToMiniApp from "./pages/GoToMiniApp/GoToMiniApp";
import Profile from "./pages/Profile/Profile";
import { Categoriespage } from "./pages/Categories/Categoriespage";
import { ChangeAddress } from "./pages/ChangeAddress/ChangeAddress";
import { CreateNewAddress } from "./pages/CreateNewAddress/CreateNewAddress";
import { Orderspage } from "./pages/Cart/Orderspage";
import { Paymentpage } from "./pages/Paymentpage/Payment.page";
import { CreateNewRecipient } from "./pages/CreateNewRecipient/CreateNewRecipitent";
import { ChangeRecipient } from "./pages/ChangeRecipient/ChangeRecipient";
import { Errorpage } from "./pages/Errorpage/Errorpage";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" errorElement={<Errorpage />}>
            <Route index element={<Homepage />} />
            <Route path="categories" element={<Categoriespage />} />
            <Route path="new-product/:productId" element={<NewProductpage />} />

            {/* Saved Addresses */}
            <Route path="create-new-address" element={<CreateNewAddress />} />
            <Route
                path="change-my-address/:addressId"
                element={<ChangeAddress />}
            />
            {/* Recipients */}
            <Route
                path="create-new-recipient"
                element={<CreateNewRecipient />}
            />
            <Route
                path="change-my-recipient/:recipientId"
                element={<ChangeRecipient />}
            />
            <Route path="orders" element={<Orderspage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="payment" element={<Paymentpage />} />
        </Route>
    )
);

export const desktopRouter = createBrowserRouter([
    {
        path: "*",
        element: <GoToMiniApp />,
    },
]);
