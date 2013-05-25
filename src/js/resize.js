
define([], function() {
    var exports = {};

    exports.init = function() {
        window.onresize = function() {
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
    };

    return exports;
});
