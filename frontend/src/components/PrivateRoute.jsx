import {useSelector} from "react-redux";
import {Outlet, Navigate} from "react-router-dom";
export default function PrivateRoute() {
  const{token} = useSelector((state) => state.user);
  // Jika ada tokennya maka semua komponen atau path yang ada dalam PrivateRoute ini (di App.jsx)
  // maka akan di tampilkan sampai ke childrennya menggunakan outlet
  // jika token tidak ada maka akan di navigasikan ke sign in
  return token ? <Outlet /> : <Navigate to="/sign-in" />
}
