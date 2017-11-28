import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends Component {


    state = {
        shelf: 'none'
    }

    addToBookshelf = (bookshelf) => {
        BooksAPI.update(this.props.book, bookshelf).then(() => {
            if (this.props.onBookShelfChange)
                this.props.onBookShelfChange()
        })
    }

    componentDidMount() {
        if (this.props.book.shelf === undefined) {
            BooksAPI.get(this.props.book.id).then(book => {
                this.setState({
                    shelf: book.shelf
                })
            })
        } else {
            this.setState({
                shelf: this.props.book.shelf
            })
        }
    }

    render() {

        const {book} = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                    }}/>
                    <div className="book-shelf-changer">
                        <select value={this.state.shelf} onChange={(event) => this.addToBookshelf(event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.toString() : ''}</div>
            </div>
        )
    }
}

Book.PropTypes = {
    book: PropTypes.object.isRequired,
    onBookShelfChange: PropTypes.func
}

export default Book