
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
        Zoom,
        Clear,
        QRCode,
        Memo
    ) {
        var exports = {};

        exports.bindEvents = function(target) {
            QRCode.createAll(target.querySelectorAll('.qrcode'));
            Clear.bindAll(target.querySelectorAll('.clear-btn'));
            Zoom.bindAll(target.querySelectorAll('.zoom-btn'));
            Memo.bindAll(target.querySelectorAll('.memo'));
        };

        return exports;
    }
);
