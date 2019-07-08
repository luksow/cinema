import { elements, clearContent } from './views/base';
import { Search } from './models/Search';
import * as searchingView from './views/searchView';
import * as resultsView from './views/resultsView';
import * as results from './models/Results';
import { Watching } from './models/Watched';
import * as watchedView from './views/watchedView';

const state = {};

[searchingView.chooseDay, searchingView.inactiveClass].forEach(f => window.addEventListener('load', f));

elements.showHideTxt.addEventListener('click', searchingView.searchSettings);

const renderWatchingInfoFromLocalStorage = () => {
    state.watchingList = new Watching();
    
    state.watchingList.readStorage();

    const IDs = state.searchDate.getMovies().map(el => el.id);
    state.watchingList.watchingList = state.watchingList.watchingList.filter(item => IDs.indexOf(item.movieID) >= 0); 
    
    watchedView.toggleWatchingMenu('towatch', state.watchingList.howManyMoviesOnTheList('towatch'));
    watchedView.toggleWatchingMenu('watched', state.watchingList.howManyMoviesOnTheList('watched'));

    console.log(state.watchingList);
    state.watchingList.watchingList.forEach(item => {
        watchedView.renderItem(item);
    });
};

export const controlSearch = async (weekDay) => { 
    
    const queryDate = searchingView.addDays(weekDay);

    if (queryDate) {
        state.searchDate = new Search(queryDate);
        window.scrollTo(0,0);
        elements.res().classList.add('full_screen_height');
        resultsView.clearWhenSearchChange();
        [elements.cinemaTitle, elements.movieTitle, elements.searchCinema(), elements.searchMovie()].forEach(e => clearContent(e));
        searchingView.clearLoader();
        searchingView.renderLoader(elements.res());

        try {
            await state.searchDate.getResults();
            console.log(state.searchDate)
            console.log(state.searchDate.getCinemas());
            console.log(state.searchDate.getMovies());
            searchingView.clearLoader();
            searchingView.changeDay();
            searchingView.chooseCinemaMovie();
            searchingView.renderCinemasNames(state.searchDate.getCinemas());
            searchingView.renderMoviesTitles(state.searchDate.getMovies());
            renderWatchingInfoFromLocalStorage();

        } catch (err) {
            searchingView.clearLoader();
            console.log(err);
        }
    }     
};

const p = searchingView.daysNumbers;

elements.weekdays.addEventListener('click', e => {
    if (e.target.matches('.mon, .mon *')) {
        controlSearch(p.monday);
    } else if (e.target.matches('.tue, .tue *')) {
        controlSearch(p.tuesday);
    } else if (e.target.matches('.wed, .wed *')) {
        controlSearch(p.wednesday);
    } else if (e.target.matches('.thu, .thu *')) {
        controlSearch(p.thursday);
    } else if (e.target.matches('.fri, .fri *')) {
        controlSearch(p.friday);
    } else if (e.target.matches('.sat, .sat *')) {
        controlSearch(p.saturday);
    } else if (e.target.matches('.sun, .sun *')) {
        controlSearch(p.sunday);
    }
});



const cinResResAll = (e, whichMovies) => {
    if (whichMovies === 'all') {
        return results.arrForCinema(e.events);
    } else if (whichMovies === 'onlyTowatch') {
        const towatchIDs = state.watchingList.watchingList.filter(c => c.listType === 'towatch').map(el => el.movieID);
        console.log(towatchIDs);
        console.log(results.arrForCinema(e.events));
        const x = results.arrForCinema(e.events).filter(el => towatchIDs.indexOf(el.movieID) >= 0);
        console.log(x);
        return x;
    } else if (whichMovies === 'noWatched') {
        const watchedIDs = state.watchingList.watchingList.filter(c => c.listType === 'watched').map(el => el.movieID);
        return results.arrForCinema(e.events).filter(el => watchedIDs.indexOf(el.movieID) === -1);
    }
};

const cinRes = (whichMovies) => {
    state.searchDate.getOrderedResults().forEach((e) => {
        
        if (e.cinema.displayName === state.getCinema) {
            resultsView.renderCinemaInfo(e.cinema);
            console.log(e);
            console.log(e.events);
            resultsView.renderResultsForCinema(cinResResAll(e, whichMovies));
        }

        if ('Warszawa - wszystkie kina' === state.getCinema) {
            const wawIDs = ["1074", "1061", "1096", "1070", "1069", "1068", "1060"];
            wawIDs.forEach(wawID => {
                if (wawID === e.cinema.id) {
                    resultsView.renderTitleWawKrk(state.getCinema);
                    resultsView.renderCinemaInfoWawKrk(e.cinema);
                    resultsView.renderResultsForCinemaWawKrk(cinResResAll(e, whichMovies));
                }  
            })
        }

        if ('Kraków - wszystkie kina' === state.getCinema) {
            const krkIDs = ["1090", "1076", "1063", "1064"];
            
            krkIDs.forEach(krkID => {
                if (krkID === e.cinema.id) {
                    resultsView.renderTitleWawKrk(state.getCinema);
                    resultsView.renderCinemaInfoWawKrk(e.cinema);
                    resultsView.renderResultsForCinemaWawKrk(cinResResAll(e, whichMovies));
                }  
            })
        }
    })
};




const resultsForACinema = (whichMovies) => {
    state.getCinema = searchingView.getCinema();
    state.getMovie = null;
    console.log(state.getCinema);
    window.scrollTo(0,0);
    resultsView.clearWhenSearchChange();
    resultsView.addMoviesSelection();
    elements.res().classList.remove('full_screen_height');
    cinRes(whichMovies);
    searchingView.changeCinemaMovie();
    resultsView.renderTheEnd();
    whenResultsLoaded();
    elements.searchMovie().value = "wszystkie filmy";
};

elements.searchCinema().onchange = function () {
    resultsForACinema('all');
};


const movPl = () => {
    return state.searchDate.getOrderedResults().map(el => {
        return { cinema: el.cinema, events: el.events.filter(ev => ev.film.name === state.getMovie) }
    }).filter(el => el.events.length > 0);
};

const movWaw = () => {
    const wawIDs = ["1074", "1061", "1096", "1070", "1069", "1068", "1060"];
    return state.searchDate.getOrderedResults().map(el => {
        return { cinema: el.cinema, events: el.events.filter(ev => ev.film.name === state.getMovie) }
    }).filter(el => el.events.length > 0).filter(cin => wawIDs.indexOf(cin.cinema.id) >= 0);
};

const movKrk = () => {
    const krkIDs = ["1090", "1076", "1063", "1064"];
    return state.searchDate.getOrderedResults().map(el => {
        return { cinema: el.cinema, events: el.events.filter(ev => ev.film.name === state.getMovie) }
    }).filter(el => el.events.length > 0).filter(cin => krkIDs.indexOf(cin.cinema.id) >= 0);
};

const movRes = (city) => {
    if (city === 'pl') {
        resultsView.renderMovieInfo(results.movInf(movPl()));
        resultsView.renderResultsForMovie(results.arrForMovie(movPl()));
    } else if (city === 'waw') {
        resultsView.renderMovieInfo(results.movInf(movPl()));
        resultsView.renderResultsForMovie(results.arrForMovie(movWaw()));
    } else if (city === 'krk') {
        resultsView.renderMovieInfo(results.movInf(movPl()));
        resultsView.renderResultsForMovie(results.arrForMovie(movKrk()));
    }
};

export const resultsForAMovie = (movie, city) => {
    state.getMovie = movie;
    console.log(state.getMovie);
    window.scrollTo(0,0);
    resultsView.clearWhenSearchChange();
    resultsView.addCitiesSelection();
    console.log(movPl());
    elements.res().classList.remove('full_screen_height');
    movRes(city);
    searchingView.changeCinemaMovie();
    resultsView.renderTheEnd();
    whenResultsLoaded();
    elements.searchCinema().value = "wszystkie kina";
}

elements.searchMovie().addEventListener('change', function () {
    resultsForAMovie(searchingView.getMovie(), 'pl');
});

const addTrailerOption = (movie) => {
    document.querySelector(`.trailer_text_${movie.id}`).style.display = "none";
    document.querySelector(`.trailer_video_${movie.id}`).style.display = "inline";
}

const watchingChanges = () => {
    const old_element = elements.res();
    const new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);

    new_element.addEventListener('click', e => {
        if (e.target.closest('.towatch_icon')) {
            addNewWatchingItems(results.movieDate(state.searchDate.getMovies(), results.getMovieID(e.target.closest('.towatch_icon').getAttribute("class"), 'watching_')), 'towatch');
        } else if (e.target.closest(`.watched_icon`)) {
            addNewWatchingItems(results.movieDate(state.searchDate.getMovies(), results.getMovieID(e.target.closest('.watched_icon').getAttribute("class"), 'watching_')), 'watched');
        } else if (e.target.closest(`.cinema_results_trailer_text`)) {
            addTrailerOption(results.movieDate(state.searchDate.getMovies(), results.getMovieID(e.target.closest('.cinema_results_trailer_text').getAttribute("class"), 'trailer_text_')));
        }
    });

    document.querySelectorAll('.towatch_icon').forEach(el => window.addEventListener('load', renderOldWatchingItems(results.getMovieID(el.getAttribute("class"), 'watching_'), 'towatch')));
    document.querySelectorAll('.watched_icon').forEach(el => window.addEventListener('load', renderOldWatchingItems(results.getMovieID(el.getAttribute("class"), 'watching_'), 'watched')));
};

const renderOldWatchingItems = (movieID, listType) => {
    if (state.watchingList) {
        if (state.watchingList.isOnList(movieID) === listType) {
            watchedView.toggleWatchingBtn(movieID, listType, true);
        }
    }
};

const addNewWatchingItems = (movie, listType) => {
    console.log(movie);
    
    const movieID = movie.id;
    const movieName = movie.name;
    const moviePoster = `${movie.posterLink}`;
    console.log(movieID);

    let newItem;

    const otherList = listType => {
        if (listType === 'towatch') {
            listType = 'watched'
         } else {
            listType = 'towatch'
         }
         return listType;
    };

    if (state.watchingList.isOnList(movieID) === '') {
        newItem = state.watchingList.addItem(movieID, movieName, moviePoster, listType);
        watchedView.toggleWatchingBtn(movieID, listType, true);
        watchedView.renderItem(newItem);
        console.log(state.watchingList);
    } else if (state.watchingList.isOnList(movieID) !== listType) {
        watchedView.toggleWatchingBtn(movieID, state.watchingList.isOnList(movieID), false);
        watchedView.toggleWatchingBtn(movieID, listType, true);
        newItem = state.watchingList.changeType(movieID, listType);
        watchedView.renderItem(newItem);
        console.log(newItem);
        watchedView.deleteItem(otherList(newItem.listType), movieID);
        console.log(state.watchingList);
    }
    else {
        state.watchingList.deleteItem(movieID);
        watchedView.toggleWatchingBtn(movieID, listType, false);
        watchedView.deleteItem(listType, movieID);
        console.log(state.watchingList);
    }
    watchedView.toggleWatchingMenu(listType, state.watchingList.howManyMoviesOnTheList(listType));
    watchedView.toggleWatchingMenu(otherList(listType), state.watchingList.howManyMoviesOnTheList(otherList(listType)));
};

const whenResultsLoaded = () => {
    watchingChanges();

    elements.selection_panel().addEventListener('click', e => {
        if (e.target.matches('.pl, .pl *')) {
            resultsForAMovie(searchingView.getMovie(), 'pl');
            resultsView.currentCity(elements.pl());
        } else if (e.target.matches('.waw, .waw *')) {
            resultsForAMovie(searchingView.getMovie(), 'waw');
            resultsView.currentCity(elements.waw());
        } else if (e.target.matches('.krk, .krk *')) {
            resultsForAMovie(searchingView.getMovie(), 'krk');
            resultsView.currentCity(elements.krk());
        } else if (e.target.matches('.watching_selection_allmovies, .watching_selection_allmovies *')) {
            resultsForACinema('all');
            resultsView.currentMovies(elements.selection_allmovies());
        } else if (e.target.matches('.watching_selection_towatch, .watching_selection_towatch *')) {
            resultsForACinema('onlyTowatch');
            resultsView.currentMovies(elements.selection_towatch());
        } else if (e.target.matches('.watching_selection_watched, .watching_selection_watched *')) {
            resultsForACinema('noWatched');
            resultsView.currentMovies(elements.selection_watched());
        }
    });
};
