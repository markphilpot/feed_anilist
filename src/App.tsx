import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './App.css';
import Logo from './components/Logo';
import StudioSearchBlock from './components/StudioSearchBlock';
import StaffSearchBlock from './components/StaffSearchBlock';
import VaSearchBlock from './components/VaSearchBlock';

function App() {
  return (
    <div className="flex h-full w-full flex-col content-center items-center">
      <div className={'flex flex-col items-center p-6'}>
        <Logo className={''} />
        <p className={'text-sm text-slate-800'}>
          Subscribe to an RSS feed of your favorite anime studios, staff, and voice actors
        </p>
      </div>
      <StudioSearchBlock />
      <StaffSearchBlock />
      <VaSearchBlock />
      <ToastContainer transition={Slide} />
    </div>
  );
}

export default App;
