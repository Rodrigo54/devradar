import React, { useState, useEffect } from "react";
import api, { Dev } from "./services/api";
import "./app.scss";

import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

const App: React.FC = () => {
  const [devs, setDevs] = useState<Dev[]>([]);

  useEffect(() => {
    api.get<Dev[]>("/devs").then(
      ({ data }) => setDevs(data)
    );
  }, []);

  async function handleAddDev(data: Partial<Dev>) {
    const response = await api.post("/devs", data);
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <DevForm onSubmit={handleAddDev} />
      <main>
        <ul>
          {devs.map(dev => (<DevItem key={dev._id} dev={dev}/>))}
        </ul>
      </main>
    </div>
  );
};

export default App;
