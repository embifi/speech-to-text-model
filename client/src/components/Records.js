import "../App.css";
import React, { useState, useEffect } from "react";
import AudioUploader from "./audioUploader";
import axios from "axios";
import "../components/loader.js";

function Record() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFilename] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [file, setFile] = useState({});
  const [transcribedData, setTranscribedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transcriptType, setTranscriptType] = useState("");
  const [error, setError] = useState(null);
  // Event handler for input change
  const handleNameChange = (event) => {
    setName(event.target.value); // Update the name state with the input value
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTranscriptTypeChange = (event) => {
    setTranscriptType(event.target.value);
  };

  const handleFileUpload = (fileName, base64Data) => {
    setSelectedFile(base64Data);
    setFilename(fileName);
  };

  const onTranscript = async () => {
    const extractBase = selectedFile.split("base64,");
    const base = extractBase[1];
    // console.log("i a bs\ase");
    // https://speech-to-text-modal-backend-k6ex.onrender.com/api/transcript
    try {
      const response = await axios("http://localhost:7000/api/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // This indicates that you're sending JSON data
          //"Content-Type":"multipart/form-data",
        },

        data: { name, description, base, transcriptType },
      });

      setTranscribedData([
        response.data.transcriptByGoogle_V1,
        response.data.transcriptByGoogle_V2,
        response.data.transcriptByChirp,
        response.data.transcriptByWhisper,
      ]);
      setError(null);
    } catch (error) {
      console.error("Error creating transcript:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranscript = () => {
    if (typeof onTranscript === "function" && selectedFile) {
      setIsLoading(true);
      setError(null);
      setTranscribedData([])
      onTranscript(name, description, selectedFile, transcriptType);
    } else {
      alert('Please select a file before transcribing.')
      console.error("onTranscript is not a function");
    }
  };

  console.log(transcribedData);

  return (
    <div>
      <form className="form">
        <label>
          Name : 
          <input type="text" placeholder="Enter your name" value={name} onChange={handleNameChange} required/>
        </label>
        <label>
          Description : 
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
        {/* <label>
          Transcript Type:
          <input
            type="text"
            value={transcriptType}
            required
            
            onChange={handleTranscriptTypeChange}
          />
        </label> */}
       <label> Transcript Type :<select
                value={transcriptType}
                
                onChange={handleTranscriptTypeChange}
                required
              >
                
                <option value="number">Number</option>
                <option value="Address">Address</option>
                <option value="bank">Bank</option>
                <option value="other">other</option>
                
              </select>
              </label>
      </form>

      <div>
        <h3>Upload audio file below</h3>
        <AudioUploader  required onFileUpload={handleFileUpload} />

        <button className="transcript-button" onClick={handleTranscript}>
          Transcript
        </button>

        <div className="loader-con">
          {isLoading ? (
            <>
              <div className="loader"></div>
              <p style={{
                color:"saddlebrown",
                fontSize:20
              }}>Loading...</p>
            </>
          ) : (
            <>
              {error && <div className="transcript">{error.message}</div>}
              
            
              {transcribedData.map((transcript, index) => (
                <div className="transcript" key={index}>
                  {transcript && index === 0 && (
                    <p>Transcript By Google_V1: {transcript}</p>
                  )}

                  {transcript && index === 1 && (
                    <p>Transcript By Google_V2: {transcript}</p>
                  )}
                  {transcript && index === 2 && (
                    <p>Transcript By Chirp: {transcript}</p>
                  )}
                  {transcript && index === 3 && (
                    <p>Transcript By Whisper: {transcript}</p>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Record;
