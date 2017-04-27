
var JukeboxModule = angular.module('JukeboxModule', []);

JukeboxModule.controller('SoundsCtrl', ['$scope', '$interval', 'SoundsService', function ($scope, $interval, SoundsService) {

   	$scope.sounds;
      $scope.isAdmin = false;
      $scope.ipAdress;
      $scope.ipAdressTmp;
      $scope.isPlayingMusic;
      $scope.urlToAdd = "";
      
   	$scope.newSoundUrl = "";
      $scope.style = {
         "class"  : "black link big minus icon",
         "color"  : "white"
      }

      $scope.showVotes = function(sound) {
         sound.showVotes = true;
      }

      $scope.hideVotes = function(sound) {
         sound.showVotes = false;
      }

      $scope.togleSidebar = function() {
         $(".ui.sidebar").sidebar('toggle');
      }

      $scope.increasePointsOf = function(ipAdress, sound) {
         SoundsService.positiveVote(ipAdress, sound.title,
            function() {
               sound.points += 1;
            },
            function () {
               //error
            }
         );
      }

      $scope.decreasePointsOf = function(ipAdress, sound) {
         SoundsService.negativeVote(ipAdress, sound.title,
            function() {
               sound.points -= 1;
            },
            function () {
               // error
            }
         );
      }

      $scope.submitNewSound = function(ipAdress, urlYoutube) {
         $scope.urlToAdd = "";
         var tags = ["porn", "Winnie L'ourson"];
         SoundsService.addNewSong(ipAdress, urlYoutube, tags,
            function() {
               // Refresh playlist on dashboard
               $scope.getPlaylist();

            }, function() {
               // error
            })
      }



      $scope.changeStyle = function () {
         if ($scope.style["color"] == "black") {
            $scope.style = {
               "class"  : "black link big minus icon",
               "color"  : "white"
            }
         } else {
            $scope.style = {
               "class"  : "grey link plus big icon",
               "color"  : "black"
            }
         }
      }

      $scope.loadNewPlaylist = function() {
         $scope.ipAdress = $scope.ipAdressTmp;
         $scope.ipAdressTmp = "";
         $interval($scope.getPlaylist, 3000);
         
      }

//
// ADMIN FUNCTIONS
//


      $scope.logAsAdmin = function() {
            
      }

      $scope.nextSong = function() {
         if ($scope.isAdmin) {
            SoundsService.goToNextSong();
         }
      }

      $scope.playSong = function() {
         if ($scope.isAdmin) {
            SoundsService.playSong();
         }
      }

      $scope.pauseSong = function() {
         if ($scope.isAdmin) {
            SoundsService.pauseSong();
         }
      }

      $scope.deleteSongFromPlaylist = function(songTitle) {
         if ($scope.isAdmin) {
            SoundsService.deleteSong(songTitle);
         }      
      }


//
// PRIVATE FUNCTION
//

      $scope.getPlaylist = function() {
         $interval.cancel(global_currentSongTimeInterval);
         global_currentSongTimeInterval = $interval(function() {
            $scope.currentSongPlay.current_time++;
            var seconds = $scope.currentSongPlay.current_time % 60;
            if (seconds < 10) {
               seconds = "0" + seconds;
            }
            $scope.currentSongPlay.current_time_as_string = Math.floor($scope.currentSongPlay.current_time / 60) + ":" + seconds;
            $(".ui.tiny.inverted").progress({
               percent: $scope.currentSongPlay.current_time * 100 / $scope.currentSongPlay.length
            });
         }, 1000);

         SoundsService.getPlaylist(
            $scope.ipAdress,
            function (data) {

               //get song in playlist;
               $scope.sounds = [];
               for (var i = 0; i < data.data.playlist.length; i++) {
                  var song = {};
                  song["title"] = data.data.playlist[i].title;
                  song["votes"] = data.data.playlist[i].score;
                  song["showVotes"] = false;
                  $scope.sounds.push(song);
               }
   
               // get song which is currently playing
               if (data.data.first_song.length > 0) {
                  $scope.currentSongPlay = data.data.first_song
                  var seconds = $scope.currentSongPlay.current_time % 60;
                  if (seconds < 10) {
                     seconds = "0" + seconds;
                  }
                  $scope.currentSongPlay.current_time_as_string = Math.floor($scope.currentSongPlay.current_time / 60) + ":" + seconds;
                  seconds = $scope.currentSongPlay.length % 60
                  if (seconds < 10) {
                     seconds = "0" + seconds;
                  }
                  $scope.currentSongPlay.length_as_string = Math.floor($scope.currentSongPlay.length / 60) + ":" + seconds;

               
               } else {
                  $scope.currentSongPlay = null;
               }
               
            },
            function () {
               // error
            }
         );
         if ($scope.currentSongPlay) {
            $scope.isPlayingMusic = true;
         }
      }

}]);