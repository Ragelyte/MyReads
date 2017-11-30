import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchBooks extends Component {

    state = {
        books: []
    }

    updateList = (event) => {

        if (event.target.value.length === 0) {
            this.setState({books: []})
        } else {
            BooksAPI.search(event.target.value, 20).then((books) => {
                if (books.error) {
                    this.setState({books: []})
                } else {
                    this.setState({books})
                }
            })
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search"> Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.updateList}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map((book) => (
                            <li key={book.id}>
                                <Book onBookShelfChange={this.props.updateMyBooks} book={book}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

SearchBooks.PropTypes = {
    updateMyBooks: PropTypes.func.isRequired
}

export default SearchBooks