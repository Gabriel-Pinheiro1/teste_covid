
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Atendimento } from "../pages/Atendimento";
import { EditarPaciente } from "../pages/EditarPaciente";


export const Router = () => {
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/home" element= {<Home/>}></Route>
        <Route path="/atendimento/:id" element={<Atendimento/>}></Route>
        <Route path = "/editarPaciente/:id" element={<EditarPaciente/>}></Route>
        <Route path="*" element={<Navigate to = "/home"/>}></Route>
        </Routes>
        </BrowserRouter>
    );
}