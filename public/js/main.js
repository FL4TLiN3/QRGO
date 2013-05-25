
(function(global, document) {
    var Const,
        Resize,
        Event,
        Form,
        Hero,
        Panel,
        Zoom,
        Clear,
        QRCode,
        Memo;

    require(
        [
            'const',
            'resize',
            'event',
            'viewController/form',
            'viewController/hero',
            'viewController/panel',
            'viewController/zoom',
            'viewController/clear',
            'viewController/qrcode',
            'viewController/memo'
        ],
        function() {
            var i = 0;
            Const    = arguments[i++];
            Resize   = arguments[i++];
            Event    = arguments[i++];
            Form     = arguments[i++];
            Hero     = arguments[i++];
            Panel    = arguments[i++];
            Zoom     = arguments[i++];
            Clear    = arguments[i++];
            QRCode   = arguments[i++];
            Memo     = arguments[i++];

            Resize.init();
            document.getElementById('panels').innerHTML = Panel.init();
            Form.init();
            Hero.init();
            Event.bindEvents(document.getElementById(Const.ID_PANELS));
        }
    );
})(window, document);
