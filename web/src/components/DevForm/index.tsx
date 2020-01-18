import React, { useState, useEffect, FormEvent } from "react";
import "./styles.scss";
<<<<<<< HEAD

type DevFormProps = {
  onSubmit: (dev: any) => Promise<any>;
=======
import { DevEtitly } from "../../services/dev";

type DevFormProps = {
  onSubmit: () => Promise<void>;
>>>>>>> 385909efd293556797b8f3a5105c5b5e756d8502
};

const DevForm: React.FC<DevFormProps> = ({ onSubmit }) => {
  const [github_username, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState<any>("");
  const [longitude, setLongitude] = useState<any>("");
<<<<<<< HEAD

  useEffect(() => {
=======
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setLocation();
    DevEtitly.subscribe((dev) => {
      if (dev) {
        setEdit(true);
        setGithubUsername(dev.github_username);
        setTechs(dev.techs.join(", "));
        setLatitude(dev.location.coordinates[1]);
        setLongitude(dev.location.coordinates[0]);
      } else {
        setEdit(false);
      }
    });
  }, []);

  function setLocation() {
>>>>>>> 385909efd293556797b8f3a5105c5b5e756d8502
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => {
        console.log(error);
      },
      { timeout: 30000 }
    );
<<<<<<< HEAD
  });
=======
  }
>>>>>>> 385909efd293556797b8f3a5105c5b5e756d8502

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

<<<<<<< HEAD
    await onSubmit({
=======
    const dev = new DevEtitly({
>>>>>>> 385909efd293556797b8f3a5105c5b5e756d8502
      github_username,
      techs,
      latitude,
      longitude
    });

<<<<<<< HEAD
    setGithubUsername("");
    setTechs("");
=======
    if (edit) {
      await dev.update();
    } else {
      await dev.store();
    }

    setGithubUsername("");
    setTechs("");
    setLocation();
    DevEtitly.next();
    await onSubmit();
>>>>>>> 385909efd293556797b8f3a5105c5b5e756d8502
  }

  return (
    <aside>
      <strong>Cadastrar</strong>
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="username_github">Usuario Github</label>
          <input
            name="username_github"
            id="username_github"
            required
            type="text"
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
            name="techs"
            id="techs"
            required
            type="text"
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              name="latitude"
              id="latitude"
              required
              type="text"
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              name="longitude"
              id="longitude"
              required
              type="text"
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </aside>
  );
};

export default DevForm;
