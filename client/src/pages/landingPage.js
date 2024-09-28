import { useEffect, useRef, useState } from "react";
import Button from "../components/button";

const LandingPage = ({ aboutUsRef, servicesRef }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check the size initially

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div
        className={`${!isMobile ? "bg-landing" : ""}`}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className={`${!isMobile ? "overlay" : ""}`}>
          <div className="flex px-10 lg:px-28 h-[85vh] lg:items-center">
            <h1 className="htext text-3xl lg:text-6xl text-blue-600 lg:text-stone-200 lg:w-[50%] leading-tight mt-14 lg:mt-0">
              CAPITAL AUTOMOBILE ENGINEERS
              <h2 className="btext text-xl lg:text-3xl  text-blue-600 lg:text-stone-200 mt-6">
                Drive with confidence, powered by Capital Autos
              </h2>
              <div className="flex flex-wrap mt-10 lg:mt-28 space-y-5 2xl:space-y-0">
                <Button
                  text="MAKE APPOINTMENT"
                  style="htext rounded-none text-base lg:text-2xl px-10 py-3 mr-10 "
                />
                <div className="flex items-center">
                  <img src="/icons/phone.png" alt="arrow" className="w-8 h-8" />
                  <h1 className="htext text-xl lg:text-3xl md:ml-2">
                    +92 333 5188 007
                  </h1>
                </div>
              </div>
            </h1>
          </div>
          <div className="flex flex-wrap justify-around mx-10 lg:mx-48 bg-stone-200 rounded-md -mt-64 lg:-mt-20 2xl:mt-0 p-5 md:p-0">
            <div className="flex items-center my-6">
              <img
                src="/icons/location.png"
                alt="repairIcon"
                className="w-12 h-12 mr-4"
              />
              <p className="htext text-xl text-gray-600 mt-2">
                LOCATION
                <p className="btext text-lg mt-1 hover:text-blue-600 hover:scale-105 duration-300 transform cursor-pointer">
                  View our location{" "}
                </p>
              </p>
            </div>
            <div className="flex items-center my-6">
              <img
                src="/icons/calender.png"
                alt="repairIcon"
                className="w-12 h-12 mr-4"
              />
              <p className="htext text-xl text-gray-600 mt-2">
                AVAILABLE 24/7
                <p className="btext text-lg mt-1 hover:text-blue-600 hover:scale-105 duration-300 transform cursor-pointer">
                  Artifical Intelligence CHATBOT{" "}
                </p>
              </p>
            </div>
            <Button
              text="AI CHAT ASSISTANT"
              style="htext text-lg px-6 py-2 rounded-md my-6"
            />
          </div>
        </div>
      </div>

      {/* Blue Section */}
      <div className="bg-blue-600 my-16 flex flex-wrap justify-around p-6">
        <div className="flex w-96 my-5 items-center">
          <img
            src="/icons/bestPrices.png"
            alt="bestPriceIcon"
            className="w-20 h-20 mr-6"
          />
          <div className="p-3">
            <p className="text-white text-lg htext">BEST PRICES</p>
            <p className="text-white text-medium btext mt-2">
              All mechanical repairs and services are available at affordable
              rates.
            </p>
          </div>
        </div>
        <div className="flex w-96 my-5 items-center">
          <img
            src="/icons/guarantee.png"
            alt="guaranteeIcon"
            className="w-20 h-20 mr-6"
          />
          <div className="p-3">
            <p className="text-white text-lg htext">100% GUARANTEE</p>
            <p className="text-white text-medium btext mt-2">
              All of out repairs and services come with a guarantee period.
            </p>
          </div>
        </div>
        <div className="flex w-96 my-5 items-center">
          <img
            src="/icons/certified.png"
            alt="certifiedIcon"
            className="w-20 h-20 mr-6"
          />
          <div className="p-3">
            <p className="text-white text-lg htext">CERTIFIED MECHANICS</p>
            <p className="text-white text-medium btext mt-2">
              Our mechanics are certified and have years of experience.
            </p>
          </div>
        </div>
      </div>

      {/* About Us SECTION */}
      <div
        ref={aboutUsRef}
        className="g-6 flex h-full flex-wrap justify-center lg:justify-between mb-20"
      >
        <div className="shrink-1 mb-12 grow-0 basis-auto  xl:w-6/12 sm:px-20">
          <img
            src="/images/landingImage1.png"
            className="w-full"
            alt="Mechanic One"
          />
        </div>
        <div className=" sm:w-full xl:w-6/12 px-10 sm:px-48 ">
          <h1 className="htext text-4xl text-blue-600 font-bold text-center mb-6">
            ABOUT US
          </h1>

          <p className="btext text-justify text-gray-950 font-semibold">
            Welcome to Capital Autos, your trusted destination for reliable car
            repair and maintenance. We are dedicated to delivering high-quality
            service with a focus on customer satisfaction and transparent
            pricing. Our skilled team is committed to keeping your vehicle
            running smoothly and safely.
          </p>

          <p className="btext text-justify text-gray-950 font-semibold mt-2">
            Thank you for choosing{" "}
            <span className="text-blue-600">Capital Autos</span>, your trusted
            partner in automotive care.
          </p>
          <h2 className="btext text-3xl text-gray-950 font-bold text-center my-5">
            Certified in car service, repairs and maintenance
          </h2>
          <img
            src="/images/landingImage2.png"
            className="w-full"
            alt="Mechanic Two"
          />
        </div>
      </div>

      {/* Services Section */}
      <div
        ref={servicesRef}
        className={`my-20 ${!isMobile ? "bg-services" : ""}`}
        style={{ width: "100vw" }}
      >
        <div className="flex flex-wrap justify-center">
          <h1 className="htext text-4xl text-blue-600 font-bold text-center mt-12 mb-5">
            OUR SERVICES
          </h1>
        </div>
        <p className="btext text-2xl font-black text-gray-950 text-center px-4 md:p-0">
          At Capital Autos, we provide a full range of automotive services to
          keep your vehicle in top condition.
        </p>
        <div className="flex flex-wrap justify-around mt-14 space-y-16 sm:space-y-0 pb-20">
          <div className="md:w-[17%] px-20 sm:p-0">
            <img
              src="/images/services1.png"
              className="w-full "
              alt="Service One"
            />
            <p className="htext text-2xl sm:text-xl lg:text-3xl mt-6 text-gray-950 text-center">
              Body Work
            </p>
          </div>
          <div className="md:w-[17%] px-20 sm:p-0">
            <img
              src="/images/services2.png"
              className="w-full"
              alt="Service Two"
            />
            <p className="htext text-2xl sm:text-xl lg:text-3xl mt-6 text-gray-950 text-center">
              Air Conditioning
            </p>
          </div>

          <div className="md:w-[17%] px-20 sm:p-0">
            <img
              src="/images/services3.png"
              className="w-full "
              alt="Service Three"
            />
            <p className="htext text-2xl sm:text-xl lg:text-3xl mt-6 text-gray-950 text-center">
              Electrical
            </p>
          </div>

          <div className="md:w-[17%] px-20 sm:p-0">
            <img
              src="/images/services4.png"
              className="w-full "
              alt="Service Four"
            />
            <p className="htext text-2xl sm:text-xl lg:text-3xl mt-6 text-gray-950 text-center">
              Alloy Repairing
            </p>
          </div>

          <div className="md:w-[17%] px-20 sm:p-0">
            <img
              src="/images/services5.png"
              className="w-full "
              alt="Service Five"
            />
            <p className="htext text-2xl sm:text-xl lg:text-3xl mt-6 text-gray-950  text-center">
              Mechanical
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
