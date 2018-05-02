
var JukeboxModule = angular.module('JukeboxModule', []);

JukeboxModule.controller('SoundsCtrl', ['$scope', '$interval', 'SoundsService', function ($scope, $interval, SoundsService) {

   // var used for get input and try to connect with this parameters
   $scope.addressToConnect = {
      ip: null,
      port: null
   };

   $scope.currentSong = null;
   $scope.isConnected = false;
   $scope.songsList = [];
   
   $scope.address = {
      ip: null,
      port: null
   };

   var intervalUpdatePlaylist = null;
   var intervalUpdateCurrentSongSeconds = null;

   $scope.getPlaylistFirstTime = function(ipaddr, port) {
      SoundsService.getPlaylist(
         ipaddr,
         port,
         function(resp) {
            $scope.address.ip = ipaddr;
            $scope.address.port = port;
            $scope.isConnected = true;

            $scope.songsList = resp.data.playlist;
            $scope.currentSong = resp.data.first_song;

            if ($scope.currentSong != undefined && $scope.currentSong.current_time != undefined && $scope.currentSong.current_time != null) {
               $('#timeBar').progress({
                  duration:$scope.currentSong.current_time,
                  total:$scope.currentSong.current_time,
                  value:0
               });
            }
            isSuccessfullyConnected();
         },
         function() {
            $scope.isConnected = false;
         }
      );
   }

   $scope.getPlaylist = function(ipaddr, port) {
      
      SoundsService.getPlaylist(
         ipaddr,
         port,
         function(resp) {
            $scope.songsList = resp.data.playlist;
            $scope.currentSong = resp.data.first_song;

            if ($scope.currentSong != undefined && $scope.currentSong.current_time != undefined && $scope.currentSong.current_time != null) {
               $('#timeBar').progress({
                  duration:$scope.currentSong.current_time,
                  total:$scope.currentSong.length,
                  value:$scope.currentSong.current_time
               });
            }
         },
         null
      );
   }

   $scope.connectToServer = function(ipaddr, port) {
      if (intervalUpdatePlaylist != null) {
         $interval.cancel(intervalUpdatePlaylist);
      }
      if (intervalUpdateCurrentSongSeconds != null) {
         $interval.cancel(intervalUpdateCurrentSongSeconds);
      }
      $scope.getPlaylistFirstTime(ipaddr, port);
   };

   $scope.sendPositiveVote = function(song) {
      SoundsService.positiveVote(
         $scope.address.ip,
         $scope.address.port,
         song.title,
         function () {
            song.score += 1;
         },
         function () {
            
         }
      );
   };

   $scope.sendNegativeVote = function(song) {
      SoundsService.negativeVote(
         $scope.address.ip,
         $scope.address.port,
         song.title,
         function () {
            song.score -= 1;
         },
         function () {
            
         }
      );
   };

   $scope.postSong = function(urlSong) {
      var tags = [];
      $scope.url = "";
      SoundsService.addNewSong(
         $scope.address.ip,
         $scope.address.port, 
         urlSong, 
         tags,
         null,
         function() {
            
         }
      );
   };

   //
   // Private functions
   //
   function increaseCurrentSongSeconds(valueToAdd) {
      if ($scope.currentSong.playing)
      {
         $scope.currentSong.current_time += valueToAdd;
         $('#timeBar').progress('increment');
      }
   }

   function isSuccessfullyConnected() {
      // if user is connected to a server, the playlist is regulary updated
      $('.ui.basic.modal').modal('hide');
      intervalUpdatePlaylist = $interval($scope.getPlaylist, 3000, 0, true, $scope.address.ip, $scope.address.port);
      if ($scope.currentSong != null && $scope.currentSong.current_time != null) {
         intervalUpdateCurrentSongSeconds = $interval(increaseCurrentSongSeconds, 1000, 0, true, 1);
      }
   }

}]);