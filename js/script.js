// div element where profile info will appear //
const overview = document.querySelector(".overview");

// GitHub username //
const username = "theMAXdeveloper";

// UL where repo list is displayed //
const repoList = document.querySelector(".repo-list");

// section where repo's are displayed // 
const repoSection = document.querySelector(".repos");

// section where repo data will appear //
const repoInfoSection = document.querySelector(".repo-data");


const getUserData = async function () {
	const dataRequest = await fetch(`https://api.github.com/users/${username}`)

	const userData = await dataRequest.json();

	displayUserData(userData);
};

getUserData();

const displayUserData = function (userData) {
	const div = document.createElement("div");
	div.classList.add("user-info");

	div.innerHTML = 
	`<figure>
		<img alt="user avatar" src=${userData.avatar_url} />
	</figure>
    <div>
    	<p><strong>Name:</strong> ${userData.name}</p>
      	<p><strong>Bio:</strong> ${userData.bio}</p>
      	<p><strong>Location:</strong> ${userData.location}</p>
      	<p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
    </div>`;

    overview.append(div);

    getRepoData();
};

const getRepoData = async function () {
	const dataRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

	const repoData = await dataRequest.json();

	displayRepos(repoData);
};

const displayRepos = function (repoData) {
	for (let repo of repoData) {
		const li = document.createElement("li");
		li.classList.add("repo");

		li.innerHTML = `<h3>${repo.name}</h3>`;

		repoList.append(li);
	};
};

repoList.addEventListener("click", function (e) {
	if (e.target.matches("h3")) {
		const repoName = e.target.innerText;
		getRepoInfo(repoName);
	};

});

const getRepoInfo = async function (repoName) {
	const dataRequest = await fetch(`https://api.github.com/repos/${username}/${repoName}`);

	const repoInfo = await dataRequest.json();

	const fetchLanguages = await fetch(repoInfo.languages_url);

	const languageData = await fetchLanguages.json()

	const languages = [];

	for (let language in languageData) {
		languages.push(language);
	};

	displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
	repoInfoSection.innerHTML = "";

	const div = document.createElement("div");
	div.innerHTML = `
	<h3>Name: ${repoInfo.name}</h3>
    	<p>Description: ${repoInfo.description}</p>
    	<p>Default Branch: ${repoInfo.default_branch}</p>
    	<p>Languages: ${languages.join(", ")}</p>
    	<a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
	`;

	repoInfoSection.append(div);
	repoInfoSection.classList.remove("hide");
};



