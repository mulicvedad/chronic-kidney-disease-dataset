export default class BaseService {
	static $inject = ['$http', 'ENV'];

	constructor($http, ENV) {
		this.$http = $http;
		this.ENV = ENV;
	}

	absUrlPath(url) {
		return this.ENV.BACKEND_BASE_URL + url;
	}

	get(url) {
		return this.$http.get(this.absUrlPath(url));
	}

}