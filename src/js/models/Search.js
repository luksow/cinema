import axios from 'axios';


export class Search {
    constructor(queryDate) {
        this.queryDate = queryDate;
    }
    async getResults() {
        try {
            this.resultForDate = await axios(`https://cc.iterato.rs/api/programme?date=${this.queryDate}`);
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


