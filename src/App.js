import React, { useState, useEffect } from 'react';
import './App.css';
import MultiStepForm from './components/MultiStepForm';
import {SimpleForm} from "./components/SimpleForm";
import {MediumForm} from "./components/MediumForm";


function App() {
  // window.formName = 'multi-step'; // Change this to 'medium' or 'simple' to test other forms
  // Initialize state with the current window.formName value
  const [formName, setFormName] = useState(window.formName || 'multi-step');

  // Update state if window.formName changes outside React
  useEffect(() => {
    const handleFormNameChange = () => {
      setFormName(window.formName);
    };

    // Check for changes periodically (or use other methods if available)
    const interval = setInterval(handleFormNameChange, 1000);

    return () => clearInterval(interval);
  }, []);
  const identifyForm = () => {
    switch (formName) {
      case 'multi-step':
        return <MultiStepForm />;
      case 'medium':
        return <MediumForm />;
      case 'simple':
        return <SimpleForm />;
      default:
        return null;
    }
  };
  return (
    <div className="App">
      {identifyForm()}
    </div>
  );
}

export default App;
