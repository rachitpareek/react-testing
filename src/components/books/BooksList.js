import React from 'react';
import Book from './Book.js';

class BooksList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { books, handleDelete } = this.props;
        return (
            <ul className="list-group">
                {books.map(book => {
                    return (
                        <Book
                            key={book.title}
                            book={book}
                            onClick={handleDelete}
                        />
                    );
                })}
            </ul>
        );
    }

}

export default BooksList;
