import React, { useEffect, useState } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function fetchRepositories() {
    const response = await api.get('/repositories');

    const repositories = response.data;

    setRepositories(repositories);
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repositorio ${Date.now()}`,
      url: '...',
      techs: '...'
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 && repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
