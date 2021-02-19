import React from 'react';
import { getZillowPrice } from '../../services/api';
import { connect } from 'react-redux';

class CashFlowComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zillowURL: props.zillowURL,
            propertyTax: 0,
            homeInsurance: 0,
            maintPMT: 0,
            hoaPMT: 0,
            utilitiesPMT: 0,
            mgrPMT: 0,
            details: [
                ['Annual Property Tax %', 'propertyTax', (val) => (this.props.price * (Number(val) / 100)) / 12],
                ['Annual Home Insurance Payment', 'homeInsurance', (val) => Number(val) / 12],
                ['Annual Maintenance Payment', 'maintPMT', (val) => Number(val) / 12],
                ['Annual HOA Payment', 'hoaPMT', (val) => Number(val) / 12],
                ['Monthly Utilities Payment', 'utilitiesPMT', (val) => Number(val)],
                ['Monthly Property Manager Payment', 'mgrPMT', (val) => Number(val)]
            ]
        };
        this.onFormChange = this.onFormChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    async onFormChange(event) {
        if (event.target.name === "zillowURL") {
            this.setState({ "zillowURL": event.target.value });
            this.props.dispatch({ type: 'ZILLOW_PRICE_REQUESTED', "zillowURL": event.target.value });
        } else {
            this.setState({ [event.target.name]: event.target.value });
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
                                </form>
                            </div>
                        </div>

                        <hr></hr>

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Input Details</h5>
                                {this.state.details.map((detail) => {
                                    return (
                                        <div key={detail[0]} className="form-group">
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
                                <h3>Property Price: {this.props.price}</h3>
                                <hr></hr>
                                {
                                    !this.props.price &&
                                    <h5 className="card-title">Enter a URL to View Monthly Cash Flows...</h5>
                                }
                                {
                                    this.props.price &&
                                    <h5 className="card-title">Monthly Cash Flows:</h5>
                                }
                                <table className="table">
                                    {
                                        this.props.price &&
                                        <thead>
                                            <tr>
                                                <th scope="col">Category</th>
                                                <th scope="col">Value</th>
                                            </tr>
                                        </thead>
                                    }
                                    <tbody>

                                        {this.state.details.map((detail) => {
                                            return (
                                                this.props.price &&
                                                this.state[detail[1]] !== undefined &&
                                                <tr>
                                                    <td scope="row">{detail[0]}</td>
                                                    <td>{detail[2](this.state[detail[1]])}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    {
                                        this.props.price &&
                                        <thead>
                                            <tr>
                                                <th scope="col">Total Outflows</th>
                                                <th scope="col">{
                                                    this.state.details.map((detail) => {
                                                        console.log(detail)
                                                        console.log(detail[2](this.state[detail[1]]))
                                                        return detail[2](this.state[detail[1]]);
                                                    }).reduce((a, b) => a + b, 0)
                                                }</th>
                                            </tr>
                                        </thead>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { zillowURL, price } = state.cashflow;
    return { zillowURL, price };
};

export const CashFlow = connect(mapStateToProps)(CashFlowComponent);
