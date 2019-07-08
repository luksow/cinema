export class Watching {
    constructor(movie) {
        this.watchingList = [];
    }
    
    addItem(movieID, movieName, moviePoster, listType) {
        const item = { movieID, movieName, moviePoster, listType };
        this.watchingList.push(item);
        this.persistData();  
        return item;
    }
    
    deleteItem(movieID) {
        const index = this.watchingList.findIndex(el => el.movieID  === movieID);
        this.watchingList.splice(index, 1);
        this.persistData();
    }
    
    changeType(movieID, listType) {
        const x = this.watchingList.findIndex(el => el.movieID === movieID);
        this.watchingList[x].listType = listType;
        return this.watchingList[x];
    }

    isOnList(movieID) {
        const x = this.watchingList.findIndex(el => el.movieID === movieID);
        if (x !== -1) {
            return this.watchingList[x].listType;
        } else {
            return '';
        };
    }

    howManyMoviesOnTheList (listType) {
        return this.watchingList.filter(el => el.listType === listType).length;
    }
    
    persistData() {
        localStorage.setItem('items', JSON.stringify(this.watchingList));
    }
    
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('items'));  
        if (storage) this.watchingList = storage;
    }
}

