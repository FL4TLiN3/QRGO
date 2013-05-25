
define(['const'], function(Const) {
    var exports = {};

    exports.findAll = function() {
        var entries = localStorage[Const.KEY_ENTRIES];
        if (!entries) return [];
        else return JSON.parse(entries);
    };

    exports.findById = function(id) {
        var entries = this.findAll();
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].id == id) {
                return entries[i];
            }
        }
    };

    exports.saveAll = function(entries) {
        localStorage[Const.KEY_ENTRIES] = JSON.stringify(entries);
    };

    exports.saveById = function(id, entry) {
        var entries = this.findAll(),
            newEntries = [];
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].id == id) {
                newEntries.push(entry);
                continue;
            }
            newEntries.push(entries[i]);
        }
        this.saveAll(newEntries);
    };

    exports.remove = function(id) {
        var entries = this.findAll(),
            newEntries = [];
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].id == id) {
                continue;
            }
            newEntries.push(entries[i]);
        }
        this.saveAll(newEntries);
    };

    exports.heroStateOpen = function() {
        if (!localStorage[Const.KEY_HERO]) {
            localStorage[Const.KEY_HERO] = Const.STATE_HERO_OPEN;
            var entries = exports.findAll(),
                entry = {},
                now = new Date();
            entry.id = '' + Math.abs(Math.random() * 10e12 >> 0);
            entry.url = 'http://google.com';
            entry.memo = '';
            entry.dt = ('0000' + now.getFullYear()).slice(-4) + '/' +
                       ('00'   + (now.getMonth() + 1)).slice(-2) + '/' +
                       ('00'   + now.getDate()).slice(-2) + ' ' +
                       ('00'   + now.getHours()).slice(-2) + ':' +
                       ('00'   + now.getMinutes()).slice(-2) + ':' +
                       ('00'   + now.getSeconds()).slice(-2);
            entries.unshift(entry);
            exports.saveAll(entries);
        }
        return Const.STATE_HERO_OPEN === localStorage[Const.KEY_HERO];
    };

    exports.changeHeroState = function(state) {
        localStorage[Const.KEY_HERO] = state;
    };

    return exports;
});
