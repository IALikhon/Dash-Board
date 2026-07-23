import { Outlet } from "react-router-dom";
import DashBoard from "../pages/DashBoard";

const DashBoardLayout = () => {
    return ( 
        <div>
            <DashBoard />
            <Outlet />
        </div>
     );
}
 
export default DashBoardLayout;