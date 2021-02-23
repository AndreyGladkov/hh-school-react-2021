// /repos/:owner/:repo/contributors
export async function getContributors(repo) {
    let rp = repo.replace('https://github.com/','');
    const response = await fetch(`https://api.github.com/repos/${rp}/contributors`);
    let users = await response.json();
    return users;
}