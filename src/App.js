import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter} from 'react-router-dom';
import SiteRoutes from "./components/SiteRoutes";
import {ToastContainer} from "react-toastify"
import { createContext, useEffect, useState } from "react";
import AdminHeader from "./components/AdminHeader";
const datacontext = createContext();
function App() {
  const [udata,setudata] = useState(null);
  useEffect(()=>{
    if(sessionStorage.getItem("uinfo")!==null){
      setudata(JSON.parse(sessionStorage.getItem("uinfo")))
    }
  },[])
   return (
    <div className="App pageWrapper">
      <BrowserRouter>
      <ToastContainer/>
      <datacontext.Provider value={{udata,setudata}}>
           {
          udata===null?
          <Header/>
          :udata.usertype==="admin"?<AdminHeader/>:<Header/>
        }
           <SiteRoutes />
           <Footer />
      </datacontext.Provider>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
export {datacontext};