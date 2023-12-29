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



  const handleDownload = async (filename, code, id) => {
    const entered_code = prompt(`Enter six digit code to download`);
    if (entered_code != null && entered_code == code) {
      const response = await axios.get(
        `http://localhost:5000/uploadfiles/download/${id}?code=${code}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("File downloaded successfully");
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
    <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md g">
      <div className="p-4 mb-4">
        <h1 className="text-2xl font-bold mb-2">{filename}</h1>
        <h1 className="text-lg text-gray-600 mb-4">code:- {code}</h1>
        <div className="flex space-x-4 justify-center">
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
