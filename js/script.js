// div element where profile info will appear //
const overview = document.querySelector(".overview");

// GitHub username //
const username = "theMAXdeveloper";

// UL where repo list is displayed //
const repoList = document.querySelector(".repo-list");


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
	}
}

