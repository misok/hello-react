/*
 *@author: nada
 *
 *--------大概一个react组件包括：模板HTML,交互JS，样式CSS.而在这里，HTML与JS使用JSX结合在一起了。
 *--------第一次渲染真实DOM时使用getInitialState() 返回的数据,用this,state访问
 *--------第二次更新真实DOM时使用setState() 设置的数据
 *--------绑定事件时，我们可以使用ref=“name”属性对一个DOM节点进行标记，同时可以通过React.findDOMNode(this.refs.name)获取到这个节点的原生DOM
 *--------一个组件就包含了 JSX 模板、数据维护、事件绑定的话，代码量已经够多了，这时候可以采用 AMD/CMD 的方式，将组件进行更细粒度的划分，可以以文件即组件的方式来编写
 *--------在 React 中，数据流是单向的，且组件之间可以嵌套，我们可以通过对最顶层组件传递属性方式，向下层组件传送数据
 *-------------嵌套组件间，使用 this.props 属性向下传递数据
 *-------------独立组件之间，自行维护数据则需要自行维护一个全局数据存储，或者使用发布订阅地方式通知数据的更新
 */
 var DemoComponent = React.createClass({
 	//初始化数据
 	getInitialState: function() {
 		// return {
 		// 	title: '我喜欢的电影',
 		// 	movies: [
 		// 		{
 		// 			id: 1,
 		// 			name: '告白',
 		// 			date: 2000
 		// 		},
 		// 		{
 		// 			id: 2,
 		// 			name: '勇敢的心',
 		// 			date: 2005
 		// 		}
 		// 	]
 		// }
 		//使用this.props从外部获取组件数据
 		movies = this.props.movies;
 		return {
 			title: '我喜欢的电影',
 			// 注意这里将 外部传入的数据赋值给了 this.state
 			movies: movies
 		}
 	},

 	//使用 componentDidMount 在组件初始化后执行一些操作
 	componentDidMount: function() {
 		// 拉取远程数据
        // 开启假数据服务器：
        // cd fake-server && npm install && node index.js
        this.fetchData();
 	},
 	//使用自定义方法模拟从服务器拉取数据
 	fetchData: function() {
 		var self = this;
 		var url = '../../fake-data/movies.json';
 		//发起ajax获取到数据后调用setState更新组件的数据，顺便，我们来模拟一下网络延迟
 		$.getJSON(url,function(movies) {
 			setTimeout(function() {
 				self.setState({
 					movies: movies
 				})
 			},2000)
 		});
 	},

     onRemove: function(movie) {
         var id = movie.id;
         var movies = this.state.movies;
         var len = movies.length;
         var index = -1;

         for(var i = 0; i < len; i++) {
             var _movie = movies[i];
             if(_movie.id === id) {
                 index = i;
                 break;
             }
         }
         if(index > -1) {
             movies.splice(index,1);
             this.setState({
                 movies: movies
             });
         }
     },
 	onAdd: function(e) {
 		e.preventDefault();
 		var refs = this.refs,
 			refName = React.findDOMNode(refs.name),
 			refDate = React.findDOMNode(refs.date);

 		if(refName == ''){
 			alert("请输入姓名");
 		}else if(refDate == '') {
 			alert("请输入日期");
 		}

 		var movie = {
 			id: Date.now(),
 			name: refName.value,
 			date: refDate.value
 		}

 		var movies = this.state.movies;
 		movies.push(movie);
 		this.setState(movies);

 		refName.value = '';
 		refDate.value = '';
 	},
 	//render自动渲染DOM
 	render: function() {
 		var title = this.state.title;
 		var movies = this.state.movies.map(function(movie) {
 			return (
 				<LiWrapper movie={movie} removeItem = {this.onRemove}/>
 				)
 			{/*return (
 				<li className="movie-item" key={movie.id}>
 					<span  className="movie-name" >{movie.name}</span>-
 					<span className="movie-date">{movie.date}</span>
 					<a href="#" onClick={this.onRemove.bind(null,movie)}>删除 </a>
 				</li>
 				)*/}
 		}.bind(this)); //这里重新修正了上下文

 		return (
 			<div className = "component-hello">
 				<h1 className="title">hello react</h1>
 				<p className="desc">react explore</p>

 				<div className="hello-movies">
 					<p2>{title}</p2>
 					<form onSubmit={this.onAdd}>
 						{/*这样写注释，使用ref指定属性*/}
 						<input type="text" ref="name" placeholder="输入你喜欢的电影"/>
 						<input type="text" ref="date" placeholder="上映时间"/>
 						<input type="submit" value="提交" />
 					</form>
 					<ul>{movies}</ul>
 				</div>
 			</div>
 			)
 	},
 });
var LiWrapper = React.createClass({
	render: function() {
		// 使用 this.props 获得传入组件的数据
		var movie = this.props.movie;
		return (
			<li className="movie-item" key={movie.id}>
 					<span  className="movie-name" >{movie.name}</span>-
 					<span className="movie-date">{movie.date}</span>
 					<a href="#" onClick={this.props.removeItem.bind(null,movie)}>删除 </a>
 				</li>
			)
	}
})
var movies = [
 				{
 					id: 1,
 					name: '告白',
 					date: 2000
 				},
 				{
 					id: 2,
 					name: '勇敢的心',
 					date: 2005
 				}
 			]
 React.render(<DemoComponent  movies={movies}/>,document.getElementById('demo'));