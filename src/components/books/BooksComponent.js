import '../../App.css';
import React from 'react';
import BooksList from './BooksList.js';
import { getData } from '../../services/api';

class BooksComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formTitle: '',
            formAuthor: '',
            bookCount: 5,
            books: []
        };
        this.onFormChange = this.onFormChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.getBookData = this.getBookData.bind(this);
    }

    componentDidMount() {
        this.getBookData(undefined, this.state.bookCount);
    }

    getBookData(e, count) {
        if (e) {
            e.preventDefault();
        }
        count = count === undefined ? e.target.bookCount.value : count;
        getData(`https://fakerapi.it/api/v1/books?_quantity=${count}`).then(data => {
            this.setState({ books: data.data });
        });
    }

    onFormChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onFormSubmit(e) {
        e.preventDefault();
        let newBooks = this.state.books.concat({ title: this.state.formTitle, author: this.state.formAuthor });
        this.setState({ books: newBooks });
    }

    handleDelete(bookToDelete) {
        let newBooks = this.state.books.filter(book => book.title !== bookToDelete.title);
        this.setState({ books: newBooks });
    }

    render() {
        return (
            <div>

                <div className="jumbotron">
                    <h1 >Welcome to this list of books!</h1>
                    <h4>Refresh random books or enter your own below.</h4>
                </div>

                <div className="row">
                    <div className="col-4">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Refresh Books</h5>
                                <form className="justify-content-center" onSubmit={this.getBookData}>
                                    <div className="form-group">
                                        <label>
                                            Count:
  <input className="form-control text-center" type="text" name="bookCount" value={this.state.bookCount} onChange={this.onFormChange} />
                                        </label>
                                    </div>
                                    <input type="submit" className="btn btn-primary" value="Refresh" />
                                </form>
                            </div>
                        </div>

                        <hr></hr>

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Input a Book</h5>
                                <form className="justify-content-center" onSubmit={this.onFormSubmit}>
                                    <div className="form-group">
                                        <label>
                                            Title:
  <input className="form-control" type="text" name="formTitle" value={this.state.formTitle} onChange={this.onFormChange} />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Author:
  <input className="form-control" type="text" name="formAuthor" value={this.state.formAuthor} onChange={this.onFormChange} />
                                        </label>
                                    </div>
                                    <input type="submit" className="btn btn-primary" value="Add" />
                                </form>
                            </div>
                        </div>

                    </div>

                    <div className="col-8">
                        {this.state.books.length == 0 &&
                            <h2>Loading Books...</h2>
                        }
                        <ul className="list-group">
                            <BooksList
                                books={this.state.books}
                                handleDelete={this.handleDelete}
                            />
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}

export default BooksComponent;
