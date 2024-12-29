import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AppLayout} from "./layouts/AppLayout.tsx";
import {DashBoardView} from "./views/DashBoardView.tsx";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<DashBoardView/>} index/>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}