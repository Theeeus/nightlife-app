import React from 'react';

var SearchBar = React.createClass({
    render: function() {
        return (
            <form className="searchBar" action="/" method="post">
                <input className="searchInput" type="text" name="query" />
                <input className="searchSubmit" type="submit" value="Go" />
            </form>
        )
    }
})

export default SearchBar;