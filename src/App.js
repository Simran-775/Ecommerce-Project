import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter} from 'react-router-dom';
import SiteRoutes from "./components/SiteRoutes";
import {ToastContainer} from "react-toastify"
function App() {
  return (
    <div className="App pageWrapper">
      <BrowserRouter>
      <Header/>
      <SiteRoutes/>
      <ToastContainer/>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
