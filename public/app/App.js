import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';
import List from './List';

var App = React.createClass({

    render: function() {

        return (
            <div>
                <List data={window.data} auth={window.auth} user={window.user} />
                <p className="text-center">Full Stack React</p>
            </div>
        )
    }
})

ReactDOM.render(<App />, document.getElementById('app'));