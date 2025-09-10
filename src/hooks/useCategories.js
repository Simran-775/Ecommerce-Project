import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useCategories(){
    const [catdata, setcatdata] = useState([])
    const fetchcategory = async () => {
    try {
      const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getallcat`);
      if (apiresp.data.success === 1) {
        setcatdata(apiresp.data.cdata)
      } else if (apiresp.data.success === 0) {
        setcatdata([]);
        toast.info("No categories found");
      } else {
        toast.error("Some error occured, try again");
      }
    } catch (e) {
      toast.error("Error Occured " + e.message);
    }
  };

  useEffect(() => {
    fetchcategory();
  }, []);

  return { catdata, setcatdata, fetchcategory}
}