import React from 'react';
import './App.css';
import MultiStepForm from './components/MultiStepForm';
import {SimpleForm} from "./components/SimpleForm";
import {MediumForm} from "./components/MediumForm";
import {useWindowVariable} from "./components/helpers/formWatcher";


function App() {
  const formName = useWindowVariable('formName', 'multi-step');
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
