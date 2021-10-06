import AsyncStorage from '@react-native-async-storage/async-storage';

//Buscar os filmes salvos
export async function getMoviesSave(key) {
    const myMovies = await AsyncStorage.getItem(key);

    let moviesSave = JSON.parse(myMovies) || [];
    return moviesSave;
}

//Salvar um novo filme
export async function saveMovie(key, newMovie) {
    let moviesStored = await getMoviesSave(key);

    //Se existir filme salvo com o mesmo id ou duplicado, este é ignorado. 
    const hasMovie = moviesStored.some( item => item.id === newMovie.id );

    if(hasMovie) {
        console.log('Esse filme já existe na sua lista')
        return;
    }
    moviesStored.push(newMovie);

    await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
}

//Deletar um filme específico
export async function deleteMovie(id) {
    let moviesStored = await getMoviesSave('@primeflix');

    let myMovies = moviesStored.filter( item => {
        return (item.id !== id)
    });
    await AsyncStorage.setItem('@primeflix', JSON.stringify(myMovies));
    return myMovies;
}

//Filtrar algum filme salvo
export async function hasMovie(movie) {
    let moviesStored = await getMoviesSave('@primeflix');
    const hasMovie = moviesStored.find( item => item.id === movie.id );
    
    if(hasMovie) {
        return true;
    }
    return false;
}