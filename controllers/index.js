new Vue({
	el: '#login',
	data: {},
	mounted: function() {
		mui.init();
		FastClick.attach(document.body);
	},
	methods: {
		onClickHelp() {
			mui.toast("你点击了帮助")
		},
		onClikLogin(){
			mui.openWindow({
				url:'views/main.html',
				id:'main'
			})
		}
	}
})