
define(
    [
        'const',
        'qrcode_require'
    ],
    function(
        Const,
        QRCodeGenerator
    ) {
    var exports = {};

    exports.create = function(target) {
        qrcode = new QRCodeGenerator(target, {
            text: target.getAttribute('data-url'),
            colorDark : "#444",
            colorLight : "#F3F4E4"
        });
    };

    exports.createAll = function(targets) {
        for (var i = 0, size = targets.length; i < size; i++) {
            exports.create(targets[i]);
            exports.bind(targets[i]);
        }
    };

    exports.bind = function(target) {
        target.addEventListener('click', function() {
            var overlay = document.createElement('div');
            overlay.id = Const.ID_OVERLAY;
            overlay.className = 'overlay fadein';
            overlay.style.height = window.innerHeight + 'px';
            overlay.innerHTML = '<div class="closeButtonWrapper"><button id="' + Const.ID_CLOSE_OVERLAY + '" class="close-btn">CLOSE</button></div>' +
                                '<div id="' + Const.ID_LARGE_QRCODE + '" class="largeQRCode" data-url="' + target.getAttribute('data-url') + '"></div>' +
                                '<div id="' + Const.ID_LARGE_URL + '" class="largeURL">' + target.getAttribute('data-url') + '</div>';
            document.body.appendChild(overlay);
            exports.create(document.getElementById(Const.ID_LARGE_QRCODE));
            document.getElementById(Const.ID_CLOSE_OVERLAY).addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
        });
    };

    return exports;
});
