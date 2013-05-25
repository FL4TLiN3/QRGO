
define(['viewController/qrcode'], function(QRCode) {
    var exports = {};

    exports.bindAll = function(targets) {
        for (var i = 0, size = targets.length; i < size; i++) {
            QRCode.bind(targets[i]);
        }
    };

    return exports;
});
