var app = angular.module('JukeboxModule');


app.factory('SoundsServiceAsAdmin', ['$http', function($http) {
	
	return {
		deleteSongAsAdmin : function(successCallback, failureCallback) {
			$http({
				method:"DELETE",
				url: ""
			}).then(successCallback, failureCallback);
		},

		nextSongAsAdmin : function(successCallback, failureCallback) {
			$http({
				method:"POST",
				url: ""
			}).then(successCallback, failureCallback);
		},

		pauseSongAsAdmin : function(successCallback, failureCallback) {
			$http({
				method:"POST",
				url: ""
			}).then(successCallback, failureCallback);
		}
	}
}]);