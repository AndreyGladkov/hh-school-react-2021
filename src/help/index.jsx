import { useState } from "react";
import { config } from 'react-spring';
import { Menu } from '../consts';
import { useSpring, animated } from 'react-spring'
import { delay } from 'delay'

export function About(props) {
    const [isAbout, setAbout] = useState(false);
    const style = useSpring({
        //config: config.slow,
        //unique,
        display: isAbout ? 'block' : 'none',
        to: async next => {
            await next({
                transform: 'translateX(0%)',
            });
        },
        from: async next => {
            await delay(700);
            await next({
                transform: 'translateX(-100%)',
            });
        },
    })
    return (

        <>
            <button id='button-help' onClick={() => { 
                isAbout ? setAbout(false) : setAbout(true); 
                if (props.onClick) { props.onClick(isAbout ? false : true) }
             }}>Задание</button>
            <animated.div id='help' style={{...style, display: isAbout ? 'block' :'none' }}>
                <h1>Задание по React</h1>
                <p>Нужно сделать одностраничное приложение, которое помогает найти ревьюера.</p>
                <p>Функционал:</p>
                <ul>
                    <li>кнопка настроек, по клику на нее можно переключать видимость настроек.</li>
                    <li>в настройках 3 поля:
                        <ul>
                            <li>login для ввода логина текущего юзера</li>
                            <li>repo для указания репозитория для которого ищем ревьюера</li>
                            <li>blacklist для указания списка login-ов, кто не должен быть ревьюером</li>
                        </ul>
                    </li>
                    <li>состояние настроек сохранять в localStorage</li>
                    <li>для генерации ревьюера нужна кнопка поиска ревьюера, по клику на которую должен быть выбран рандомный ревьюер из
                            списка контрибьютеров репзитория указанный в пункте 2 настроек, учитывая blacklist пункта 3.</li>
                    <li>при генерации ревьюера показываем текущего пользователя и перебираемые вами пользователи для ревью.</li>
                </ul>
                <p>Дока по API https://docs.github.com/en/rest. Пример, как может выглядеть блок с ревьюером.</p>
                <p>Макетов нет, можно делать на ваш вкус и цвет, включайте фантазию). Оцениваться будет реализация, а не визуальная часть.
                        При написании используем только функциональные компоненты, класс компоненты запрещены.</p>
            </animated.div>
        </>
    );
}