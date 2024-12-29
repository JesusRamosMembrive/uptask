import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AppLayout} from "./layouts/AppLayout.tsx";
import {DashBoardView} from "./views/DashBoardView.tsx";
import {CreateProjectView} from "./views/projects/CreateProjectView.tsx";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<DashBoardView/>} index/>
                    <Route path="/projects/create" element={<CreateProjectView/>}/>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}