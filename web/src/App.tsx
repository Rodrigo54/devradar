import React, { useState, useEffect } from "react";
import { Dev, DevEtitly } from "./services/dev";
import "./app.scss";

import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

const App: React.FC = () => {
  const [devs, setDevs] = useState<Dev[]>([]);

  useEffect(() => {
    DevEtitly.index().then(devs => setDevs(devs));
  }, []);

  async function handleDev() {
    const devs = await DevEtitly.index();
    setDevs(devs);
  }

  return (
    <div id="app">
      <DevForm onSubmit={handleDev} />
      <main>
        <ul>
          {devs.map(dev => (<DevItem onDelete={handleDev} key={dev._id} dev={dev}/>))}
        </ul>
      </main>
    </div>
  );
};

export default App;
