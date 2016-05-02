var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var TrackConstants = require('../constants/trackConstants.js');


var PlayStore = new Store(Dispatcher);

var _nowPlaying = null;
var _isPlaying = false;
var _queue = [];

PlayStore.currentTrack = function() {
  return _nowPlaying;
};

PlayStore.isPlaying = function() {
  return _isPlaying;
};

PlayStore.queue = function() {
  return _queue;
};

var playCurrentTrack = function(track) {
  if (_nowPlaying !== track) {
    _nowPlaying = track;
  }
  _isPlaying = true;
};

var pauseCurrentTrack = function() {
  _isPlaying = false;
};

PlayStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case TrackConstants.PLAY_TRACK:
      playCurrentTrack(payload.track);
      break;
    case TrackConstants.PAUSE_TRACK:
      pauseCurrentTrack();
      break;
  }
  PlayStore.__emitChange();
};

module.exports = PlayStore;
