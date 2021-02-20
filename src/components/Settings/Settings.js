import React, { useState } from 'react';

const Settings = ({
        loginUser, saveLoginUser,
        fullnameRepo, saveFullnameRepo,
        blacklist, addToBlackList, removeFromBlackList
    }) => {
    
    // видимость
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisiablity = () => setIsVisible(!isVisible);

    // текущий пользователь
    const [settingLoginUser, setSettingLoginUser] = useState(loginUser);

    const [isSaveLogin, setIsSaveLogin] = useState(true);

    const hadlerChangeLogin = (e) => {
        setSettingLoginUser(e.target.value);
        setIsSaveLogin(false);
    }

    const hadlerSaveLogin = () => {
        setSettingLoginUser(settingLoginUser);
        setIsSaveLogin(true);
        saveLoginUser(settingLoginUser);
    }

    // название репозитория
    const [settingFullnameRepo, setSettingFullnameRepo] = useState(fullnameRepo);

    const [isSaveFullnameRepo, setIsSaveFullnameRepo] = useState(true);

    

    const hadlerChangeFullnameRepo = (e) => {
        setSettingFullnameRepo(e.target.value);
        setIsSaveFullnameRepo(false);
    }

    const hadlerSaveFullnameRepo = () => {
        setSettingFullnameRepo(settingFullnameRepo);
        setIsSaveFullnameRepo(true);
        saveFullnameRepo(settingFullnameRepo);
    }

    // черный список
    const [blackListLogin, setBlackListLogin] = useState("");

    return (
        <div>
            <button onClick={toggleVisiablity}>
                {
                    isVisible
                        ?"Спрятать настройки"
                        :"Показать настройки"
                }
            </button>

            {
                isVisible &&
                <div>
                    <label>
                        Логин текущего пользователя:
                        <input
                            value={settingLoginUser}
                            onChange={hadlerChangeLogin} 
                            placeholder="Логин"
                        />
                    </label>
                    {!isSaveLogin && <button onClick={hadlerSaveLogin}>Сохранить</button>}
                    <br/>

                    <label>
                        Репозиторий в формате "создатель репозитория/название репозитория" (без кавычек):
                        <input 
                            value={settingFullnameRepo}
                            onChange={hadlerChangeFullnameRepo}
                            placeholder="репозиторий"
                        />
                    </label>
                    
                    {!isSaveFullnameRepo && <button onClick={hadlerSaveFullnameRepo}>Сохранить</button>}

                    <div>
                        <label>
                            Чёрный список:
                            <input 
                                value={blackListLogin}
                                onChange={(e) => setBlackListLogin(e.target.value)}
                                placeholder="Логин"
                            />
                        </label> 

                        <button onClick={() => addToBlackList(blackListLogin)}>Добавить</button>

                        <ul>
                            {
                                blacklist.map(login => (
                                    <li key={login}>
                                        {login}
                                        <button onClick={() => removeFromBlackList(login)}>Удалить</button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
}

export default Settings;
