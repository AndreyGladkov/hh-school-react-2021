import React from 'react'
import { Blacklist } from './blacklist';
export function Settings(props) {
    return (
        <table>
            <tr>
                <td>Логин ревьювера</td>
                <td><input placeholder="login" value={props.reviewer}/></td>
            </tr>
            <tr>
                <td>Ссылка на репозиторий</td>
                <td><input placeholder="repository" value={props.repo}/></td>
            </tr>
            <tr>
                <td>Черный список</td>
                <td><Blacklist blacklist={props.blacklist}/></td>
            </tr>
            
            
            
        </table>
    );
}