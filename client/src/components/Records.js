import "../App.css";
import React, { useState, useEffect } from "react";
import AudioUploader from "./audioUploader";
import axios from "axios";
import "../components/loader.js"



function Record() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFilename] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [file, setFile]=  useState({});
  const [transcribedData, setTranscribedData] = useState("");
  const [isLoading, setIsLoading]= useState(false);

  // Event handler for input change
  const handleNameChange = (event) => {
    setName(event.target.value); // Update the name state with the input value
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleFileUpload = (fileName, base64Data) => {
   
    setSelectedFile(base64Data);
    setFilename(fileName);
  };

  const onTranscript = async () => {
 
    const extractBase = selectedFile.split("base64,");
    const base = extractBase[1];
    // console.log("i a bs\ase");
    try {
      const response=await axios("https://speech-to-text-modal-backend-k6ex.onrender.com/api/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // This indicates that you're sending JSON data
         //"Content-Type":"multipart/form-data",
        },

        data: { name, description,base},
      });
      setTranscribedData(response.data.transcript);
    } catch (error) { 
      console.error("Error creating transcript:", error);
    }
    finally{
      setIsLoading(false);
    }
  };

  const handleTranscript = () => {
    
    if (typeof onTranscript === "function") {
      setIsLoading(true);
   
      onTranscript(name, description,selectedFile);
    } else {
      console.error("onTranscript is not a function");
    }
  };



  return (
    <div>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
      </form>

      <div>
        <h3>Upload audio file below</h3>
        <AudioUploader onFileUpload={handleFileUpload} />
        
        
        <button onClick={handleTranscript}>Transcript</button>
        
        <div className="loader-con">
        {isLoading ? (<div className="loader">Loading...</div> )
        : (
         <>   
         {transcribedData && (
          <div className="transcript">
            <h3>Transcribed Data:</h3>
            <h5>Note:-Current version supports only this languageCode: "en-in"</h5>
           <p>{transcribedData}</p>
          </div>
        )}
        </>
        )}
        </div>
      </div>
    </div>
  );
}
export default Record;
