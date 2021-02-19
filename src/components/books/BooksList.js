import React from 'react';

class BooksList extends React.Component {

    constructor(props) {
        super(props);
        // this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(book) {
        this.props.handleDelete(book);
    }

    render() {
        const { books, handleDelete } = this.props;
        return (
            <ul className="list-group">
                {books.map(book => {
                    return (
                        <li key={book.title} className="Book list-group-item">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{book.title}</h5>
                                    <p className="card-text">{book.author}</p>
                                    <button className="btn btn-danger" onClick={() => this.handleDelete(book)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }

}

export default BooksList;
