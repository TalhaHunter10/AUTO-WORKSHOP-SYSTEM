import {
  CarryOutOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  PercentageOutlined,
  PlusOutlined,
  SnippetsOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { getStats } from "../../services/dashboardService";
import { Loader } from "../../components/loader";
import { toast } from "react-toastify";
import { Chart } from "react-google-charts";

const Dashboard = ({ changeTab }) => {
  const [chartData, setChartData] = useState([["Item", "Value"]]);
  const [barChartData, setBarChartData] = useState([
    ["Month", "Income", "Expense"],
  ]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    totalAppointments: "",
    pending: "",
    approved: "",
    rejected: "",
    completed: "",
    discarded: "",
    total: "",
    totalPercentage: "",
    new: "",
    newPercentage: "",
    monthlyIncomeExpense: [],
    yearlyIncomeExpense: [],
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await getStats(); // Fetch data from the API

      // Set state with the fetched data
      setData({
        totalAppointments: res.data.totalAppointments,
        pending: res.data.totalAppointmentsPending,
        approved: res.data.totalAppointmentsCompleted,
        rejected: res.data.totalAppointmentsRejected,
        completed: res.data.totalAppointmentsCompleted,
        discarded: res.data.totalAppointmentsDiscarded,
        total: res.data.totalusers,
        totalPercentage: res.data.totalusersincreasepercentagethismonth,
        new: res.data.newusers,
        newPercentage: res.data.newusersincreasepercentagethisweek,
        monthlyIncomeExpense: res.data.monthlyIncomeExpense, // Monthly income/expense data
        yearlyIncomeExpense: res.data.yearlyIncomeExpense, // Yearly income/expense data
      });

      const currentMonth = new Date().getMonth() + 1; // Get the current month (1-12)

      // Extract monthly income and expense from the monthlyIncomeExpense data
      const monthlyIncome =
        res.data.monthlyIncomeExpense.find(
          (item) =>
            item._id.month === currentMonth && item._id.type === "Income"
        )?.totalAmount || 0;

      const monthlyExpense =
        res.data.monthlyIncomeExpense.find(
          (item) =>
            item._id.month === currentMonth && item._id.type === "Expense"
        )?.totalAmount || 0;

      // Prepare the chart data
      const chartData = [
        ["Item", "Value"],
        ["Income", monthlyIncome],
        ["Expense", monthlyExpense],
      ];

      // Set the chart data in state
      setChartData(chartData);

      const monthsFullYear = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i).toLocaleString("default", { month: "short" }),
        income: 0,
        expense: 0,
      }));

      // Map existing data to months
      res.data.yearlyIncomeExpense.forEach((item) => {
        const monthIndex = item._id.month - 1; // Adjust for 0-based index
        const monthName = new Date(0, monthIndex).toLocaleString("default", {
          month: "long",
        });
        if (item._id.type === "Income") {
          monthsFullYear[monthIndex].income = item.totalAmount;
        } else if (item._id.type === "Expense") {
          monthsFullYear[monthIndex].expense = item.totalAmount;
        }
      });

      // Prepare data for the bar chart
      const barChartData = [
        ["Month", "Income", "Expense"],
        ...monthsFullYear.map((month) => [
          month.month,
          month.income,
          month.expense,
        ]),
      ];

      // Set the bar chart data in state
      setBarChartData(barChartData);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false); // Ensure loading state is set to false in both success and error cases
    }
  };

  // Chart options
  const options = {
    is3D: true,
    slices: {
      0: { offset: 0.1 }, // Offset income slice
      1: { offset: 0.1 }, // Offset expense slice
    },
    chartArea: {
      width: "100%",
      height: "100%",
    },
    colors: ["#3b82f6", "#dc2626"],
  };

  return (
    <div className="h-full md:h-[70vh]">
      <Loader isLoading={loading} />
      <div className="flex flex-col md:flex-row h-full ">
        {/* Appointments */}
        <div className="flex flex-col items-center w-full md:w-2/5 md:m-2 elevationlight rounded-2xl">
          <h1 className="text-blue-500 mt-4 md:mt-6  text-xl  md:text-2xl">
            APPOINTMENT INSIGHTS
          </h1>
          <div className="flex flex-col items-center w-full h-full justify-start">
            {/* first row */}
            <div className="flex flex-col  md:flex-row justify-center w-full p-3 md:my-4">
              {/* Total */}
              <div
                className="relative w-full md:w-1/2 md:m-2 border border-blue-500 transform-all duration-500 hover:scale-105 overflow-hidden group rounded-xl p-2 cursor-pointer"
                onClick={() => changeTab("tab2")}
              >
                <span className="absolute top-0 left-0 h-full z-0 bg-blue-500 w-2 group-hover:w-full tranform-all duration-500"></span>
                <div className="text-stone-900 group-hover:text-stone-200 tranform-all duration-500">
                  <h1 className="relative z-10 pointer-events-none my-2 mx-4 text-xl ">
                    <SnippetsOutlined /> TOTAL
                  </h1>
                  <p className="relative z-10 pointer-events-none mx-2 mb-2 mt-2 md:mt-8 text-xl text-right">
                    {data.totalAppointments ? data.totalAppointments : "N/A"}
                  </p>
                </div>
              </div>
              {/* Pending */}
              <div
                className="relative w-full md:w-1/2 md:m-2 border border-fuchsia-500 transform-all duration-500 hover:scale-105 overflow-hidden group rounded-xl p-2 mt-2 cursor-pointer"
                onClick={() => changeTab("tab2")}
              >
                <span className="absolute top-0 left-0 h-full z-0 bg-fuchsia-500 w-2 group-hover:w-full tranform-all duration-500"></span>
                <div className="text-stone-900 group-hover:text-stone-200 tranform-all duration-500">
                  <h1 className="relative z-10 pointer-events-none my-2 mx-4 text-xl ">
                    <ClockCircleOutlined /> PENDING
                  </h1>
                  <p className="relative z-10 pointer-events-none mx-2 mb-2 mt-2 md:mt-8 text-xl text-right">
                    {data.pending ? data.pending : "N/A"}
                  </p>
                </div>
              </div>
            </div>
            {/* second row */}
            <div className="flex flex-col  md:flex-row justify-center w-full p-3 md:mb-4">
              {/* Approved */}
              <div
                className="relative w-full md:w-1/2 md:m-2 border border-green-500 transform-all duration-500 hover:scale-105 overflow-hidden group rounded-xl p-2 cursor-pointer"
                onClick={() => changeTab("tab2")}
              >
                <span className="absolute top-0 left-0 h-full z-0 bg-green-500 w-2 group-hover:w-full tranform-all duration-500"></span>
                <div className="text-stone-900 group-hover:text-stone-200 tranform-all duration-500">
                  <h1 className="relative z-10 pointer-events-none my-2 mx-4 text-xl ">
                    <CheckOutlined /> APPROVED
                  </h1>
                  <p className="relative z-10 pointer-events-none mx-2 mb-2 mt-2 md:mt-8 text-xl text-right">
                    {data.approved ? data.approved : "N/A"}
                  </p>
                </div>
              </div>

              {/* Rejected */}
              <div
                className="relative w-full md:w-1/2 md:m-2 border border-red-500 transform-all duration-500 hover:scale-105 overflow-hidden group rounded-xl p-2 mt-2 cursor-pointer"
                onClick={() => changeTab("tab2")}
              >
                <span className="absolute top-0 left-0 h-full z-0 bg-red-500 w-2 group-hover:w-full tranform-all duration-500"></span>
                <div className="text-stone-900 group-hover:text-stone-200 tranform-all duration-500">
                  <h1 className="relative z-10 pointer-events-none my-2 mx-4 text-xl ">
                    <StopOutlined /> REJECTED
                  </h1>
                  <p className="relative z-10 pointer-events-none mx-2 mb-2 mt-2 md:mt-8 text-xl text-right">
                    {data.rejected ? data.rejected : "N/A"}
                  </p>
                </div>
              </div>
            </div>
            {/* third row */}
            <div className="flex flex-col  md:flex-row justify-center w-full p-3 md:mb-4">
              {/* Completed */}
              <div
                className="relative w-full md:w-1/2 md:m-2 border border-emerald-700 transform-all duration-500 hover:scale-105 overflow-hidden group rounded-xl p-2 mt-2 cursor-pointer"
                onClick={() => changeTab("tab2")}
              >
                <span className="absolute top-0 left-0 h-full z-0 bg-emerald-700 w-2 group-hover:w-full tranform-all duration-500"></span>
                <div className="text-stone-900 group-hover:text-stone-200 tranform-all duration-500">
                  <h1 className="relative z-10 pointer-events-none my-2 mx-4 text-xl ">
                    <CarryOutOutlined /> COMPLETED
                  </h1>
                  <p className="relative z-10 pointer-events-none mx-2 mb-2 mt-2 md:mt-8 text-xl text-right">
                    {data.completed ? data.completed : "N/A"}
                  </p>
                </div>
              </div>
              {/* Discarded */}
              <div
                className="relative w-full md:w-1/2 md:m-2 border border-gray-500 transform-all duration-500 hover:scale-105 overflow-hidden group rounded-xl p-2 mt-2 cursor-pointer"
                onClick={() => changeTab("tab2")}
              >
                <span className="absolute top-0 left-0 h-full z-0 bg-gray-500 w-2 group-hover:w-full tranform-all duration-500"></span>
                <div className="text-stone-900 group-hover:text-stone-200 tranform-all duration-500">
                  <h1 className="relative z-10 pointer-events-none my-2 mx-4 text-xl ">
                    <DeleteOutlined /> DISCARDED
                  </h1>
                  <p className="relative z-10 pointer-events-none mx-2 mb-2 mt-2 md:mt-8 text-xl text-right">
                    {data.discarded ? data.discarded : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-3/5 mt-4 md:m-2">
          {/* Finances */}
          <div className="h-2/3 mb-2 elevationlight rounded-2xl">
            <h1 className="text-blue-500 mx-4 mt-4 md:mx-6 md:mt-6 text-xl md:text-2xl ">
              FINANCIAL OVERVIEW
            </h1>
            <div className="flex flex-col md:flex-row w-full p-2">
              <div className="w-full md:w-2/5 flex flex-col justify-center items-center overflow-hidden">
                <h1 className="text-lg text-left p-4 mb-4 w-full">
                  Monthly Income/Expense
                </h1>
                <Chart
                  chartType="PieChart"
                  data={chartData}
                  options={options}
                  legendToggle
                  className=" md:w-full "
                />
              </div>
              <div className="w-full md:w-3/5 flex flex-col justify-center items-center">
                <h1 className="text-lg text-left p-4 mb-4 w-full overflow-x-auto">
                  Yearly Income and Expense
                </h1>
                <Chart
                  chartType="Bar"
                  width={"100%"}
                  data={barChartData}
                  options={{
                    title: "Yearly Income and Expense",
                    hAxis: { title: "Amount", minValue: 0 },
                    vAxis: { title: "Month" },
                    legend: { position: "top", alignment: "center" },
                    colors: ["#3b82f6", "#dc2626"],
                  }}
                />
              </div>
            </div>
          </div>
          {/* user statistics */}
          <div className="h-1/3 mt-2 elevationlight rounded-2xl">
            <h1 className="text-blue-500 m-4 md:m-6 md:mb-0 text-xl md:text-2xl">
              USER STATISTICS
            </h1>
            <div className="flex flex-col lg:flex-row w-full p-2">
              <div className="w-full lg:w-1/2 md:px-4 flex flex-col md:flex-row justify-start md:justify-around items-center">
                <div>
                  <h1 className="text-lg">
                    Registered Users
                    <span className="btext text-xs ml-1 font-semibold">
                      (All Time)
                    </span>
                  </h1>
                  <p className="mt-1 text-3xl">{data.total ? data.total : 0}</p>
                  <p
                    className={`mt-1 text-xs rounded-lg ${
                      data.totalPercentage > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }  font-bold`}
                  >
                    {data.totalPercentage >= 0 && <PlusOutlined />}
                    {data.totalPercentage ? data.totalPercentage : 0}
                    <PercentageOutlined />
                  </p>
                  <span className="btext text-xs">Monthly Increase</span>
                </div>
                <div>
                  <Image
                    src="/images/stat1.png"
                    alt="user"
                    width={220}
                    height={80}
                    preview={false}
                  />
                </div>
              </div>
              <div className="border border-gray-300 my-3 md:mx-3 md:my-0 rounded-lg"></div>
              <div className="w-full lg:w-1/2 md:px-4 flex flex-col md:flex-row justify-start md:justify-around items-center">
                <div>
                  <h1 className="text-lg">
                    New Users
                    <span className="btext text-xs ml-1 font-semibold">
                      (This week)
                    </span>
                  </h1>
                  <p className="mt-1 text-3xl">{data.new ? data.new : 0}</p>
                  <p
                    className={`mt-1 text-xs rounded-lg ${
                      data.newPercentage > 0 ? "text-green-500" : "text-red-500"
                    }  font-bold`}
                  >
                    {data.newPercentage >= 0 && <PlusOutlined />}
                    {data.newPercentage ? data.newPercentage : 0}
                    <PercentageOutlined />
                  </p>
                  <span className="btext text-xs">Weekly Increase</span>
                </div>
                <div>
                  <Image
                    src="/images/stat2.png"
                    alt="user"
                    width={220}
                    height={80}
                    preview={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
