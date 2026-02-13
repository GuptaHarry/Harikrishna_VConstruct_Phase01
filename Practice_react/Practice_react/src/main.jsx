import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainPage from './MainPage';
import {ErrorBoundary} from "react-error-boundary";
import { Suspense , } from 'react'
createRoot(document.getElementById('root')).render(
  <>

 <StrictMode> 
   <MainPage/>
 
 </StrictMode> 

  </>
)
