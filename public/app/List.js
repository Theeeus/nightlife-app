import React from 'react';

var List = React.createClass({
	
	render: function() {
        if (this.props.data) {
        var string = this.props.data;
        var updatedString = string.replace(/'/g, "\'");
        var updatedString = updatedString.replace(/\n/g, " ");
        var list = JSON.parse(updatedString);
		
		var listItems = list.map(function(listValue){
			return (
				<div className="result">
					<div className="imgCont pull-left">
						<img className="barImg" src={listValue.image_url} />
					</div>
					<div className="barInfo">
						<div className="title">
							<a className="barName" href={listValue.url} target="_blank">{listValue.name}</a>
							<p className="barReservations">Saved by {listValue.going} people</p>
							{ this.props.auth == 'false' ?
							<a className="goBtn2 btn btn-warning" href='/auth/facebook'>Save Bar</a> :
							listValue.enrolled.indexOf(this.props.user) !== -1 ?
							<form method="post" action="/unenroll">
								<input type="hidden" name="barID" value={listValue.id} />
								<input type="hidden" name="userID" value={this.props.user} />
								<input className="goingBtn btn btn-success" type="submit" value="Saved"/>
							</form> :
							<form method="post" action="/go">
								<input type="hidden" name="barID" value={listValue.id} />
								<input className="goBtn btn btn-warning" type="submit" value='Save Bar'/>
							</form>
							}
						</div>
						<p className="barRating">{listValue.rating} <img src={listValue.rating_img_url}/> <span className="hidden-xs">{listValue.review_count} reviews</span></p>
						<p className="barAddress">{listValue.address}</p>
						<p className="barSnippet">{listValue.snippet}</p>
					</div>
				</div>
			)
		},this);
		
            return <div className="container">{listItems}</div>
        
        } else {
            
            return <div className="blankResults"></div>
    } 
    }
})

export default List;