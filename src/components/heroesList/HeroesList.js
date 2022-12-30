import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {

    const {
        data: heroes = [],
        isLoading,
        isError,
    } = useGetHeroesQuery();

    // const undeleteHeroesFromApi = [
    //     {
    //         id: 1,
    //         name: 'First hero',
    //         description: 'First hero in the ranking!',
    //         element: 'fire'
    //     },
    //     {
    //         id: 'b295397d-7a42-49fd-bc9a-1140659590b8',
    //         name: 'Unknown hero',
    //         description: 'Lurking in the shadows',
    //         element: 'wind'
    //     },
    //     {
    //         id: 'ffa18de5-3b39-45a2-974b-24e01fc13adb',
    //         name: 'Robbi',
    //         description: 'Swimming realy fast',
    //         element: 'water'
    //     },
    //     {
    //         id: '611a835c-4ec4-4ca1-99f9-3bd88e545122',
    //         name: 'Deep root',
    //         description: 'Indestructible',
    //         element: 'earth'
    //     },
    // ];

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter)

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(elem => elem.element === activeFilter);
        }
    }, [heroes, activeFilter]);

    const onDelete = useCallback((id) => {
        deleteHero(id);
        // eslint-disable-next-line
    }, [])

    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={500}
                    classNames="item">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
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

    const elements = renderHeroesList(filteredHeroes);

    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;