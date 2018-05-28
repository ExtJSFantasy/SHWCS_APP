var _app = new Vue({
	el: '#main',
	data: {
		noticeData: [{
			id: 1,
			content: '公告1看洪都拉斯计划的垃圾狄拉克世界大力士看加拉速度加快',
			releaseDate: '2018-05-28'
		}],
		appVersion: '',
		title: '上海市废弃物管理综合评估系统'
	},
	mounted() {
		var _this = this;
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				down: {
					style: 'circle',
					callback: pulldownRefresh
				}
			}
		})
		mui('.mui-scroll-wrapper').scroll({
			indicators: true //是否显示滚动条
		});
		//var _height = document.documentElement.clientHeight - 180 + 'px;';
		document.getElementById('pullrefresh').style.height = '68%';
		document.getElementById('pullrefresh').style = 'margin-top:' + 240 + 'px';
		if(mui.os.plus) {
			mui.plusReady(function() {
				//自动更新
				mui.getJSON("../manifest.json", null, function(data) {
					_this.appVersion = data.version.name;
				});
			});
		}
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
			setTimeout(function() {
				_this.addData();
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				mui.toast("为你推荐了5篇文章");
			}, 1500);
		},
		addData() {
			var _this = this;
			for(var i = 1, len = 5; i < len; i++) {
				_this.noticeData.push({
					id: i,
					content: '公告1看洪都拉斯计划的垃圾狄拉克世界大力士看加拉速度加快',
					releaseDate: '2018-05-28'
				})
			}
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