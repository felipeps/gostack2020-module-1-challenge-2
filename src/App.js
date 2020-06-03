import React, { useState, useEffect } from "react";
import api from './services/api.js';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    api.post('/repositories', {
      title: `New repository ${Date.now()}`,
      url: "felipeps",
      techs: ["Node", "React"]
    }).then(response => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      repositories.splice(repositoryIndex, 1);
      setRepositories([...repositories]);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <div key={repository.id}>
            <li>
              {repository.title}

              <button key={repository.id} onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
            </li>
          </div>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
