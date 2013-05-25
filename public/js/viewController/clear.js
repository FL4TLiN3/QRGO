
define(
    [
        'const',
        'localStorage'
    ],
    function(
        Const,
        Storage
    ) {
    var exports = {};

    exports.bindAll = function(targets) {
        for (var i = 0, size = targets.length; i < size; i++) {
            exports.bind(targets[i]);
        }
    };

    exports.bind = function(target) {
        target.addEventListener('click', function(event) {
            var id = event.target.getAttribute('data-id');
            Storage.remove(id);
            var node = document.getElementById(id);
            node.className = 'container-fluid collapseOut';
            setTimeout(function() {
                document.getElementById(Const.ID_PANELS).removeChild(node);
            }, 500);
        });
    };

    return exports;
});
