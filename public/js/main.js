(function(global, document) {
    var Const,
        Resize,
        Event,
        PanelVC,
        FormVC,
        ZoomVC,
        ClearVC,
        QRCodeVC,
        MemoVC;


    require(
        [
            'const',
            'resize',
            'event',
            'viewController/panel',
            'viewController/form',
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
            PanelVC  = arguments[i++];
            FormVC   = arguments[i++];
            ZoomVC   = arguments[i++];
            ClearVC  = arguments[i++];
            QRCodeVC = arguments[i++];
            MemoVC   = arguments[i++];

            Resize.init();
            document.getElementById('panels').innerHTML = PanelVC.init();
            FormVC.init();
            Event.bindEvents(document.getElementById(Const.ID_PANELS));
        }
    );
})(window, document);
