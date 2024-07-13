import {Routes, Route} from "react-router-dom";
import Rules from "../pages/Rules";
import Phase from "../components/Phase";

const AllRoutes = () => {
    return <Routes>
        <Route path="/" element={<Phase />} />
        <Route path="/rules" element={<Rules />} />
    </Routes>
}

export default AllRoutes;