import { useState, useEffect } from "react";
import axios from "axios";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const reqUrl = "api/todos";

const useAPI = () => {
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const result = await axios.get(reqUrl);
      setRequestStatus(REQUEST_STATUS.SUCCESS);
      setData(result.data);
    } catch (e) {
      setRequestStatus(REQUEST_STATUS.FAILURE);
      setError(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    requestStatus,
    error,
    data,
  };
};

export default useAPI;
