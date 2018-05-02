var app = angular.module('JukeboxModule');


app.factory('SoundsService', ['$http', function($http) {
	
	return {
		
		getPlaylist: function (ipAdress, port, successCallback, failureCallback) {
			var vurl = "http://"+ ipAdress + ":" + port + "/playlist";
			return $http({
				url: vurl,
				method: 'GET',
				headers: {
                    'Content-Type': 'application/json; charset=utf-8'
        		}
			}).then(successCallback, failureCallback);
		},

		addNewSong: function(ipAdress, port, urlNewSong, tags, successCallback, failureCallback) {
			return $http({
				method: "POST",
				url: "http://"+ ipAdress + ":" + port + "/playlist",
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

		positiveVote: function(ipAdress, port, title, successCallback, failureCallback) {
			return $http({
				method: "POST",
				url: "http://"+ ipAdress + ":" + port + "/up/" + title,
				headers: {
					'Accept': 'text/plain'
				}
			})
		},

		negativeVote: function(ipAdress, port, title, successCallback, failureCallback) {
			return $http({
				method: "POST",
				url: "http://"+ ipAdress + ":" + port + "/down/" + title,
				headers: {
					'Accept': 'text/plain'
				}
			})
		},

		removeVoteToSong: function(ipAdress, port, title, successCallback, failureCallback) {
			return $http({
				method: "POST",
				url: "http://"+ ipAdress + ":" + port + "/playlist",
				headers: {
					'Accept': 'text/plain'
				}
			})
		}
	}
}]);
