import axios from 'axios';

//const proxy = 'https://cors-anywhere.herokuapp.com/';
const proxy = 'https://crossorigin.me/';

export class Search {
    constructor(queryDate) {
        this.queryDate = queryDate;
    }
    async getResults() {
        try {
            this.resultForDate = await axios(`http://cc.iterato.rs/api/programme?date=${this.queryDate}`);
            //this.resultForDate = await axios(`${proxy}cc.iterato.rs/programme?date=${this.queryDate}`);
            console.log(this.resultForDate);
        } catch (error) {
            alert(error);
        }
    }

    getOrderedResults() {
        return this.resultForDate.data;
    }

    getCinemas() {
        const cinemas = this.resultForDate.data.map(c => c.cinema);
        return cinemas;
    }

    getMovies() {
        const flatMovies = this.resultForDate.data.flatMap(c => c.events.map(e => e.film));
        // const notFlatMovies = this.resultForDate.data.map(c => c.events.map(e => e.film));
        // console.log(flatMovies);
        // console.log(notFlatMovies);

        const movies = [];
        flatMovies.forEach((film, i) => {
            if (movies.findIndex(m => m.name === film.name) === -1) {
                movies.push(film);
            }
        });
        console.log(movies)
        return movies;
    }

    
};















// export class SearchCinema {
//     constructor(queryCinema) {
//         this.queryCinema = queryCinema;
//     }

//     getCinemaID() {
//         const ID = SearchDate.getResults();
//         console.log(ID);
//     }
    
//     async getResults() {
//         try {
//             this.result = await axios(`${proxy}cc.iterato.rs/programme?cinemaId=${this.getCinemaID.ID}&date=${SearchDate.queryDate}`);
//         } catch (error) {
//             //alert(error);
//         }
//     }
// }

// export class SearchMovie {
//     constructor(queryMovie) {
//         this.queryMovie = queryMovie;
//     }

//     getResults() {
//         const movies = SearchCinema.result.filter(e => e.events.name === this.queryMovie) // tu potrzebuję tablicę z całymi obiektami będącymi elementami tablicy SearchCinema.result.events
//     }
// }





