(function() {
	var layer_id = 'bilibili-quick-login',
			_callback;
	function isObject(obj) {
		return Object.prototype.toString.call(obj) === '[object Object]'
	}
	try {
		document.domain = 'bilibili.com'
	} catch (err) {}

	function getScript (url, cb) {
    var oScript = document.createElement('script')
    oScript.src = url
    document.getElementsByTagName('body')[0].appendChild(oScript)
    oScript.addEventListener('load', cb, false)
  }
	var quickLogin = undefined

	window.biliQuickLogin = function(callback, obj) {
		var url = 'https://account.bilibili.com/ajax/miniLogin/minilogin'
		if (obj && isObject(obj)) {
			var aTmp = []
			for (var i in obj) {
				aTmp.push(i + '=' + obj[i])
			}
			url = url + '?' + aTmp.join('&')
		}
		_callback = callback;
		if (isObject(obj) && obj.source && obj.source === 'cm') {
			var layer = document.createElement('iframe');
			layer.setAttribute('id', layer_id);
			layer.setAttribute('frameborder', 'no');
			layer.setAttribute('border', 0);
			layer.setAttribute('src', url);
			layer.style.position = 'fixed';
			layer.style.top = 0;
			layer.style.left = 0;
			layer.style.width = '100%';
			layer.style.height = '100%';
			layer.style.zIndex = 99999;
			document.body.appendChild(layer);
		} else {
			if (quickLogin) {
				quickLogin.showComponent()
			} else {
				if (window.MiniLogin) {
					quickLogin = new window.MiniLogin()
					quickLogin.showComponent()
					quickLogin.addEventListener('success', function() {
						if (typeof _callback == 'function') {
							_callback()
						} else {
							window.location.reload()
						}
					})
				} else {
					getScript('//s1.hdslb.com/bfs/seed/jinkela/short/mini-login/miniLogin.umd.min.js', function () {
						quickLogin = new window.MiniLogin()
						quickLogin.showComponent()
						quickLogin.addEventListener('success', function() {
							if (typeof _callback == 'function') {
								_callback()
							} else {
								window.location.reload()
							}
						})
					})
				}
			}
		}
	}

	window.onmessage = function(e) {
		e = e || window.event;
		switch(e.data) {
			case 'success': typeof _callback == 'function' && _callback();
			case 'close': var layer = document.getElementById(layer_id);
										layer.parentNode.removeChild(layer);
		}
	}

	if (window.reportConfig && window[reportConfig.msgObjects]) {
		window[reportConfig.msgObjects].miniOldInit = 'miniOldInit'
	}
})();