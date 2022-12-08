import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, heroeDelete } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.scss';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const { filters, heroes, heroesLoadingStatus } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")

            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const onDelete = (id) => {
        const data = heroes.filter(elem => elem.id !== id)
        dispatch(heroeDelete(data))
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({ id, ...props }) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="item">
                    <HeroesListItem
                        key={id} {...props}
                        onDelete={() => onDelete(id)} />
                </CSSTransition>
            )
        })
    }

    const filterHeroes = (items, filter) => {
        switch (filter) {
            case 'fire':
                return items.filter(item => item.element === filter)
            case 'water':
                return items.filter(item => item.element === filter)
            case 'wind':
                return items.filter(item => item.element === filter)
            case 'earth':
                return items.filter(item => item.element === filter)
            default:
                return items;
        }
    }

    const elements = renderHeroesList(filterHeroes(heroes, filters));

    // const nodeRef = useRef(null);

    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;