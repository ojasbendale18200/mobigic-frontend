import React, { useEffect, useState } from "react";
import SingleUpload from "./SingleUpload";
import axios from "axios";

const UploadFiles = ({ sharedState, handleState, uploads }) => {
  return (
    <div>
      {uploads?.map((el) => (
        <SingleUpload
          key={el._id}
          {...el}
          sharedState={sharedState}
          handleState={handleState}
        />
      ))}
    </div>
  );
};

export default UploadFiles;
