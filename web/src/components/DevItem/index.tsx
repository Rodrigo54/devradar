import React from "react";
import "./styles.scss";
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
      <div className="actions">
        <a href={`https://github.com/${dev.github_username}`} target="_blank" rel="noopener noreferrer">Acessar Perfil no Github</a>
        <button onClick={handleEdit}>Editar</button>
        <button onClick={handleDelete}>Deletar</button>
      </div>
    </li>
  );
};

export default DevItem;
