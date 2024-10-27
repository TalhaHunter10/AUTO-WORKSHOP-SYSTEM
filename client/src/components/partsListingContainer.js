import React from "react";
import moment from "moment";

const getTimeSinceCreation = (createdAt) => {
  return moment(createdAt).format("DD MMM, YYYY");
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const shortenTitle = (title, maxLength) => {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + " ...";
  }
  return title;
};

const formatPriceWithCommas = (price) => {
  return price.toLocaleString();
};

const arrayBufferToBase64 = (buffer) => {
  const binary = new Uint8Array(buffer).reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  return `data:image/png;base64,${window.btoa(binary)}`;
};

const PartsListingContainer = ({ Part }) => {
  return (
    <div className="pl-2 pr-2 mt-1 pb-10 pt-5 flex flex-wrap justify-center md:justify-start mt-5">
      {Part.map((item) => (
        <div
          key={item._id}
          className="w-80 transform overflow-hidden rounded-lg bg-neutral-500 text-stone-200 m-4 md:mx-12 md:my-8 elevationlight"
        >
          <img
            className="h-48 w-full object-cover object-center md:h-48 bg-stone-200"
            src={arrayBufferToBase64(item.image.data)}
            alt="Item"
          />
          <div className="p-4">
            <p className="mr-2 text-base text-right htext">
              <span className="text-blue-400 tracking-widest font-semibold btext">
                Rs.{" "}
              </span>
              {formatPriceWithCommas(parseInt(item.price))}
            </p>
            <h2 className="container-title mb-2 text-xl htext">
              {capitalizeFirstLetter(shortenTitle(item.partName, 20))}
            </h2>
            <div className="elevationlight rounded-lg p-3">
              <p className=" text-medium">
                <span className="text-blue-400 htext">Company</span> :{" "}
                <span className="font-semibold btext ml-6 text-sm">
                  {item.partCompany}
                </span>
              </p>
              <p className="text-medium">
                <span className="text-blue-400 htext">Quantity</span> :{" "}
                <span className="font-semibold btext ml-8 text-sm">
                  {item.quantity}
                </span>
              </p>
              <p className="mb-3 text-medium ">
                <span className="text-blue-400 htext">Description</span> :
                <span className="font-semibold btext ml-3 text-sm">
                  {shortenTitle(item.description, 80)}
                </span>
              </p>
            </div>
            <div className="text-right content-end h-full">
              <div className="mt-3 text-xs font-semibold btext h-full">
                <p>{getTimeSinceCreation(item.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartsListingContainer;
