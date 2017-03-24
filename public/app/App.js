import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import Pagination from './Pagination';

var App = React.createClass({

    render: function() {

        return (
            <div>
                <List data={window.data} auth={window.auth} user={window.user} />
                <Pagination path={window.path} page={window.page} />
                <div className="footer text-center">Full Stack React | <a href="https://github.com/Theeeus/nightlife-app" target="_blank">GitHub</a></div>
            </div>
        )
    }
})

ReactDOM.render(<App />, document.getElementById('app'));