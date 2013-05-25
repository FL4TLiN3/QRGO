
define(['viewController/qrcode'], function(QRCodeVC) {
    var exports = {};

    exports.bindAll = function(targets) {
        for (var i = 0, size = targets.length; i < size; i++) {
            QRCodeVC.bind(targets[i]);
        }
    };

    return exports;
});
