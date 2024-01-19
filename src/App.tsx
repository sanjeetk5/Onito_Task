import React from 'react';
import logo from './logo.svg';
import './App.css';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import MultiStepForm from './MultiStepForm';
import MainRoutes from './MainRoutes';
// import MainRoutes from './MainRoutes';

function App() {
  return (
    <div className="App">
  {/* <MainRoutes/> */}
  {/* <Step1Form onNext={function (): void {
        throw new Error('Function not implemented.');
      } }/>
  <Step2Form onSubmit={function (data: { address?: string | undefined; state?: string | undefined; city?: string | undefined; country?: string | undefined; pincode?: string | undefined; }): void {
        throw new Error('Function not implemented.');
      } }/> */}

      <MainRoutes/>
    </div>
  );
}

export default App;
