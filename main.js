var Button = React.createClass({

	handleClick: function(event) {
		this.props.callback(event);
	},

	render: function() {
		var enabled = this.props.enabled;
		return (
			<button onClick={this.handleClick}>{this.props.value}</button>
		);
	}
});

var TextArea = React.createClass({
	handleChange : function(event) {
		this.props.callback(event.target.value);
	},
	render : function() {
		return (
			<textarea rows={this.props.rows} onChange={this.handleChange}>{this.props.value}</textarea>
		);
	}
});

var Markdown = React.createClass({
	render: function() {
		return(
			<div className={this.props.className} dangerouslySetInnerHTML={{__html: this.props.text}} />
		);
	}
});

var CommentBox = React.createClass({

	getInitialState: function() {
    	return {
    		text: 'Pending ...',
    		markdownTextTransformed: 'Pending ...',
    		preview: 'hide',
    		buttonPreviewText: 'Show Preview >>'
    	};
  	},

  	handleTextChange: function(text) {
  		this.setState({text: text});
  		if (this.state.preview == 'show') {
  			// (optim) process markdown text only if preview is active
  			this.setState({
				markdownTextTransformed : markdown.toHTML(text)
  			});  			
  		}
  	},

  	previewClicked: function(event) {
  		console.log(event);
  		if (this.state.preview == 'hide') {
	  		this.setState({
	  			preview: 'show',
	  			buttonPreviewText: '<< Hide Preview',
	  			markdownTextTransformed: markdown.toHTML(this.state.text)
	  		});
  		} else {
  			  	this.setState({
	  			preview: 'hide',
	  			buttonPreviewText: 'Show Preview >>'
	  		});
  		}
  	},

	render: function() {		
		return (
      		<div className="commentBox">
      			<h1>Markdown online editor</h1>
				<br />
      			<TextArea callback={this.handleTextChange} rows="10" />
        		<hr/>
        		<Button value={this.state.buttonPreviewText} callback={this.previewClicked} />
        		<br/>
        		<Markdown className={this.state.preview} text={this.state.markdownTextTransformed} />
      		</div>
    	);
	}
});

var List = React.createClass({
	render: function() {
		return (
			<div className="comList">
				CommentBox list for {this.props.arg0}!
			</div>
		);
	}
});

var Form = React.createClass({
	render: function() {
		return (
				<form class="form">
					<input type="text" placeholder="Enter release code" />
					<input type="submit" value="Print" />
				</form>
			);
	}
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('box')
);