
(function(global, document) {
    if (~location.href.indexOf('localhost') || ~location.href.indexOf('192.168')) {
        var livereload = document.createElement('script');
        livereload.src = 'http://localhost:35729/livereload.js';
        document.body.appendChild(livereload);
    }
    require(
        [
            'const',
            'resize',
            'event',
            'viewController/form',
            'viewController/hero',
            'viewController/panel'
        ],
        function(Const, Resize, Event, Form, Hero, Panel) {
            Resize.init();
            document.getElementById('panels').innerHTML = Panel.init();
            Form.init();
            Hero.init();
            Event.bindEvents(document.getElementById(Const.ID_PANELS));
        }
    );
})(window, document);
