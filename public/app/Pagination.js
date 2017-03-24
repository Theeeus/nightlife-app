import React from 'react';

var Pagination = React.createClass({

    render: function() {
        return (
            <nav aria-label="Page navigation" className="offsetResults">
                <ul className="pagination">
                    <li className={this.props.page == '1' ? 'active' : ''}><a href={this.props.path + '/1'}>1</a></li>
                    <li className={this.props.page == '2' ? 'active' : ''}><a href={this.props.path + '/2'}>2</a></li>
                    <li className={this.props.page == '3' ? 'active' : ''}><a href={this.props.path + '/3'}>3</a></li>
                    <li className={this.props.page == '4' ? 'active' : ''}><a href={this.props.path + '/4'}>4</a></li>
                    <li className={this.props.page == '5' ? 'active' : ''}><a href={this.props.path + '/5'}>5</a></li>
                </ul>
            </nav>
        )
    }
})

export default Pagination;