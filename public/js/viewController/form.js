
define(
    [
        'const',
        'event',
        'localStorage',
        'viewController/panel'
    ],
    function(
        Const,
        Event,
        Storage,
        Panel
    ) {
    var exports = {};

    Storage.heroStateOpen();

    exports.init = function() {
        document.getElementById('convert').onclick =
        document.getElementById('form').onsubmit = function() {
            var url = document.getElementById('url').value;
            if (/^(http|httpas).+$/.test(url)) exports.newEntry(url);
            return false;
        };
    };

    exports.newEntry = function(url) {
        var entries = Storage.findAll(),
            entry = {},
            now = new Date();
        entry.id = '' + Math.abs(Math.random() * 10e12 >> 0);
        entry.url = url;
        entry.memo = '';
        entry.dt = ('0000' + now.getFullYear()).slice(-4) + '/' +
                   ('00'   + (now.getMonth() + 1)).slice(-2) + '/' +
                   ('00'   + now.getDate()).slice(-2) + ' ' +
                   ('00'   + now.getHours()).slice(-2) + ':' +
                   ('00'   + now.getMinutes()).slice(-2) + ':' +
                   ('00'   + now.getSeconds()).slice(-2);
        entries.unshift(entry);
        Storage.saveAll(entries);
        exports.unshiftEntry(entry);
    };

    exports.unshiftEntry = function(entry) {
        var list = document.getElementById(Const.ID_PANELS),
            target = list.children[0],
            li = document.createElement('li');
        li.id = entry.id;
        li.innerHTML = Panel.createEntryAsHTML(entry, true);
        li.className = 'container-fluid fadein';
        list.insertBefore(li, target);
        Event.bindEvents(li);
    };

    return exports;
});
