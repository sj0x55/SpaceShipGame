requirejs.config({
	baseUrl: 'assets/js',
	paths: {
		app: './app',
		lib: './lib'
	}
});

require(['lib/JsShim', 'app/Main']);