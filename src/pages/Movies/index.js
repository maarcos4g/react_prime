import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import FavoriteItem from '../../components/FavoriteItem';

import { Container, ListMovies } from './styles';

import { getMoviesSave, deleteMovie } from '../../utils/storage';

import { useNavigation, useIsFocused } from '@react-navigation/native';

function Movies() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        let isActive = true;

        async function getFavoriteMovie() {
            const result = await getMoviesSave('@primeflix');

            if(isActive) {
                setMovies(result);
            }
        }

        if(isActive) {
            getFavoriteMovie();
        }

        return () => {
            isActive = false;
        }

    }, [isFocused]);

    async function handleDelete(id) {
        const result = await deleteMovie(id);
        setMovies(result);
    }

    function navigateDetailPage( item ) {
        navigation.navigate('Detail', { id: item.id })
    }

    return(
        <Container>
            <Header title="Minha Lista" />
            <ListMovies 
                data={movies}
                showsVerticalScrollIndicator={false}
                keyExtractor={ item => String(item.id) }
                renderItem={ ({ item }) => (
                    <FavoriteItem 
                        data={item}
                        deleteMovie={ handleDelete }
                        navigatePage={ () => navigateDetailPage(item) }
                    />
                )}
            />
        </Container>
    )
}

export default Movies;