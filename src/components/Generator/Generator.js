import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { animate, linear } from '../../anime';
import { githubApiThunkCreators } from '../../strore/reducers/githubApi';
import selector from '../../strore/selector';
import CardUser from './CardUser/CardUser';

import "./Generator.css";

const Generator = ({ 
    loginUser, fullnameRepo, blacklist,
    avatarUrl, contributors, errorMessage,
    changeAvatarUrl, changeContributors
}) => {
    const [reviewer, setReviewer] = useState(null);

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

    useEffect(() => {
        changeAvatarUrl(loginUser);
    }, [loginUser]);

    useEffect(() => {
        changeContributors(fullnameRepo, blacklist, loginUser);
    }, [loginUser, fullnameRepo, blacklist]);

    return (
        <div className="Generator">
            <h2>Текущий пользователь</h2>
            {
                errorMessage
                    ? errorMessage
                    : <CardUser
                        login={loginUser}
                        avatarUrl={avatarUrl}
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

const mapStateToProps = (state) => ({
    avatarUrl: selector.getAvatarUrl(state),
    contributors: selector.getContibutors(state),
    errorMessage: selector.getErrorMessage(state)
});

const mapDispatchToProps = (dispatch) => ({
    changeAvatarUrl(loginUser) {
        dispatch(githubApiThunkCreators.changeAvatarUrl(loginUser));
    },
    changeContributors(fullnameRepo, blacklist, loginUser){
        dispatch(githubApiThunkCreators.changeContributors(fullnameRepo, blacklist, loginUser));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Generator);
