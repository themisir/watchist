/********************************************************
 * watchist.js
 * Watchist client side browser application.
 * @author Misir Jafarov <hello@misir.xyz>
 * @license MIT
 ********************************************************/
!function(w, l){
  w.Watchist = w.Watchist || {};
  w.Watchist.poll = function(){
    setTimeout(function() {
      fetch(w.Watchist.host || 'http://localhost:2588')
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          if (json && json.update) {
            if (w.Watchist.reload) w.Watchist.reload();
            else r.reload();
          }
        })
        .finally(w.Watchist.poll);
      }, 1000);
    };
    w.Watchist.poll();
}(window, location);
