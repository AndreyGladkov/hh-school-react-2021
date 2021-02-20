export const apiGithub = {
    get BASIC_URL() {
        return "https://api.github.com";
    },

    async getAvatarUrl(login) {
        const responce = await fetch(`${this.BASIC_URL}/users/${login}`);
        
        if (!responce.ok) {
            throw Error(`Не найден пользователем с логином ${login}`);
        }

        const result = await responce.json();
        return result.avatar_url;
    },

    async getContributors(fullnameRepo) {
        const responce = await fetch(`${this.BASIC_URL}/repos/${fullnameRepo}/contributors`);
        const result = await responce.json();

        if (!Array.isArray(result)) {
            return [];
        }

        return result.map(({login, avatar_url}) => ({login, avatarUrl: avatar_url}));
    }
}
