
define(['const', 'localStorage'], function(Const, Storage) {
    var exports = {};

    exports.bindAll = function(targets) {
        for (var i = 0, size = targets.length; i < size; i++) {
            this.bind(targets[i]);
        }
    };

    exports.bind = function(target) {
        var from, to,
            id = target.getAttribute('data-id');
        var clickAction = function() {
            from = target.childNodes[0];
            toggleMemo();
            target.removeEventListener('click', clickAction);
        };
        var toggleMemo = function() {
            if (from.nodeName === 'DIV') {
                to = document.createElement('textarea');
                var val = to.innerHTML = br2nl(from.innerHTML);
                if (val === Const.DEFAULT_MEMO) to.innerHTML = '';
                toggleDOM();
                to.addEventListener('blur', function(event) {
                    from = to;
                    toggleMemo(target);
                });
                to.focus();
            } else {
                to = document.createElement('div');
                var val = to.innerHTML = from.value;
                if (val === Const.DEFAULT_MEMO) to.innerHTML = '';
                toggleDOM();
                sanitize(to);
                target.addEventListener('click', clickAction);
                saveMemo(val);
            }
        };
        var toggleDOM = function() {
            target.removeChild(from);
            target.appendChild(to);
        };
        var saveMemo = function(val) {
            if (val === Const.DEFAULT_MEMO) return;
            var entry= Storage.findById(id);
            entry.memo = val;
            Storage.saveById(id, entry);
        };
        var sanitize = function(element) {
            if (element.nodeName === 'DIV') {
                if (element.innerHTML === '') {
                    element.innerHTML = Const.DEFAULT_MEMO;
                    element.className = 'empty';
                }
                element.innerHTML = nl2br(element.innerHTML);
            }
        };
        var nl2br = function(val) {
            return val.replace(/(\r\n|\r|\n)/g, '<br>');
        };
        var br2nl = function(val) {
            return val.replace(/<br>/g, '\r\n');
        };
        sanitize(target.childNodes[0]);
        target.addEventListener('click', clickAction);
    };

    return exports;
});
