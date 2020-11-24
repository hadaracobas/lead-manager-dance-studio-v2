import React, { useEffect, useState } from "react";
import "./App.scss";
import axios from "axios";

// import components
import Home from "./components/Home";

function App() {
  const [data, setData] = useState(false);

  const getDataFromSheet = async () => {
    const dataSheet = await axios
      .get("https://sheet.best/api/sheets/6c613560-926d-4171-8892-5ba0bae57c44")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // disable to save cost of request during work
  /*
  useEffect(() => {
    getDataFromSheet();
  }, []);
*/
  return (
    <div className="app">
      <Home data={data} />
    </div>
  );
}

export default App;
