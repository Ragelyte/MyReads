import React from 'react'
import './App.css'
import { Route } from  'react-router-dom'
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {

    state = {
        myBooks: []
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
                    myBooks: state.myBooks.filter(b => b.id !== book.id).concat([ book ])
                }))
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
            />
        )}/>
      </div>
    )
  }
}



export default BooksApp
