(function(global, document) {
    var Const,
        Event,
        PanelVC,
        FormVC,
        ZoomVC,
        ClearVC,
        QRCodeVC,
        MemoVC;


    global.onresize = function() {
        var node;
        var nodeIterator = document.createNodeIterator(
            document.body,
            NodeFilter.SHOW_ELEMENT,
            function(node) {
                return NodeFilter.FILTER_ACCEPT;
            },
            false
        );
        while ((node = nodeIterator.nextNode())) {
            if (node.nodeName !== 'BR') {
                node.style.zIndex = 1;
            }
        }
    };

    require(
        [
            'const',
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
            Event    = arguments[i++];
            PanelVC  = arguments[i++];
            FormVC   = arguments[i++];
            ZoomVC   = arguments[i++];
            ClearVC  = arguments[i++];
            QRCodeVC = arguments[i++];
            MemoVC   = arguments[i++];

            document.getElementById('panels').innerHTML = PanelVC.init();
            FormVC.init();
            Event.bindEvents(document.getElementById(Const.ID_PANELS));
        }
    );
})(window, document);
