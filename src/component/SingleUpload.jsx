import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const SingleUpload = ({
  _id,
  filename,
  code,
  user,
  sharedState,
  handleState,
}) => {
  const [downloadUrl, setDownloadUrl] = useState("");
  let downloadInProgress = false;
  const navigate = useNavigate();

  const handleDownload = async (filename, code, id) => {
    if (downloadInProgress) {
      return;
    }
    const entered_code = prompt(`Enter six digit code to download`);
    console.log(entered_code, code);
    if (entered_code != null && entered_code == code) {
      downloadInProgress = true;

      axios
        .get(`http://localhost:5000/uploadfiles/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          const url = res.data["userUploadedFiles"].cloudinaryurl;
          console.log(url);
          window.open(url, "_blank");
          setDownloadUrl(url);
        })
        .catch((err) => {
          console.log(err);
        });

      downloadInProgress = false;
    } else {
      alert(`Enterd wrong code, please check and try again`);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/uploadfiles/delete/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        handleState(sharedState.filter((obj) => obj._id !== id));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">{filename}</h1>
        <h1 className="text-lg text-gray-600 mb-4">code:- {code}</h1>
        <div className="flex space-x-4">
          <button
            id="loadid"
            onClick={() => handleDownload(filename, code, _id)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-blue"
          >
            Download
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-red"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleUpload;
