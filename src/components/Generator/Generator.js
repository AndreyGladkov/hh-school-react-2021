import React, { useEffect, useState } from 'react';
import { animate, easeOut, linear } from '../../anime';
import { apiGithub } from '../../api/apiGithub';
import CardUser from './CardUser/CardUser';

import "./Generator.css";

const Generator = ({ loginUser, fullnameRepo, blacklist }) => {
    const [errorMessage, setErrorMessage] = useState("");

    const [reviewer, setReviewer] = useState(null);
    const [avatarUser, setAvatarUser] = useState();
    const [contributors, setContributors] = useState([]);

    const [activeIndex, setActiveIndex] = useState(-1);
    const [isDisableGenerate, setIsDisableGenerate] = useState(false);

    const generateReviewer = () => {
        setIsDisableGenerate(true);

        const index = Math.floor(Math.random() * contributors.length);

        const numberOfRounds = 3 * contributors.length + index + 1;

        animate({
            timing: linear,
            duration: Math.min(numberOfRounds * 150, 4500),
            draw(progress) {
                setActiveIndex(Math.floor(progress * numberOfRounds) % contributors.length);
            },
            callback() {
                setActiveIndex(index);
                setReviewer(contributors[index]);
                setIsDisableGenerate(false);
            }
        });
    }

    useEffect(async () => {
        try {
            const avatarUrl = await apiGithub.getAvatarUrl(loginUser);
            setAvatarUser(avatarUrl);
            setErrorMessage("");
        } catch (e) {
            setErrorMessage(e.message);
        }
    }, [loginUser]);

    useEffect(async () => {
        let contributors = await apiGithub.getContributors(fullnameRepo);
        contributors = contributors.filter(({ login }) => login !== loginUser && !blacklist.includes(login));
        setContributors(contributors);
    }, [loginUser, fullnameRepo, blacklist]);

    return (
        <div className="Generator">
            <h2>Текущий пользователь</h2>
            {
                errorMessage
                    ? errorMessage
                    : <CardUser
                        login={loginUser}
                        avatarUrl={avatarUser}
                    />
            }

            <h2>Сгенерированный ревьюер</h2>
            <div>
                <button
                    disabled={isDisableGenerate}
                    onClick={generateReviewer}
                >Сгенерировать</button>
                {
                    reviewer &&
                    <CardUser
                        login={reviewer.login}
                        avatarUrl={reviewer.avatarUrl}
                    />
                }
            </div>

            <h2>Контрибьютеры</h2>
            <ul className="Generator__list-contributors">
                {
                    contributors.map(({ login, avatarUrl }, i) => (
                        <li
                            key={login}
                            className="Generator__list-contributor-element"
                        >
                            <CardUser
                                login={login}
                                avatarUrl={avatarUrl}
                                isActive={i === activeIndex}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Generator;
