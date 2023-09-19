import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Records from './components/Records';



function App() {
  const handleTranscript = ({ name, description,file }) => {
    // Send the data to your backend for saving and processing
    // Include the data (name, description, audioData, and filename) in the request body.
    // You can use fetch or Axios to make a POST request to your server.
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    // formData.append('selectedFile', selectedFile);
    formData.append('file', file);

    };
  return (
    <div className="App">

<h1>Speech To text Model</h1>
<Router>
<Routes>
<Route path ="/home" element={<Records />}/>
</Routes>
</Router>
     

    </div>
  );
  
}


export default App;
