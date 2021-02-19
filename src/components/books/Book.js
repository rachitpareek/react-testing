import React from 'react';

class Book extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onClick(this.props.book);
    }

    render() {
        const { title, author, image } = this.props.book;
        return (
            <li className="Book list-group-item">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{author}</p>
                        <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                    </div>
                </div>
            </li>
        );
    }

}

export default Book;
