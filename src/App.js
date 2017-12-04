import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import SearchBooks from "./SearchBooks"
import ListBooks from "./ListBooks"
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {

    state = {
        myBooks: [],
        searchBooks: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((myBooks) => {
            this.setState({myBooks})
        })
    }

    updateMyBooks = (shelf, book) => {
        if (book.shelf !== shelf) {
            BooksAPI.update(book, shelf).then(() => {
                book.shelf = shelf
                this.setState(state => ({
                    myBooks: state.myBooks.filter(b => b.id !== book.id).concat([book]),
                    searchBooks: state.searchBooks.map(b => {
                        if (b.id === book.id) {
                            b.shelf = shelf
                        }
                        return b;
                    })
                }))
            })
        }
    }

    updateSearchList = (event) => {

        if (event.target.value.length === 0) {
            this.setState({searchBooks: []})
        } else {
            BooksAPI.search(event.target.value, 20).then(searchBooks => {

                if (searchBooks.error) {
                    this.setState({
                        searchBooks: []
                    })
                } else {
                    const result = searchBooks.map(b => {
                        const mb = this.state.myBooks.find(x => b.id === x.id)
                        if (mb === undefined) {
                            b.shelf = 'none'
                        } else {
                            b.shelf = mb.shelf
                        }
                        return b
                    })
                    this.setState({
                        searchBooks: result
                    })

                }
            })


        }
    }


    render() {
        return (
            <div className="app">
                <Route path='/' exact render={() => (
                    <ListBooks
                        myBooks={this.state.myBooks}
                        updateMyBooks={this.updateMyBooks}
                    />
                )}/>
                <Route exact path='/search' render={() => (
                    <SearchBooks
                        updateMyBooks={this.updateMyBooks}
                        updateSearchList={this.updateSearchList}
                        searchBooks={this.state.searchBooks}
                    />
                )}/>
            </div>
        )
    }
}


export default BooksApp
