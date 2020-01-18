import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import api, { Dev } from "./services/api";
=======
import { Dev, DevEtitly } from "./services/dev";
>>>>>>> 385909efd293556797b8f3a5105c5b5e756d8502
import "./app.scss";

import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

const App: React.FC = () => {
  const [devs, setDevs] = useState<Dev[]>([]);

  useEffect(() => {
<<<<<<< HEAD
    api.get<Dev[]>("/devs").then(
      ({ data }) => setDevs(data)
    );
  }, []);

  async function handleAddDev(data: Partial<Dev>) {
    const response = await api.post("/devs", data);
    setDevs([...devs, response.data]);
=======
    DevEtitly.index().then(devs => setDevs(devs));
  }, []);

  async function handleDev() {
    const devs = await DevEtitly.index();
    setDevs(devs);
>>>>>>> 385909efd293556797b8f3a5105c5b5e756d8502
  }

  return (
    <div id="app">
<<<<<<< HEAD
      <DevForm onSubmit={handleAddDev} />
      <main>
        <ul>
          {devs.map(dev => (<DevItem key={dev._id} dev={dev}/>))}
=======
      <DevForm onSubmit={handleDev} />
      <main>
        <ul>
          {devs.map(dev => (<DevItem onDelete={handleDev} key={dev._id} dev={dev}/>))}
>>>>>>> 385909efd293556797b8f3a5105c5b5e756d8502
        </ul>
      </main>
    </div>
  );
};

export default App;
