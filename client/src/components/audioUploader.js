import React, { useState } from "react";

function AudioUploader({ onFileUpload }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result; //// The result property contains the Base64 encoded file data
        onFileUpload(file.name, base64Data);
       // console.log(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file"  accept=".wav" onChange={handleFileChange} />
    </div>
  );
}

export default AudioUploader;
