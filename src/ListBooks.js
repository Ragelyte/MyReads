import React from 'react'
import {Link} from 'react-router-dom'
import BookShelf from "./BookShelf"
import PropTypes from 'prop-types'

const ListBooks = (props) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf
                        books={props.myBooks.filter(book => book.shelf === 'currentlyReading')}
                        title={'Currently reading'}
                        updateMyBooks={props.updateMyBooks}/>
                </div>
                <div>
                    <BookShelf
                        books={props.myBooks.filter(book => book.shelf === 'read')}
                        title={'Read'}
                        updateMyBooks={props.updateMyBooks}/>
                </div>
                <div>
                    <BookShelf
                        books={props.myBooks.filter(book => book.shelf === 'wantToRead')}
                        title={'Want to read'}
                        updateMyBooks={props.updateMyBooks}/>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}


ListBooks.PropTypes = {
    myBooks: PropTypes.array.isRequired,
    updateMyBooks: PropTypes.func.isRequired
}


export default ListBooks