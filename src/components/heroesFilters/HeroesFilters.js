import { useHttp } from '../../hooks/http.hook';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import classNames from "classnames";

import { filtersFetching, filtersFetchingError, filtersFetched, activeFilterChanged } from '../../actions';

import Spinner from '../spinner/Spinner';



// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const { filters, filtersLoadingStatus, activeFilter } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilter = (arr) => {

        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фільтри не знайденні</h5>
        }

        return arr.map(({ className, element, select }) => {

            const btnClass = classNames('btn', className, {
                'active': select === activeFilter
            })

            return <button
                key={element}
                id={element}
                className={btnClass}
                onClick={() => dispatch(activeFilterChanged(element))}>
                {select}</button>

        })
    }

    const button = renderFilter(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Фільтрувати героїв за елементами</p>
                <div className="btn-group">
                    {button}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;