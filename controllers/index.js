new Vue({
	el: '#login',
	data: {},
	mounted: function() {
		mui.init();
		FastClick.attach(document.body);
		if(mui.os.plus) {
			mui.plusReady(function() {
				//自动更新
				mui.getJSON("manifest.json", null, function(data) {
					//update(data.version.name);
				});
			});
		}
	},
	methods: {
		onClickHelp() {
			mui.toast("你点击了帮助")
		},
		onClikLogin() {
			mui.openWindow({
				url: 'views/main.html',
				id: 'main'
			})
		}
	}
})