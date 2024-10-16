import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkLoginStatus } from "../services/authService";
import { Button, Image, Input, message, Space, Spin, Tooltip } from "antd";
import { getChatbotResponse, getChatHistory } from "../services/chatService";
import { EnterOutlined, LoadingOutlined } from "@ant-design/icons";
import ScrollableFeed from "react-scrollable-feed";
import { ChatLoading } from "../components/chatLoading";

const Chatbot = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ischatLoading, setIsChatLoading] = useState(false);
  const navigate = useNavigate();
  const [chat, setChat] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    LoginStatus();
    fetchChatHistory();
  }, []);

  const LoginStatus = async () => {
    setIsLoading(true);
    try {
      const res = await checkLoginStatus();
      if (res.data.verified) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const fetchChatHistory = async () => {
    setIsChatLoading(true);
    try {
      const res = await getChatHistory();
      if (res.status === 200) {
        setChat(res.data);
      } else {
        toast.error("Error occurred while fetching chat history");
      }
      setIsChatLoading(false);
    } catch (error) {
      console.error(error);
      setIsChatLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    if (!userMessage) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);

      return;
    }

    setIsLoading(true);
    try {
      const USERMESSAGE = {
        message: userMessage,
        sender: "user",
        timestamp: new Date(),
        _id: Math.random().toString(36).substr(2, 9),
      };
      setChat((prevChat) => [...prevChat, USERMESSAGE]);
      setUserMessage("");
      const res = await getChatbotResponse(userMessage);
      if (res.status === 200) {
        setChat((prevChat) => [...prevChat, res.data.message]);
      } else {
        toast.error("Error occurred while sending message");
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const style = {
    backgroundImage: `url('/images/background.svg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
  };

  const getTimeString = (createdAt) => {
    const date = new Date(createdAt);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div style={style} className="h-[85vh] flex justify-center items-center">
      <div className="h-[82vh] w-[90%] md:w-[60%] bg-neutral-50/90 elevationlight rounded-t-2xl">
        <div className="flex justify-center items-center">
          <Image
            src="/images/logo.png"
            width={200}
            preview={false}
            className="mt-3 -ml-4"
          />
          <h1 className="htext -ml-14 md:-ml-10 text-xl md:text-3xl text-blue-500">
            CHATBOT
          </h1>
        </div>
        <div className=" h-[60vh] md:h-[65vh] md:my-5 mx-4 md:mx-20 ">
          {ischatLoading ? (
            <div className="flex justify-center items-center h-full">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />}
              />
            </div>
          ) : (
            <div className="">
              <div className="h-[55vh] md:h-[60vh] overflow-y-auto mb-3">
                {chat.length > 0 ? (
                  <ScrollableFeed forceScroll={true}>
                    {chat.map((message, index) => (
                      <div key={index}>
                        {(index === 0 ||
                          (chat[index - 1].timestamp &&
                            message.timestamp &&
                            formatDate(chat[index - 1].timestamp) !==
                              formatDate(message.timestamp))) && (
                          <div className=" text-center text-blue-500 btext font-semibold  text-lg border-b mr-[20%] ml-[20%] border-neutral-400 my-5">
                            {formatDate(message.timestamp)}
                          </div>
                        )}
                        <div
                          className={`${
                            message.sender === "user"
                              ? "flex justify-end"
                              : "flex justify-start"
                          } mr-1 md:mr-4 btext font-semibold`}
                        >
                          <div
                            className={`${
                              message.sender === "user"
                                ? "bg-neutral-400 text-stone-200"
                                : "bg-blue-500 text-stone-200"
                            } rounded-lg px-3 py-2 m-2  min-w-36 max-w-[80%]`}
                          >
                            {message.message}
                            <p
                              className={`${
                                message.sender === "user"
                                  ? "text-right"
                                  : "text-left"
                              } content-end pt-2 text-xs text-gray-900`}
                            >
                              {getTimeString(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div
                        className="flex justify-start
                        mr-1 md:mr-4 btext font-semibold"
                      >
                        <div className="rounded-lg px-3 py-2 m-2  min-w-48 min-h-48">
                          <ChatLoading />
                        </div>
                      </div>
                    )}
                  </ScrollableFeed>
                ) : (
                  <div className="mt-5 md:mt-20 mx-2 md:mx-10 flex flex-col shadow-md md:shadow-2xl p-4 md:p-20 rounded-lg">
                    <h1 className="htext text-blue-500 text-2xl">
                      Welcome to the Auto AI Chatbot!
                    </h1>
                    <p className="flex btext text-neutral-400 text-lg mt-10 font-semibold">
                      Hello! I’m here to assist you with any automobile-related
                      inquiries you may have. Whether you need guidance on
                      maintenance, troubleshooting, or general car advice, I’m
                      ready to help.
                    </p>
                    <p className="flex btext text-neutral-400 text-lg mt-5 font-semibold">
                      How can I assist you today?
                    </p>
                  </div>
                )}
              </div>
              <Space.Compact className="w-full">
                <Input
                  placeholder="Enter Your Query Here"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(e);
                    }
                  }}
                  className={` rounded-lg h-12 btext font-semibold text-lg ${
                    showError ? "border-red-500" : ""
                  } `}
                />
                <Tooltip title="Send">
                  <Button type="primary" className="h-12 text-lg">
                    <EnterOutlined
                      className="text-stone-200 mx-10"
                      onClick={(e) => {
                        handleSendMessage(e);
                      }}
                    />
                  </Button>
                </Tooltip>
              </Space.Compact>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
