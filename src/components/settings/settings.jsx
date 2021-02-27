import React from 'react'
import { Blacklist } from './blacklist'

export function Settings(props) {
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>Логин ревьювера</td>
                        <td><input placeholder="login" value={props.user} /></td>
                    </tr>
                    <tr>
                        <td>Ссылка на репозиторий</td>
                        <td><input placeholder="repository" value={props.repo} onChange={(val) => { props.onChangeRepo(val.target.value) }} /></td>
                    </tr>
                    <tr>
                        <td>Черный список</td>
                        <td>
                            <Blacklist
                                onAdd={(val) => { if (props.onAdd) { props.onAdd(val); } }}
                                onDelete={(val) => { if (props.onDelete) { props.onDelete(val) } }}
                                clearAll={() => { if (props.clearAll) { props.clearAll() } }}
                                blacklist={props.blacklist} />
                        </td>
                    </tr>
                </tbody>
            </table>

            <button onClick={() => {
                if (props.onSaveSettings) {
                    props.onSaveSettings({
                        user: props.user, repo: props.repo, blacklist: props.blacklist
                    })
                }
            }}
                title='Если вручную меняем имя пользователя и репозиторий'
            >Сохранить настройки</button>
        </>
    );
}