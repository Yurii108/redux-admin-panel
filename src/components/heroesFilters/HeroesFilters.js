import { useEffect, useState } from "react";
import { useHttp } from '../../hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';


// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    
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
            return <button 
            key={key} 
            className={item.class} 
            value={item.element}>{item.select}</button>
        })
    }

    const button = renderElementsList(elements);
    

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Фільтрувати героїв за елементами</p>
                <div className="btn-group">
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                    {button}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;