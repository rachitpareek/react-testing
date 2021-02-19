import React from 'react';
import BooksList from '../books/BooksList.js';
import { getZillowPrice } from '../../services/api';

class CashFlowComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zillowURL: undefined,
            propertyPrice: undefined,
            propertyTax: undefined,
            homeInsurance: undefined,
            maintPMT: undefined,
            hoaPMT: undefined,
            utilitiesPMT: undefined,
            mgrPMT: undefined,
            details: [
                ['Annual Property Tax %', 'propertyTax', (val) => this.state.propertyPrice * (val / 100)],
                ['Annual Home Insurance Payment', 'homeInsurance', (val) => val / 12],
                ['Annual Maintenance Payment', 'maintPMT', (val) => val / 12],
                ['Annual HOA Payment', 'hoaPMT', (val) => val / 12],
                ['Monthly Utilities Payment', 'utilitiesPMT', (val) => this.state.propertyPrice * val],
                ['Monthly Property Manager Payment', 'mgrPMT', (val) => this.state.propertyPrice * val]
            ]
        };
        this.onFormChange = this.onFormChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.getZillowPropertyPrice = this.getZillowPropertyPrice.bind(this);
    }

    async getZillowPropertyPrice(e) {
        this.setState({ propertyPrice: "Loading..." });
        e.preventDefault();
        var data = await getZillowPrice(e.target.zillowURL.value);
        var price = await data.text().then(text => {
            text = text.replaceAll(',', '');
            text = text.slice(text.indexOf("$"));
            text = text.replaceAll('$', '');
            var numbers = text.match(/\d+/g);
            var price = Number(numbers[0]);
            return price;
        });
        this.setState({ propertyPrice: price });
    }

    onFormChange(event) {
        if (event.target.name === "zillowURL") {
            this.setState({ [event.target.name]: event.target.value });
        } else {
            this.setState({ [event.target.name]: Number(event.target.value) });
        }
    }

    onFormSubmit(e) {
        e.preventDefault();
        let newBooks = this.state.books.concat({ title: this.state.formTitle, author: this.state.formAuthor });
        this.setState({ books: newBooks });
    }

    render() {
        return (
            <div>

                <div className="jumbotron">
                    <h1 >Welcome to the Rental Cash Flow Calculator!</h1>
                    <h4>Enter some simple assumptions below and see your potential rental property cash flow.</h4>
                </div>

                <div className="row">
                    <div className="col-4">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Zillow Property URL</h5>
                                <form className="justify-content-center" onSubmit={this.getZillowPropertyPrice}>
                                    <div className="form-group">
                                        <label>
                                            Enter a Zillow property URL to extract its price:
  <input className="form-control text-center" type="text" name="zillowURL" value={this.state.zillowURL} onChange={this.onFormChange} />
                                        </label>
                                    </div>
                                    <input type="submit" className="btn btn-primary" value="Extract" />
                                </form>
                            </div>
                        </div>

                        <hr></hr>

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Input Details</h5>
                                {this.state.details.map((detail) => {
                                    return (
                                        <div className="form-group">
                                            <label>
                                                {detail[0]}
                                                <input className="form-control text-center" type="text" name={detail[1]} value={this.state[detail[1]]} onChange={this.onFormChange} />
                                            </label>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>

                    </div>

                    <div className="col-8">
                        <div className="card">
                            <div className="card-body">
                                <h3>Property Price: {this.state.propertyPrice}</h3>
                                <hr></hr>
                                <h5 className="card-title">Monthly Cash Flows</h5>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Category</th>
                                            <th scope="col">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.details.map((detail) => {
                                            return (
                                                this.state.propertyPrice &&
                                                this.state[detail[1]] &&
                                                <tr>
                                                    <td scope="row">{detail[0]}</td>
                                                    <td>{detail[2](this.state[detail[1]])}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default CashFlowComponent;
