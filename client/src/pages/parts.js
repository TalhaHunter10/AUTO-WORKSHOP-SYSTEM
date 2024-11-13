import Search from "antd/es/input/Search";
import { Loader } from "../components/loader";
import { useEffect, useState } from "react";
import { getAllParts } from "../services/partsService";
import { toast } from "react-toastify";
import PartsListingContainer from "../components/partsListingContainer";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import { checkLoginStatus } from "../services/authService";

const Parts = () => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [originalParts, setOriginalParts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkIsLoggedIn();
    fetchParts();
  }, []);

  const checkIsLoggedIn = async () => {
    try {
      const res = await checkLoginStatus();
      if (res.data.verified) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Failed to check login status");
    }
  };

  const fetchParts = async () => {
    setLoading(true);
    try {
      const response = await getAllParts();
      if (response.status === 200) {
        setParts(response.data);
        setOriginalParts(response.data);
        setVisibleCount(8);
        setLoading(false);
      } else {
        toast.error("Failed to fetch parts");
      }
    } catch (error) {
      toast.error("Failed to fetch parts");
    }
    setLoading(false);
  };

  const onSearch = (value) => {
    value = value.trim();
    if (value === "") {
      fetchParts();
    } else {
      const searchWords = value.toLowerCase().split(" ");
      const searchResults = originalParts.filter((part) => {
        return searchWords.some(
          (word) =>
            part.partName.toLowerCase().includes(word) ||
            part.partCompany.toLowerCase().includes(word) ||
            part.description.toLowerCase().includes(word)
        );
      });

      setParts(searchResults);
    }
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  return (
    <div className="mx-5 md:mx-20 mb-10">
      <Loader isLoading={loading} />
      <div className="flex flex-wrap space-y-2 md:space-y-0 justify-center md:flex-row md:justify-between md:mt-10 align-center">
        <h1 className="w-full md:w-1/3 text-center md:text-left htext text-3xl md:text-4xl text-blue-500">
          Browse Parts
        </h1>
        <div className="w-full md:w-1/3">
          <Search
            placeholder="Search parts"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            className="border-2 border-blue-500 rounded-lg font-semibold"
          />
        </div>
      </div>

      {parts.length > 0 ? (
        <div className="">
          <PartsListingContainer Part={parts.slice(0, visibleCount)} />
        </div>
      ) : (
        <h1 className="text-center htext text-2xl text-red-500 my-20">
          NO PARTS FOUND
        </h1>
      )}
      {visibleCount < parts.length && ( // Show button only if there are more parts to load
        <div className="flex justify-center mt-4">
          <Button
            text={"Load More"}
            style={
              "bg-blue-500 text-lg text-white font-semibold rounded-lg p-2 px-4 w-48"
            }
            onClick={loadMore}
          />
        </div>
      )}
      <div className=" border-2 border-blue-500 p-10 rounded-lg ml-10 mr-10 mt-10">
        <h1 className="md:text-3xl btext md:pl-8">
          Want to book appointment here at{" "}
          <span className="htext text-blue-500">Capital Autos?</span>
        </h1>
        <p className=" text-right mt-4 mr-8">
          <Button
            text="Book Appointment"
            style="htext text-sm md:text-xl px-4 md:px-6 py-2 rounded-md"
            onClick={() => {
              if (isLoggedIn) {
                navigate("/appointment");
              } else {
                toast.error("Login to book appointment !");
                navigate("/login");
              }
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default Parts;
