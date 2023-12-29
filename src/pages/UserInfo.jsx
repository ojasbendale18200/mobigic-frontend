import React, { useEffect, useState } from "react";
import UploadFiles from "../component/UploadFiles";
import Upload from "../component/Upload";
import axios from "axios";

const UserInfo = () => {
  const [sharedState, setSharedState] = useState([]);
  const [uploads, setUploads] = useState([]);

  const handleState = (val) => {
    setSharedState(val);
  };

  const getData = () => {
    axios
      .get(`https://mobigic-1p0g.onrender.com/uploadfiles/`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data["userUploadedFiles"]);
        setUploads(res.data["userUploadedFiles"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [sharedState]);
  return (
    <div className="flex justify-center gap-10" >
      <UploadFiles
        sharedState={sharedState}
        handleState={handleState}
        uploads={uploads}
      />
      <Upload
        sharedState={sharedState}
        handleState={handleState}
        getData={getData}
      />
    </div>
  );
};

export default UserInfo;
