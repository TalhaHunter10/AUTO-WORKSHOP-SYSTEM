import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getReviews } from "../services/reviewService";
import {
  AlertOutlined,
  CarryOutOutlined,
  ClockCircleOutlined,
  DislikeOutlined,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Divider, Image } from "antd";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = async () => {
    setLoading(true);
    try {
      const response = await getReviews();
      setReviews(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch reviews");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-blue-500 htext text-4xl text-center my-10">
        Reviews
      </h1>
      <div className="mx-5 md:mx-[25%] my-5 min-h-[60vh]">
        {loading ? (
          <h1 className="text-center text-blue-500 text-2xl">Loading...</h1>
        ) : (
          <div>
            {reviews.length === 0 ? (
              <h1 className="text-center text-blue-500 text-2xl">
                No reviews available
              </h1>
            ) : (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="elevation bg-white shadow-md rounded-lg p-8 my-4 btext font-semibold bg-blue-100"
                >
                  <div className="md:flex  items-center">
                    <p className="text-blue-500 text-2xl md:text-3xl htext italic mt-3 mr-0 md:mr-8">
                      {review.review}
                    </p>
                    <Image
                      src="/icons/quotes.png"
                      preview={false}
                      width={100}
                      className="md:ml-10 -mb-6 hidden md:flex"
                    />
                  </div>
                  <div className="flex items-center text-sky-800">
                    <UserOutlined
                      className="text-3xl"
                      style={{ fontSize: 32, marginRight: 10 }}
                    />
                    <div className="-mt-3">
                      <p className="text-lg  font-bold btext mt-4">
                        {review.userId.name}
                      </p>
                      <p className="text-xs  btext ">
                        Member Since:{" "}
                        {moment(review.userId.createdAt).format("MMMM, YYYY")}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm text-right mt-6">
                    <ClockCircleOutlined style={{ marginRight: 5 }} />
                    {moment(review.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </p>

                  <Divider />
                  <p className="text-sky-800 text-base btext mb-2 ">
                    <CarryOutOutlined /> Appointment Subject
                  </p>
                  <h1 className="text-xl font-bold btext text-neutral-800 italic text-center">
                    {review.appointmentId.subject.charAt(0).toUpperCase() +
                      review.appointmentId.subject.slice(1)}
                  </h1>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
