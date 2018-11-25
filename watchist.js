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
            fetch(w.Watchist.host || 'http://localhost:2588').then(function(response) {
                w.Watchist.poll();
                response.json().then(function(json) {
                    if ('update' in json && json.update) {
                        if (typeof w.Watchist.reload == 'function') w.Watchist.reload();
                        else l.reload();
                    }
                });
            }).catch(function() {
                w.Watchist.poll();
            });
        }, 1000);
    };
    w.Watchist.poll();
}(window, location);