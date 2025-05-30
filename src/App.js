import React from 'react';
import './App.css';
import MultiStepForm from './components/MultiStepForm';
import {SimpleForm} from "./components/SimpleForm";
import {MediumForm} from "./components/MediumForm";


function App() {
  window.formName = 'multi-step'; // Change this to 'medium' or 'simple' to test other forms
  const identifyForm = () => {
    const formType = window.formName;
    switch (formType) {
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
