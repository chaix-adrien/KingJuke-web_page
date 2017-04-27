var app = angular.module('JukeboxModule');


app.factory('SoundsService', ['$http', function($http) {
	
	return {
		
		getPlaylist: function (ipAdress, successCallback, failureCallback) {
			return $http({
				method: "GET",
				url: "http://"+ ipAdress + ":9090/playlist",
				headers: {
					'Accept': 'text/plain'
				}
			}).then(successCallback, failureCallback);
		},

		addNewSong: function(ipAdress, urlNewSong, tags, successCallback, failureCallback) {
			return $http({
				method: "POST",
				url: "http://"+ ipAdress + ":9090/playlist",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				},
				data: JSON.stringify({
					url: urlNewSong,
					tags: tags
				})
			}).then(successCallback, failureCallback);
		},

		positiveVote: function(ipAdress, title, successCallback, failureCallback) {
			return $http({
				method: "POST",
				url: "http://"+ ipAdress + ":9090/up/" + title,
				headers: {
					'Accept': 'text/plain'
				}
			})
		},

		negativeVote: function(ipAdress, title, successCallback, failureCallback) {
			return $http({
				method: "POST",
				url: "http://"+ ipAdress + ":9090/down/" + title,
				headers: {
					'Accept': 'text/plain'
				}
			})
		},

		removeVoteToSong: function(ipAdress, title, successCallback, failureCallback) {
			return $http({
				method: "POST",
				url: "http://"+ ipAdress + ":9090/playlist",
				headers: {
					'Accept': 'text/plain'
				}
			})
		}
	}
}]);
