import { Link } from "react-router-dom";

const UHeader = () => {
  return (
    <div>
      <div className="flex justify-between align-center">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="logo"
            className="weblogo w-36 md:w-64 cursor-pointer"
          ></img>
        </Link>

        <div className="navbar w-[80%] h-auto content-center">
          <div className="">
            <div className="bookingbutton flex justify-end ">
              <p className="bg-neutral-50 h-6 md:h-12 transform  skew-x-[-45deg] w-[12%]"></p>
              <p className="bg-blue-500 h-6 md:h-12 w-[60%] lg:w-[35%] -ml-6 text-center content-center cursor-pointer text-stone-200 hover:text-blue-500 hover:bg-stone-200 duration-300">
                <Link to="">
                  <span className="htext text-xs md:text-lg lg:text-xl ">
                    Book Appointment
                  </span>
                </Link>
              </p>

              <p className="bg-neutral-50 h-6 md:h-12 transform  skew-x-[45deg] w-[12%] -ml-6"></p>
            </div>
            <div className="flex justify-stretch">
              <p className="bg-neutral-50 h-8 md:h-14 transform  skew-x-[-45deg] w-[15%]"></p>
              <div className="strip bg-neutral-400 h-8 md:h-14 align-center content-center w-full -ml-7">
                {/*Navbar*/}
                <div className="pl-20">
                  <p className="">afadsfasdfdagf</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UHeader;
