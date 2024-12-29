import {BrowserRouter, Routes, Route} from "react-router-dom";

export default function router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <h1 className={"text-6xl"}>Hola mundo</h1>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}