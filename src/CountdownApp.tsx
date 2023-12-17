import { Route, Routes } from "react-router-dom";
import { CreditPage } from "./pages/CreditsPage/CreditsPage";
import { CountdownPage } from "./pages/CountDownPage/CountDownPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

export const CountdownApp = () => {
    return (
        <Routes>
            <Route path="/credits" element={<CreditPage />} />
            <Route index element={<CountdownPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};