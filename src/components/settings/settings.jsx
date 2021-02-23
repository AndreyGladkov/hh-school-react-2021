import React, { useEffect, useState } from 'react'
import { Blacklist } from './blacklist'

export function Settings(props) {
    const [user, setUser] = useState(props.user);
    const [repo, setRepo] = useState(props.repo);
    const [blacklist, setBlacklist] = useState(props.blacklist);
    useEffect(() => {
        setUser(props.user);
        setRepo(props.repo);
        setBlacklist(props.blacklist);
        return null;
    }, [])
    //            <!--button onClick={() => { if (props.onNewReviewer) { props.onNewReviewer() } }}>Новый ревьювер</button>
    return (
        <>
            <table>
                <tr>
                    <td>Логин ревьювера</td>
                    <td><input placeholder="login" value={props.user} onChange={(val) => {
                        setUser(val.target.value)
                    }} /></td>
                </tr>
                <tr>
                    <td>Ссылка на репозиторий</td>
                    <td><input placeholder="repository" value={props.repo} onChange={(val) => { setRepo(val.target.value) }} /></td>
                </tr>
                <tr>
                    <td>Черный список</td>
                    <td><Blacklist
                        onAdd={(val) => { if (props.onAdd) { props.onAdd(val); } }}
                        onDelete={(val) => { if (props.onDelete) { props.onDelete(val) } }}
                        blacklist={props.blacklist} /></td>
                </tr>
            </table>

            <button onClick={() => {
                if (props.onSaveSettings) {
                    props.onSaveSettings({
                        'user': user, 'repo': repo
                    })
                }
            }}>Сохранить настройки</button>
        </>
    );
}