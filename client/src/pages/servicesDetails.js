import React, { useState } from "react";
import { Card, Image } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import Button from "../components/button";

const tabList = [
  {
    key: "tab1",
    tab: (
      <p className="btext font-semibold text-lg md:text-2xl py-2">Body Work</p>
    ),
  },
  {
    key: "tab2",
    tab: (
      <p className="btext font-semibold text-lg md:text-2xl py-2">
        Air Conditioning
      </p>
    ),
  },
  {
    key: "tab3",
    tab: (
      <p className="btext font-semibold text-lg md:text-2xl py-2">
        Electrical Work
      </p>
    ),
  },
  {
    key: "tab4",
    tab: (
      <p className="btext font-semibold text-lg md:text-2xl py-2">
        Alloy Repairing
      </p>
    ),
  },
  {
    key: "tab5",
    tab: (
      <p className="btext font-semibold text-lg md:text-2xl c">
        Mechanical Work
      </p>
    ),
  },
];
const contentList = {
  tab1: (
    <div className="flex flex-col lg:flex-row bg-blue-500 text-stone-200 btext">
      <div className="m-5">
        <Image
          width={"auto"}
          src="../images/services1.png"
          alt="bdw"
          preview={false}
        />
      </div>
      <div className="m-5 flex flex-col w-full text-left">
        <h1 className="htext text-3xl md:text-4xl m-2">Body Work</h1>
        <div className="flex flex-col md:flex-row ">
          <div className="m-2 flex flex-col space-y-4 mx-4">
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Denting
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Painting
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Bumper Adjustments
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Aligning Panels
            </p>
          </div>
          <div className="m-2 flex flex-col space-y-4 mx-4">
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Polishing
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Straightening bent frames
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Replace or repair damaged parts
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Sand surface to remove rust
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Image
          width={"auto"}
          src="../images/gears.png"
          alt="bdw"
          preview={false}
        />
      </div>
    </div>
  ),
  tab2: (
    <div className="flex flex-col lg:flex-row bg-blue-500 text-stone-200 btext">
      <div className="m-5">
        <Image
          width={"auto"}
          src="../images/services2.png"
          alt="bdw"
          preview={false}
        />
      </div>
      <div className="m-5 flex flex-col w-full text-left">
        <h1 className="htext text-3xl md:text-4xl m-2">Air Conditioning</h1>
        <div className="flex flex-col md:flex-row ">
          <div className="m-2 flex flex-col space-y-4 mx-4">
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Repair Leaks
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Replace compressor
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Replace condensor
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Clean Evaporator
            </p>
          </div>
          <div className="m-2 flex flex-col space-y-4 mx-4">
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Flush AC System
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Replace cabin filter
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Replace or repair control panel
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Image
          width={"auto"}
          src="../images/gears.png"
          alt="bdw"
          preview={false}
        />
      </div>
    </div>
  ),
  tab3: (
    <div className="flex flex-col xl:flex-row bg-blue-500 text-stone-200 btext">
      <div className="m-5">
        <Image
          width={"auto"}
          src="../images/services5.png"
          alt="bdw"
          preview={false}
        />
      </div>
      <div className="m-5 flex flex-col w-full text-left">
        <h1 className="htext text-3xl md:text-4xl m-2">Electrical Work</h1>
        <div className="flex flex-col md:flex-row ">
          <div className="m-2 flex flex-col space-y-4 mx-4">
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Hybrid Battery
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Charging System
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Code Scanning
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined />
              Wiring Harness
            </p>
          </div>
          <div className="m-2 flex flex-col space-y-4 mx-4">
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Battery Replacement
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Headlight Replacement
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Bulb Replacement
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Sensor Replacement
            </p>
          </div>
          <div className="m-2 flex flex-col space-y-4 mx-4">
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> ECU Replacement
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Navigation System
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined />
              Audio System
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> ABS repair
            </p>
          </div>
          <div className="m-2 flex flex-col space-y-4 mx-4">
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Alarm Repair
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Airbag Repair
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Power Window Repair
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Power Mirror Repair
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Image
          width={"auto"}
          src="../images/gears.png"
          alt="bdw"
          preview={false}
        />
      </div>
    </div>
  ),
  tab4: (
    <div className="flex flex-col lg:flex-row bg-blue-500 text-stone-200 btext">
      <div className="m-5">
        <Image
          width={"auto"}
          src="../images/services4.png"
          alt="bdw"
          preview={false}
        />
      </div>
      <div className="m-5 flex flex-col w-full text-left">
        <h1 className="htext text-3xl md:text-4xl m-2">Alloy Repairing</h1>
        <div className="flex flex-col md:flex-row ">
          <div className="m-2 flex flex-col space-y-4 mx-4">
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Repair a totaled car
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Weld any body parts that may be broken
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Image
          width={"auto"}
          src="../images/gears.png"
          alt="bdw"
          preview={false}
        />
      </div>
    </div>
  ),
  tab5: (
    <div className="flex flex-col xl:flex-row bg-blue-500 text-stone-200 btext">
      <div className="m-5">
        <Image
          width={"auto"}
          src="../images/services3.png"
          alt="bdw"
          preview={false}
        />
      </div>
      <div className="m-5 flex flex-col w-full text-left">
        <h1 className="htext text-3xl md:text-4xl m-2">Mechanical Work</h1>
        <div className="flex flex-col md:flex-row ">
          <div className="m-2 flex flex-col space-y-4 mx-4">
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Oil Change
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Tune up
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Engine Repair
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined />
              Timing Belt
            </p>
          </div>
          <div className="m-2 flex flex-col space-y-4 mx-4">
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Shock Absorber
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Fluid Replacement
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Radiator Flush
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Differential Service
            </p>
          </div>
          <div className="m-2 flex flex-col space-y-4 mx-4">
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Brake Fluid
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Muffler
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined />
              Thermostat
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Fuel Injector Cleaning
            </p>
          </div>
          <div className="m-2 flex flex-col space-y-4 mx-4">
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Fuel Pump
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Catalytic Converter
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Ball Joint
            </p>
            <p className="text-xl md:text-2xl">
              <RightCircleOutlined /> Brake Pad and Rotor
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Image
          width={"auto"}
          src="../images/gears.png"
          alt="bdw"
          preview={false}
        />
      </div>
    </div>
  ),
};

const ServicesDetails = () => {
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  return (
    <div className="">
      <Card
        style={{
          width: "100%",
        }}
        title={
          <p className="text-center text-thin htext text-2xl md:text-4xl text-blue-500  md:my-5">
            Services
          </p>
        }
        extra={() => null}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
        bordered={false}
        className="bg-neutral-50 text-center htext"
      >
        {contentList[activeTabKey1]}
      </Card>

      <div className=" border-2 border-blue-500 p-10 rounded-lg ml-10 mr-10 my-10">
        <h1 className="md:text-3xl btext md:pl-8">
          Want to book appointment here at{" "}
          <span className="htext text-blue-500">Capital Autos?</span>
        </h1>
        <p className=" text-right mt-4 mr-8">
          <Button
            text="Book Appointment"
            style="htext text-sm md:text-xl px-4 md:px-6 py-2 rounded-md"
          />
        </p>
      </div>
    </div>
  );
};

export default ServicesDetails;
