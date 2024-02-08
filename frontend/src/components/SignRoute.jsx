import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
export default function SignRoute() {
    const { token } = useSelector((state) => state.user);
    // Jika tidak ada tokennya maka semua komponen atau path yang ada dalam SignRoute ini (di App.jsx)
    // akan di tampilkan sampai ke childrennya menggunakan outlet
    // jika token ada maka akan di navigasikan ke home
    return token ? <Navigate to="/" /> : <Outlet /> 
}
