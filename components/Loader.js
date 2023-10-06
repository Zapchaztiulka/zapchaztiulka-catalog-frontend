import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className=" h-full block mx-auto">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#1849A9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: "center" }}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
