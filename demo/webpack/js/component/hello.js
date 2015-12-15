/*
*hello 组件采用ES6+JSX语法编写
*/

import React from 'recat';

class HelloComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {wording: 'hehehe'};
	}
	render() {
		return <div>{this.state.wording} {this.props.name}</div>
	}
}

export HelloComponent;