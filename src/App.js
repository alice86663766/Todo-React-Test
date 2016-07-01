import React from 'react';
import {render} from 'react-dom';

var TodoItem = React.createClass({
	handleDelete: function() {
		var index = parseInt(this.props.index);
		this.props.deleteItem(index);
	},
	handleModify: function(e) {
		//console.log("hi");
		e.preventDefault();
		var index = parseInt(this.props.index);
		var text = document.getElementById("updatedText").value;
		this.props.modifyItem(index, text);
		document.getElementById("updatedText").value = '';
		//console.log(document.getElementById("updatedText").value);
	},
	render: function() {
		return <li>{this.props.item.text}
	    	<button type="button" onClick={this.handleDelete}>Delete</button>
	    	<form onSubmit={this.handleModify}>
				<input id="updatedText" type="text" 
					placeholder="Modify text"/>
	    		<button type="submit">Modify</button>
			</form>
	    	</li>;
	}
});

var TodoList = React.createClass({
	render: function() {
		var createItems = this.props.items.map((item, index) => {
			return (<TodoItem deleteItem={this.props.deleteItem} modifyItem={this.props.modifyItem} key={index} index={index} item={item} />);
		});
		return <ol>{createItems}</ol>
	    //return <ul>{this.props.items.map(createItem)}</ul>;
  	}
});

var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  deleteItem: function(index) {
  	var items = this.state.items;
  	//console.log(items);
  	items.splice(index, 1);
  	this.setState({items:items});
  },
  modifyItem: function(index, text) {
  	var items = this.state.items;
  	items[index].text = text;
  	this.setState({items:items});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>Todo List</h3>
        <TodoList deleteItem={this.deleteItem} modifyItem={this.modifyItem} items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});

render(<TodoApp />, document.getElementById('app'));