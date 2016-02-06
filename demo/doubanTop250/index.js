/**
 * Created by misok on 16/1/14.
 */

var HeaderComponent = React.createClass({
    getInitialState: function() {
        return {
            title: '豆瓣电影'
        }
    },

    render: function() {
        var title = this.state.title;
        var headerStyle = {
            width: '100%',
            height: '41.5px',
            lineHeight: '41.5px',
            textAlign: 'center',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#036bc4',
            position: 'fixed',
            left: '0',
            top: '0',
            marginBottom: '10px'

        };

        return (
            <div className = 'header' style={headerStyle}>{title}</div>
        )
    }

});


var MovieItemComponent = React.createClass({

    render: function() {
        var movie = this.props.movie;

        return (
           <div className="movieItem" >
                <a href={movie.url} >
                    <div className="body">
                        <div className="img" ><img src={movie.picture}/></div>
                        <div className="info">
                            <div className="name">
                                <span className="num">{movie.number.substr(3)}</span>
                                <span className="title">{movie.name}</span>
                            </div>
                            <div className="actors">
                                <span className="actors">{"导演：" + movie.director + " " + "主演：" +  movie.actor}</span>
                            </div>
                            <div className="score">
                                <StarsComponent  score={movie.score}/>
                                <span className="rate">{movie.score}</span>
                                <span className="rateNum">{movie.scoreNum + "人看过"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="footer">{movie.say}</div>
                </a>
           </div>
        )
    }
});

var LoadingHintComponent = React.createClass({
    render: function() {
        return (
            <div className = "loading" ref="load">加载中...</div>
        )
    }
});

var DoubanTopComponent = React.createClass({
    getInitialState: function() {
        movies = this.props.movies;

        return {
            title: '豆瓣电影TOP250',
            movies: movies,
            page: 1,
            pageCount: 10,
            ajaxLoading: false
        }
    },

    //使用 componentDidMount 在组件初始化后执行一些操作
    componentDidMount: function() {
        // 拉取远程数据
        // 开启假数据服务器：
        // cd fake-server && npm install && node index.js
        this.fetchData(this.state.page);
    },

    //使用自定义方法模拟从服务器拉取数据
    fetchData: function(page) {
        if(page > this.state.pageCount) {
            return;
        }
        if (this.state.ajaxLoading) {
            return;
        }
        this.state.ajaxLoading = true;
        var self = this;
        var url = '../../fake-data/result.json';
        //发起ajax获取到数据后调用setState更新组件的数据，顺便，我们来模拟一下网络延迟
        $.getJSON(url,function(movies) {
            self.state.ajaxLoading = false;
            setTimeout(function() {
                self.setState({
                    movies: movies.slice(0,page*25-1)
                })
            },2000)
            self.scrollMore();
            self.state.page ++;
        });
    },

    scrollMore: function() {
        var self = this;
        $(window).on('scroll', function(e) {
            var pageY = $('body').height();
            var scrollY = window.scrollY;
            var winY = window.innerHeight;
            if (pageY < scrollY + $('.loading').height() + winY) {
                self.fetchData(self.state.page);
            }
        });
    },

    render: function() {

        var movies = this.state.movies.map(function(movie) {
            return (
                <MovieItemComponent movie={movie} />
            )

        }.bind(this)); //这里重新修正了上下文

        //if (this.state.page > this.state.pageCount) {
        //    $(React.findDOMNode(this.refs.load)).hide();
        //    $(window).off('scroll');
        //} else {
        //    $(React.findDOMNode(this.refs.load)).show();
        //}
        return (
            <div className = "doubanTop">
                <HeaderComponent />
                <div className="title">
                    <span className="text">{this.state.title}</span>
                    <span className="dropdowm" ></span>
                </div>
                {movies}
                <LoadingHintComponent />
            </div>
        )
        if (this.state.page > this.state.pageCount) {
            React.findDOMNode(this.refs.load).style.dispaly = "none";
            $(window).off('scroll');
        } else {
            React.findDOMNode(this.refs.load).style.display = "block";
        }
    }
});

var StarsComponent = React.createClass({
   render: function() {
       var score = 5;
       if(parseInt(this.props.score) <= 9) {
           score = 4;
       }
       if(score === 5) {
            return(
                <span className = "stars">
                    <span className = "full-star"></span>
                    <span className = "full-star"></span>
                    <span className = "full-star"></span>
                    <span className = "full-star"></span>
                    <span className = "full-star"></span>
                </span>
            )
       }else{
           return(
               <span className = "stars">
                   <span className = "full-star"></span>
                   <span className = "full-star"></span>
                   <span className = "full-star"></span>
                   <span className = "full-star"></span>
                   <span className = "half-star"></span>
               </span>
           )
       }
   }
});

var movies = [
    {
        picture: "http://img3.douban.com/view/movie_poster_cover/ipst/public/p480747492.jpg",
        num: 1,
        name: "肖申克的救赎 / The Shawshank Redemption / 月黑高飞（港）/ 刺激1995（台）",
        actor: "导演：福兰特德拉邦特 主演：蒂姆罗宾斯 导演：福兰特德拉邦特 主演：蒂姆罗宾斯",
        director: '主演：蒂姆罗宾斯',
        score: "9.6",
        scoreNum: '667842',
        say: "希望让人自由",
        number: 'NO.1'

    },
    {
        picture: "http://img3.douban.com/view/movie_poster_cover/ipst/public/p480747492.jpg",
        num: 1,
        name: "肖申克的救赎 / The Shawshank Redemption / 月黑高飞（港）/ 刺激1995（台）",
        actor: "导演：福兰特德拉邦特 主演：蒂姆罗宾斯 导演：福兰特德拉邦特 主演：蒂姆罗宾斯",
        director: '主演：蒂姆罗宾',
        score: "9.6",
        scoreNum: '667842',
        say: "希望让人自由",
        number: 'NO.2'

        }
];
React.render(<DoubanTopComponent  movies={movies} />,document.getElementById('container'));