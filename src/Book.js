import React from 'react'
import PropTypes from 'prop-types'

const Book = (props) => {
    const {book: {title, authors, imageLinks, shelf}, onBookShelfChange} = props
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${imageLinks.smallThumbnail})`
                }}/>
                <div className="book-shelf-changer">
                    <select value={shelf} onChange={(event) => onBookShelfChange(event.target.value, props.book)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors ? authors.toString() : ''}</div>
        </div>
    )
}


Book.PropTypes = {
    book: PropTypes.object.isRequired,
    onBookShelfChange: PropTypes.func
}

export default Book