
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Atendimento } from "../pages/Atendimento";


export const Router = () => {
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/home" element= {<Home/>}/>
        <Route path="/atendimento/:id" element={<Atendimento/>}></Route>
        <Route path="*" element={<Navigate to = "/home"/>}></Route>
        </Routes>
        </BrowserRouter>
    );
}