
import { Link } from "react-router-dom";
import Button from "../components/button";

const PageNotFound = () => {
    return(
        <div className="text-stone-200 text-center alluse p-5">

            <img src="/illustrations/404.png" alt="404" className="md:w-[35%] mx-auto" />

            <Link to={"/"}><Button text="Return Home" style="mt-8 mb-5 w-48 h-12 text-xl rounded-md" link="/"/></Link>

        </div>
    );
}

export default PageNotFound;