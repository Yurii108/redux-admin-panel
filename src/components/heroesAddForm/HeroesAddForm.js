import { useHttp } from '../../hooks/http.hook';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { heroAdd } from '../heroesList/heroesSlice';

const HeroesAddForm = () => {

    const [nameInput, setNameInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [elementInput, setElementInput] = useState('');

    const { filters, filtersLoadingStatus } = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const { request } = useHttp();

    const onSubmit = (e) => {
        e.preventDefault();

        const dataValue = {
            id: uuidv4(),
            name: nameInput,
            description: descriptionInput,
            element: elementInput
        }

        const json = JSON.stringify(dataValue);
        if (dataValue.name.length > 2 && dataValue.description.length > 5) {

            request('http://localhost:3001/heroes', 'POST', json)
                // .then(res => console.log(res, 'Success'))
                .then(dispatch(heroAdd(dataValue)))
                .catch(err => console.log(err))
                .finally(() => {
                    setNameInput('');
                    setDescriptionInput('');
                    setElementInput('');
                })
        }
    }


    const renderElementsList = (filters, status) => {
        if (status === "loading") {
            return <opton>Завантаження елементів</opton>;
        } else if (status === "error") {
            return <opton>Помилка при завантаженні</opton>
        }
        
        if(filters && filters.length > 0) {
                        
            return filters.map((item) => {
                 // eslint-disable-next-line
                if(item.element === 'all') return;

                return <option key={item.element} value={item.element}>{item.select}</option>
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
                    onChange={(e) => setNameInput(e.target.value)}
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
                    onChange={(e) => setDescriptionInput(e.target.value)}
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
                    onChange={(e) => setElementInput(e.target.value)}>
                    <option value=''>Я володію елементом...</option>
                    {renderElementsList(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Створити</button>
        </form>
    )
}

export default HeroesAddForm;