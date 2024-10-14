import { useNavigate } from "react-router-dom";
import { checkLoginStatus } from "../../services/authService";
import { useEffect, useState } from "react";
import { getFinancialData } from "../../services/financialServices";
import { toast } from "react-toastify";
import { Loader } from "../../components/loader";
import { PlusOutlined } from "@ant-design/icons";
import Button from "../../components/button";

const FinancialManagement = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [financialData, setFinancialData] = useState([]);

  useEffect(() => {
    LoginStatus();
    fetchFinancialData();
  }, []);

  const LoginStatus = async () => {
    try {
      const res = await checkLoginStatus();
      if (res.data.verified) {
        setLoggedInUser(res.data.user);
      } else {
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFinancialData = async () => {
    setIsLoading(true);
    try {
      const res = await getFinancialData();
      if (res.status === 200) {
        setFinancialData(res.data);
      } else {
        toast.error("Error occurred while fetching financial data");
      }
      setIsLoading(false);
    } catch (error) {
      setErrors(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="md:mx-20">
      <Loader isLoading={isLoading} />
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-blue-500 htext text-base md:text-3xl  my-5">
            Finance Management
          </h1>
          <Button
            text={
              <>
                <PlusOutlined style={{ marginRight: 5 }} /> Transaction
              </>
            }
            style="px-4 md:px-6 rounded-lg h-10 md:h-12 text-sm md:text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialManagement;
