
define(
    [
        'const',
        'viewController/zoom',
        'viewController/clear',
        'viewController/qrcode',
        'viewController/memo'
    ],
    function(
        Const,
        ZoomVC,
        ClearVC,
        QRCodeVC,
        MemoVC
    ) {
        var exports = {};

        exports.bindEvents = function(target) {
            QRCodeVC.createAll(target.querySelectorAll('.qrcode'));
            ClearVC.bindAll(target.querySelectorAll('.clearBtn'));
            ZoomVC.bindAll(target.querySelectorAll('.zoomBtn'));
            MemoVC.bindAll(target.querySelectorAll('.memo'));
        };

        return exports;
    }
);
