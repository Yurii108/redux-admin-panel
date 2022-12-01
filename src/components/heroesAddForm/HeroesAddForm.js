// import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { heroeAdd } from '../../actions';
// import HeroesListItem from "../heroesListItem/HeroesListItem";
// import Spinner from '../spinner/Spinner';


// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const { heroes } = useSelector(state => state);
    const dispatch = useDispatch();

    const dataValue = {
        id: uuidv4(),
        name: '',
        description: '',
        element: ''
    }

    const onChangeName = (e) => {
        dataValue.name = e.target.value
        console.log(dataValue)
    }
    const onChangeText = (e) => {
        dataValue.description = e.target.value
        console.log(dataValue)
    }
    const onChangeElement = (e) => {
        dataValue.element = e.target.value
        console.log(dataValue)
    }

    const onSubmit = (e) => {
        e.preventDefault(); 
        const data = [...heroes, dataValue];
        dispatch(heroeAdd(data))
        console.log(heroes)
    }



    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    // value={name}
                    onChange={onChangeName}
                    placeholder="Как меня зовут?" />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    // value={text}
                    onChange={onChangeText}
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    onChange={onChangeElement}>
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;