import axios from "axios";
import React, { useState } from "react";

const Upload = ({ sharedState, handleState }) => {
  const [file, setFile] = useState();

  const handleUpload = () => {
    if (!file) {
      alert("Please choose a file");
    } else {
      const payload = new FormData();
      payload.append("filename", file);
      console.log(payload);

      axios
        .post(`http://localhost:5000/uploadfiles/upload`, payload, {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          handleState([...sharedState, res.data]);
          alert("Uploaded Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <input
        type="file"
        name="filename"
        id="fileInput"
        accept=".txt, .pdf, .png, .jpg, .jpeg"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
