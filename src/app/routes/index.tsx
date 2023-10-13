
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";


export const Router = () => {
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/home" element= {<Home/>}/>
        <Route path="/login" element={<Home/>}></Route>
        <Route path="*" element={<Navigate to = "/home"/>}></Route>
        </Routes>
        </BrowserRouter>
    );
}