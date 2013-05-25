
(function(global, document) {
    require(
        [
            'const',
            'resize',
            'event',
            'viewController/form',
            'viewController/hero',
            'viewController/panel',
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
