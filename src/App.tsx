import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './App.css';
import Logo from './components/Logo';
import StudioSearchBlock from './components/StudioSearchBlock';
import StaffSearchBlock from './components/StaffSearchBlock';

function App() {
  return (
    <div className="flex w-full flex-col content-center items-center">
      <Logo />
      <div>Subscribe to an RSS feed of your favorite anime studios, staff, and voice actors</div>
      <StudioSearchBlock />
      <StaffSearchBlock />
      <div>Voice Actors</div>
      <ToastContainer transition={Slide} />
    </div>
  );
}

export default App;
