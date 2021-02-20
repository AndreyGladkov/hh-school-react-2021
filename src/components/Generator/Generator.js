import React, { useEffect, useState } from 'react';
import { apiGithub } from '../../api/apiGithub';
import CardUser from './CardUser/CardUser';

const Generator = ({loginUser, fullnameRepo, blacklist}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [reviewer, setReviewer] = useState(null);
    const [avatarUser, setAvatarUser] = useState();
    const [contributors, setContributors] = useState([]);

    const generateReviewer = () => {
        const index = Math.floor(Math.random() * contributors.length)
        setReviewer(contributors[index]);
    }

    useEffect(async () => {
        try {
            const avatarUrl = await apiGithub.getAvatarUrl(loginUser);
            setAvatarUser(avatarUrl);
        } catch (e) {
            setErrorMessage(e.message);
        }
    }, [loginUser]);

    useEffect(async () => {
        let contributors = await apiGithub.getContributors(fullnameRepo);
        contributors = contributors.filter(({login}) => login !== loginUser && !blacklist.includes(login));
        setContributors(contributors);
    }, [loginUser, fullnameRepo, blacklist]);
    
    return (
        <div>
            <h2>Текущий пользователь</h2>
            {
                errorMessage
                    ?errorMessage
                    :<CardUser
                        login={loginUser}
                        avatarUrl={avatarUser}
                    />
            }

            <h2>Сгенерированный ревьюер</h2>
            <div>
                <button onClick={generateReviewer}>Сгенерировать</button>
                {
                    reviewer && 
                    <CardUser
                        login={reviewer.login}
                        avatarUrl={reviewer.avatarUrl}
                    />
                }
            </div>

            <h2>Контрибьютеры</h2>
            <div>
                {
                    contributors.map(({login, avatarUrl}) => (
                        <CardUser
                            key={login}
                            login={login}
                            avatarUrl={avatarUrl}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Generator;
