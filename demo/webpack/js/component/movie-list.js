/*
*movie-list组件由AMD+JSX语法编写
*/
var React = require('react');

var MovieComponent = require('./movie');

var MovieListComponent = React.createClass({
	getInitialState: function() {
		return {
			title: '我喜欢的电影',
			movies: []
		}
	},

	render: function() {
		var title = this.state.title,
			movies = this.props.movies;

		movies = movies.map(function(movie) {
			return(
				<MovieComponent movie = {movie} />
				)
		}.bind(this));

		return(
			<ul>{movies}</ul>
			)
	}
});

module.exports = MovieListComponent;