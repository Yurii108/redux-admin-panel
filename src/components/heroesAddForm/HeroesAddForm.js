import { useEffect, useState } from "react";
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { heroeAdd } from '../../actions';



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
    const { request } = useHttp();

    const [elements, setElements] = useState([]);

    useEffect(() => {

        request("http://localhost:3001/filters")
            .then(data => setElements(data))
        // eslint-disable-next-line
    }, []);

    const renderElementsList = (elements) => {
        return elements.map((item) => {
            let key = uuidv4();
            return <option key={key} value={item.element}>{item.select}</option>
        })
    }

    const [nameInput, setNameInput] = useState('');
    const [idInput, setIdInput] = useState(uuidv4());
    const [descriptionInput, setDescriptionInput] = useState('');
    const [elementInput, setElementInput] = useState('');

    const element = renderElementsList(elements);

    const dataValue = {
        id: idInput,
        name: nameInput,
        description: descriptionInput,
        element: elementInput
    }

    const onChangeName = (e) => {
        setNameInput(e.target.value)
        // console.log(dataValue)
    }
    const onChangeText = (e) => {
        setDescriptionInput(e.target.value)
    }
    const onChangeElement = (e) => {
        setElementInput(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const json = JSON.stringify(dataValue);
        const data = [...heroes, dataValue];
        if (dataValue.name.length > 2 && dataValue.description.length > 5) {
            dispatch(heroeAdd(data));
            request('http://localhost:3001/heroes', 'POST', json)
                .finally(() => {
                    setNameInput('');
                    setDescriptionInput('');
                    setElementInput('');
                    setIdInput(uuidv4());
                })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Нове ім'я героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    value={nameInput}
                    onChange={onChangeName}
                    placeholder="Моє ім'я?" />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Опис</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    value={descriptionInput}
                    onChange={onChangeText}
                    placeholder="Що я вмію?"
                    style={{ "height": '130px' }} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Виберіть героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={elementInput}
                    onChange={onChangeElement}>
                    {element}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Створити</button>
        </form>
    )
}

export default HeroesAddForm;