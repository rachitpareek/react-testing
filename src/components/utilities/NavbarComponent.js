import React from 'react';

class NavbarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            links: [
                ["Home", ""],
                ["Books List", "books"],
                ["Cash Flow", "cashflow"],
                ["Counter", "counter"]
            ]
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light mt-3">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {this.state.links.map(link => {
                            return (
                                <li key={link[1]} className="nav-item active">
                                    <a className="nav-link" href={link[1]}>{link[0]}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>

            </nav>
        );
    }

}

export default NavbarComponent;
