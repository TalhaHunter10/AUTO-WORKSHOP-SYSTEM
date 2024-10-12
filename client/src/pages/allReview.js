import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getReviews } from "../services/reviewService";
import {
  ClockCircleOutlined,
  DislikeOutlined,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Image } from "antd";

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
        Reviews <LikeOutlined className="text-green-500" />
        <DislikeOutlined className="text-red-500" />
      </h1>
      <div className="mx-5 md:mx-[25%] min-h-[60vh]">
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
                  className="elevation bg-white shadow-md rounded-lg p-8 my-4 btext font-semibold"
                >
                  <h1 className="text-xl font-bold htext text-sky-800">
                    {review.appointmentId.subject}
                  </h1>
                  <span className="text-gray-500 text-sm btext ">
                    (Appointment Subject)
                  </span>
                  <p className="text-blue-500 text-xl md:text-2xl btext text-right italic mt-3 mr-8">
                    <Image
                      src="/icons/startquotes.png"
                      preview={false}
                      width={25}
                      className="-mt-1"
                    />{" "}
                    {review.review}
                    <Image
                      src="/icons/endquotes.png"
                      preview={false}
                      width={25}
                      className="ml-2 -mb-3"
                    />
                  </p>
                  <p className="text-lg text-neutral-900 italic font-bold btext text-right mt-2">
                    {review.userId.name}
                  </p>

                  <p className="text-gray-900 text-sm text-right mt-6">
                    <ClockCircleOutlined style={{ marginRight: 5 }} />
                    {moment(review.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </p>
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
