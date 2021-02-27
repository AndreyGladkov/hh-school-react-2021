
export async function getUsers() {
    const response = await fetch("https://api.github.com/users");
    let users = await response.json();
    return users;
}