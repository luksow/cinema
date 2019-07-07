import { elements, clearContent } from '../views/base';

// export const orderedMovies = (events) => {
//     const ordMovies = [];
//     events.forEach((e) => {
//         const filmArray = ordMovies[e.film.name];
//         if (!filmArray) {
//             ordMovies[e.film.name] = [];
//         }
//         ordMovies[e.film.name].push(e);
//     })
//     console.log(ordMovies);

//     return ordMovies;
// }

// export const checkCinemaNamesWawKrk = (cinemaID) => {
//     const IDs = ["1074", "1061", "1096", "1070", "1069", "1068", "1060", "1090", "1076", "1063", "1064"];
//     const names = ["Arkadia", "Bemowo", "Białołęka Galeria Północna", "Galeria Mokotów", "Janki", "Promenada", "Sadyba", "Bonarka", "Galeria Kazimierz", "Galeria Plaza", "Zakopianka"];
//     const indexNumber = IDs.indexOf(cinemaID);
//     if (indexNumber > -1) {
//         const cinemaName = names[indexNumber];
//     } 
// }

export const arrForCinema = (moviesList) => {
    const movieAndEventInfo = [];
    moviesList.forEach(movie => {
        const movieObj = {movieName: movie.film.name, movieID: movie.film.id, poster: movie.film.posterLink, link: movie.film.link, movieAttributes: movie.film.attributeIds, length: movie.film.length, year: movie.film.releaseYear, video: movie.film.videoLink, events: [], cinemaID: movie.cinemaId}
        const idx = movieAndEventInfo.findIndex(obj => obj.movieName == movie.film.name);
        const eventObj = {time: movie.eventDateTime, booking: movie.bookingLink, eventAttributes: movie.attributeIds};
        if (idx === -1) {
            movieObj.events = [eventObj]
            movieAndEventInfo.push(movieObj);
        } else {
            movieAndEventInfo[idx].events.push(eventObj);
        }

        const IDs = ["1074", "1061", "1096", "1070", "1069", "1068", "1060", "1090", "1076", "1063", "1064"];
        const names = ["Arkadia", "Bemowo", "Białołęka Galeria Północna", "Galeria Mokotów", "Janki", "Promenada", "Sadyba", "Bonarka", "Galeria Kazimierz", "Galeria Plaza", "Zakopianka"];
        const indexNumber = IDs.indexOf(movieObj.cinemaID);
        if (indexNumber > -1) {
            const cinName = names[indexNumber];
            movieObj.cinemaName = cinName;
        }
    });

    console.log(movieAndEventInfo);
    return movieAndEventInfo;
}



export const movInf = mov => {
    return {movieName: mov[0].events[0].film.name, movieID: mov[0].events[0].film.id, poster: mov[0].events[0].film.posterLink, link: mov[0].events[0].film.link, movieAttributes: mov[0].events[0].film.attributeIds, length: mov[0].events[0].film.length, year: mov[0].events[0].film.releaseYear, video: mov[0].events[0].film.videoLink}
}

export const arrForMovie = prevArr => {
    return prevArr.map(el => {
        const cinemaObj = {cinemaName: el.cinema.displayName, cinemaLink: el.cinema.link, cinemaAddress: el.cinema.address, cinemaID: el.cinema.id};
        const eventObj = el.events.map(elem => {
            return {time: elem.eventDateTime, booking: elem.bookingLink, eventAttributes: elem.attributeIds};
        })
        return {cinema: cinemaObj, events: eventObj};
    })
}








export const getMovieID = (htmlclass, textToRidOff) => {
    return htmlclass.split(' ')[0].split(textToRidOff)[1];
};

export const movieDate = (moviesList, givenID) => {
    // console.log(moviesList);
    // console.log(givenID);
    const a = moviesList.filter(el => el.id === givenID);
    console.log(a);
    return a[0];
}













export const createCracowArr = (cracowMoviesLists) => {
    const cracowMovieAndEventInfo = [];
    cracowMoviesLists.forEach(movie => {
        const movieObj = {movieName: movie.film.name, poster: movie.film.posterLink, link: movie.film.link, movieAttributes: movie.film.attributeIds, length: movie.film.length, year: movie.film.releaseYear, video: movie.film.videoLink, events: [] }
        const idx = cracowMovieAndEventInfo.findIndex(obj => obj.movieName == movie.film.name);
        const eventObj = {time: movie.eventDateTime, booking: movie.bookingLink, eventAttributes: movie.attributeIds};
        if (idx === -1) {
            movieObj.events = [eventObj]
            movieAndEventInfo.push(movieObj);
        } else {
            movieAndEventInfo[idx].events.push(eventObj);
        }
    });
    console.log(movieAndEventInfo);
    return movieAndEventInfo;
}