"use strict";
require('@babel/polyfill/noConflict');

(async function () {
  const githubApi = 'https://api.github.com';
  const githubName = 'ecelis';
  const showCase = ['e-react-ui', 'healtcoach', 'nutricion-energetica',
    'sck', 'ianseo-docker', 'roster']  // mallard ??

  function getRepoUrl(repo) {
    return repo.homepage || repo.html_url;
  }

  function renderRepositoryCard(repo) {
    // TODO fetch languages from repo.languages
    const item = `
      <div class="app-card">
        <h2>${repo.name}</h2>
        <h4>• ${repo.language} •</h4>
        <p>${repo.description}</p>
        <p class="repo_url"><a href="${getRepoUrl(repo)}">${getRepoUrl(repo)}</a></p>
        <p>Last update: <time>${new Date(repo.updated_at).toLocaleString()}</time></p>
      </div>
    `;
    return item;
  }

  function latestUpdates(repositories) {
    // repositories.sort((a, b) => {
    //   return new Date(b.updated_at) - new Date(a.updated_at);
    // });
    const updates = repositories.slice(0, 3).map(repo => `${repo.name} · ${new Date(repo.updated_at).toLocaleString()}`);
    const updatesDiv = document.getElementById('updated_repos');
    updates.forEach(update => {
      const element = document.createElement('li');
      element.innerHTML = update;
      updatesDiv.appendChild(element);
    })
  }

  const queryParameters = '?per_page=100&sort=updated&direction=desc';
  const response = await fetch(
    `${githubApi}/users/${githubName}/repos${queryParameters}`);
  const jsonData = await response.json();
  latestUpdates(jsonData);
  const cards = jsonData
    .filter(repo => showCase.includes(repo.name))
    .map(repo => renderRepositoryCard(repo));
  const reposDiv = document.getElementById('grid');
  // reposDiv.innerHTML = cards;
  cards.forEach(card => {
    reposDiv.innerHTML += card;
  });
})();
