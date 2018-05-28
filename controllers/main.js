var _app = new Vue({
	el: '#main',
	data: {
		noticeData: [],
		appVersion: '',
		title: '某城市废弃物管理综合评估系统',
		isTop: false
	},
	mounted() {
		var _this = this;
		mui.init({
			gestureConfig: {
				tap: true, //默认为true
				doubletap: true, //默认为false
				longtap: true, //默认为false
				swipe: true, //默认为true
				drag: true, //默认为true
				hold: true, //默认为false，不监听
				release: true //默认为false，不监听
			},
			pullRefresh: {
				container: '#pullrefresh',
				down: {
					style: 'circle',
					auto: true,
					height: 50, //可选,默认50.触发下拉刷新拖动距离,
					contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
					contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
					contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
					callback: pulldownRefresh
				}
			}
		})
		/*mui('.mui-scroll-wrapper').scroll({
			indicators: true //是否显示滚动条
		});*/
		this.$nextTick(function() {
			var _height = document.documentElement.clientHeight - 180 + 'px;';
			document.getElementById('pullrefresh').style.height = _height;
			document.getElementById('pullrefresh').style = 'margin-top:60%';
		});

		if(mui.os.plus) {
			mui.plusReady(function() {
				//自动更新
				mui.getJSON("../manifest.json", null, function(data) {
					_this.appVersion = data.version.name;
				});
			});
		}
		/*var contentWebview = null;
		//监听标题栏的双击事件
		document.querySelector('header').addEventListener('doubletap', function() {
			if(contentWebview == null) {
				contentWebview = plus.webview.currentWebview().children()[0];
			}
			//内容区滚动到顶部
			contentWebview.evalJS("mui('#pullrefresh').pullRefresh().scrollTo(0,0,100)");
		});*/
		document.getElementById('pullrefresh').addEventListener('swipeup', function(e) {
			console.log(e.detail.center.y);
			if(e.detail.center.y > 440) {
				_this.isTop = true
			}
		})
		/*document.getElementById('pullrefresh').addEventListener('release', function(e) {
			console.log(e.detail.center.y);
			if(e.detail.center.y > 440) {
				_this.isTop = true
			}
		})
		document.getElementById('pullrefresh').addEventListener('release', function(e) {
			console.log(e.detail.center.y);
			if(e.detail.center.y < 440) {
				_this.isTop = false
			}
		})*/
		document.getElementById('pullrefresh').addEventListener('swipedown', function(e) {
			console.log("211111"+e.detail.center.y);
			if(e.detail.center.y < 500) {
				_this.isTop = false
			}
		})
		
	},
	methods: {
		onClickGoInfo() {
			mui.openWindow({
				url: 'inforCollection.html',
				id: 'infoCollection'
			})
		},
		onClickGoCollected() {
			mui.openWindow({
				url: 'collected.html',
				id: 'collected'
			})
		},
		pullUp() {
			var count = 0;
			setTimeout(function() {
				mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2));
			}, 1500);
		},
		pullDown() {
			var _this = this;
			this.$nextTick(function() {

			});
			setTimeout(function() {
				_this.addData();
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				mui.toast("为你推荐了3篇文章");
			}, 1500);
		},
		addData() {
			var _this = this;
			var cells = document.body.querySelectorAll('.cell-item');
			console.log(cells);
			for(var i = cells.length, len = i + 3; i < len; i++) {
				_this.noticeData.push({
					id: i,
					content: '公告' + (i + 1) + '看洪都拉斯计划的垃圾狄拉克世界大力士看加拉速度加快',
					releaseDate: '2018-05-28'
				})
			}
		},
		onGoTop() {
			//滚动到顶部
			mui('#pullrefresh').pullRefresh().scrollTo(0, 0, 100);
			this.isTop = false
		}
	}
});

function pullupRefresh() {
	_app.pullUp();
}
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	_app.pullDown();
}