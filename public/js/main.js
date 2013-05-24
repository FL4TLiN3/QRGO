(function(global, document) {
    var QRCode;
    var createEntryAsHTML = function(entry) {
        return '' +
            '<li>' +
            '<div class="panel-content">' +
            '<div class="small">' + entry.postAt + '</div>' +
            '<h2>' + entry.title + '</h2>' +
            '<p class="excerpt">' + entry.description + '</p>' +
            '<div class="qrcode" data-url="' + entry.url + '"></div>' +
            '</div>' +
            '</li>';
    };

    var createEntriesAsHTML = function(entries) {
        var buffer = '';
        entries.forEach(function(entry) {
            buffer += createEntryAsHTML(entry);
        });
        return buffer;
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
        while ((node = nodeIterator.nextNode())) node.style.zIndex = 1;
    };
    var createQRCode = function(target) {
        qrcode = new QRCode(target, {
            text: target.getAttribute('data-url'),
            colorDark : "#000000",
            colorLight : "#ffffff"
        });
    };

    require(["data", "qrcode_require"], function(data, _QRCode) {
        QRCode = _QRCode;
        document.getElementById('panels').innerHTML = createEntriesAsHTML(data.entries);
        var elements = document.getElementById('panels').querySelectorAll('.qrcode');
        for (var i = 0, size = elements.length; i < size; i++) {
            createQRCode(elements[i]);
        }
    });
})(window, document);
