import React from "react";
import "./styles.scss";
<<<<<<< HEAD
import { Dev } from "../../services/api";

type DevItemProps = {
  dev: Dev;
};

const DevItem: React.FC<DevItemProps> = ({ dev }) => {
=======
import { Dev, DevEtitly } from "../../services/dev";

type DevItemProps = {
  onDelete: () => Promise<void>;
  dev: Dev;
};

const DevItem: React.FC<DevItemProps> = ({ dev, onDelete }) => {

  function handleEdit() {
    DevEtitly.next(dev);
  }

  async function handleDelete() {
    const { github_username } = dev;
    const r = globalThis.confirm(`Tem certeza que deseja apagar o dev ${github_username}`);
    if (r === true) {
      const etitly = new DevEtitly({ github_username });
      await etitly.destroy();
      await onDelete();
    }
  }

>>>>>>> 385909efd293556797b8f3a5105c5b5e756d8502
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
<<<<<<< HEAD
      <a href={`https://github.com/${dev.github_username}`} target="_blank" rel="noopener noreferrer">Acessar Perfil no Github</a>
=======
      <div className="actions">
        <a href={`https://github.com/${dev.github_username}`} target="_blank" rel="noopener noreferrer">Acessar Perfil no Github</a>
        <button onClick={handleEdit}>Editar</button>
        <button onClick={handleDelete}>Deletar</button>
      </div>
>>>>>>> 385909efd293556797b8f3a5105c5b5e756d8502
    </li>
  );
};

export default DevItem;
