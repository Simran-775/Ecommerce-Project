// src/hooks/useSubCategories.js
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function useSubCategories(catid) {
  const [subcatdata, setsubcatdata] = useState([]);

  const fetchsubcatbycat = async () => {
    try {
      const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getsubcatbycat?cid=${catid}`);
      if (apiresp.data.success === 1) {
        setsubcatdata(apiresp.data.scatdata);
      } else if (apiresp.data.success === 0) {
        setsubcatdata([]);
        toast.info("No categories found");
      } else {
        toast.error("Some error occured, try again");
      }
    } catch (e) {
      toast.error("Error Occured " + e.message);
    }
  };

  useEffect(() => {
    if (catid) {
      fetchsubcatbycat();
    }
  }, [catid]);

  return { subcatdata, setsubcatdata, fetchsubcatbycat };
}
