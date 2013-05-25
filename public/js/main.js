(function(global, document) {
    var Const,
        QRCode,
        Storage,
        PanelVC,
        FormVC,
        MemoVC;

    var createQRCode = function(target) {
        qrcode = new QRCode(target, {
            text: target.getAttribute('data-url'),
            colorDark : "#444",
            colorLight : "#F3F4E4"
        });
    };
    var createQRCodes = function(targets) {
        for (var i = 0, size = targets.length; i < size; i++) {
            createQRCode(targets[i]);
            bindClickQRCode(targets[i]);
        }
    };
    var bindClickQRCode = function(target) {
        target.addEventListener('click', function() {
            var overlay = document.createElement('div');
            overlay.id = Const.ID_OVERLAY;
            overlay.className = 'overlay fadein';
            overlay.style.height = global.innerHeight + 'px';
            overlay.innerHTML = '<div class="closeButtonWrapper"><button id="' + Const.ID_CLOSE_OVERLAY + '" class="btn closeBtn">CLOSE</button></div>' +
                                '<div id="' + Const.ID_LARGE_QRCODE + '" class="largeQRCode" data-url="' + target.getAttribute('data-url') + '"></div>' +
                                '<div id="' + Const.ID_LARGE_URL + '" class="largeURL">' + target.getAttribute('data-url') + '</div>';
            document.body.appendChild(overlay);
            createQRCode(document.getElementById(Const.ID_LARGE_QRCODE));
            document.getElementById(Const.ID_CLOSE_OVERLAY).addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
        });
    };
    var bindClickZooms = function(targets) {
        for (var i = 0, size = targets.length; i < size; i++) {
            bindClickQRCode(targets[i]);
        }
    };
    var bindClickClears = function(targets) {
        for (var i = 0, size = targets.length; i < size; i++) {
            bindClickClear(targets[i]);
        }
    };
    var bindClickClear = function(target) {
        target.addEventListener('click', function(event) {
            var id = event.target.getAttribute('data-id');
            remove(id);
            var node = document.getElementById(id);
            node.className = 'container-fluid collapseOut';
            setTimeout(function() {
                document.getElementById(Const.ID_PANELS).removeChild(node);
            }, 500);
        });
    };
    var bindEvents = function(target) {
        createQRCodes(target.querySelectorAll('.qrcode'));
        bindClickClears(target.querySelectorAll('.clearBtn'));
        bindClickZooms(target.querySelectorAll('.zoomBtn'));
        MemoVC.bindAll(target.querySelectorAll('.memo'));
    };

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
            'qrcode_require',
            'localStorage',
            'viewController/panel',
            'viewController/form',
            'viewController/memo'
        ],
        function() {
            Const   = arguments[0];
            QRCode  = arguments[1];
            Storage = arguments[2];
            PanelVC = arguments[3];
            FormVC  = arguments[4];
            MemoVC  = arguments[5];

            document.getElementById('panels').innerHTML = PanelVC.init();
            FormVC.init();
            bindEvents(document.getElementById(Const.ID_PANELS));
        }
    );
})(window, document);
