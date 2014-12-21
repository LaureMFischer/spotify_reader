App = Ember.Application.create();

App.Router.map(function() {
  this.resource('albums');
});

App.AlbumsRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON('https://api.spotify.com/v1/artists/36QJpDe2go2KgaRleHCDTp/albums').then(function(data) {
      return data.items.map(function(item) {
        item.image = item.images[0].url;
        return item;
      });
    });
  }
});

function player(models) {

    function printStatus(track) {
        if (track === null) {
            console.log('No track currently playing');
        } else {
            console.log('Now playing: ' + track.name);
        }
    }

    // update on load
    models.player.load('track').done(function(p) {
        printStatus(p.track);
    });

    // update on change
    models.player.addEventListener('change', function(p) {
        printStatus(p.data.track);
    });
};
