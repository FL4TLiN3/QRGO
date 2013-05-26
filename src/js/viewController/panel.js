
define(['const', 'localStorage'], function(Const, Storage) {
    var exports = {};

    exports.init = function() {
        return exports.createEntriesAsHTML(Storage.findAll());
    };

    exports.createEntryAsHTML = function(entry, naked) {
        var nodeBody = '<div class="panel-content">' +
                       '<div class="qrcode pull-left" data-url="' + entry.url + '"></div>' +
                       '<div class="meta pull-left">' +
                       '<div class="small">' + entry.dt + '</div>' +
                       '<a href="' + entry.url + '"><h2>' + entry.url+ '</h2></a>' +
                       '</div>' +
                       '<div class="buttons pull-right">' +
                       '<button class="zoom-btn" data-url="' + entry.url + '">ZOOM</button>' +
                       '<button class="clear-btn" data-id="' + entry.id + '">CLEAR</button>' +
                       '</div>' +
                       '<div class="memo pull-left" data-id="' + entry.id + '"><div>' + entry.memo + '</div></div>' +
                       '</div>';
        if (naked) return nodeBody;
        else return '<li id="' + entry.id + '" class="clearfix fadein">' + nodeBody + '</li>';
    };

    exports.createEntriesAsHTML = function(entries) {
        var buffer = '';
        entries.forEach(function(entry) {
            buffer += exports.createEntryAsHTML(entry);
        });
        return buffer;
    };

    return exports;
});
