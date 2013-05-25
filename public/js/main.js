(function(global, document) {
    var KEY_ENTRIES = 'KEY_ENTRIES',
        DEFAULT_MEMO = 'Click to Edit Memo.',
        ID_PANELS = 'panels',
        ID_OVERLAY = 'overlay',
        ID_CLOSE_OVERLAY = 'closeOverlay',
        ID_LARGE_QRCODE = 'largeQRCode',
        ID_LARGE_URL = 'largeURL';

    var QRCode;

    var createEntryAsHTML = function(entry, naked) {
        var nodeBody = '<div class="panel-content">' +
                       '<div class="qrcode pull-left" data-url="' + entry.url + '"></div>' +
                       '<div class="meta pull-left">' +
                       '<div class="small">' + entry.dt + '</div>' +
                       '<a href="' + entry.url + '"><h2>' + entry.url+ '</h2></a>' +
                       '</div>' +
                       '<div class="buttons pull-right">' +
                       '<button class="btn zoomBtn" data-url="' + entry.url + '">ZOOM</button>' +
                       '<button class="btn clearBtn" data-id="' + entry.id + '">CLEAR</button>' +
                       '</div>' +
                       '<div class="memo pull-left" data-id="' + entry.id + '"><div>' + entry.memo + '</div></div>' +
                       '</div>';
        if (naked) return nodeBody;
        else return '<li id="' + entry.id + '" class="container-fluid fadein">' + nodeBody + '</li>';
    };
    var createEntriesAsHTML = function(entries) {
        var buffer = '';
        entries.forEach(function(entry) {
            buffer += createEntryAsHTML(entry);
        });
        return buffer;
    };
    var createQRCode = function(target) {
        qrcode = new QRCode(target, {
            text: target.getAttribute('data-url'),
            colorDark : "#444",
            colorLight : "#F3F4E4"
        });
    };
    var createQRCodes = function(targets) {
        for (var i = 0, size = targets.length; i < size; i++) {
            createQRCode(targets[i]);
            bindClickQRCode(targets[i]);
        }
    };
    var bindClickQRCode = function(target) {
        target.addEventListener('click', function() {
            var overlay = document.createElement('div');
            overlay.id = ID_OVERLAY;
            overlay.className = 'overlay fadein';
            overlay.style.height = global.innerHeight + 'px';
            overlay.innerHTML = '<div class="closeButtonWrapper"><button id="' + ID_CLOSE_OVERLAY + '" class="btn closeBtn">CLOSE</button></div>' +
                                '<div id="' + ID_LARGE_QRCODE + '" class="largeQRCode" data-url="' + target.getAttribute('data-url') + '"></div>' +
                                '<div id="' + ID_LARGE_URL + '" class="largeURL">' + target.getAttribute('data-url') + '</div>';
            document.body.appendChild(overlay);
            createQRCode(document.getElementById(ID_LARGE_QRCODE));
            document.getElementById(ID_CLOSE_OVERLAY).addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
        });
    };
    var bindClickZooms = function(targets) {
        for (var i = 0, size = targets.length; i < size; i++) {
            bindClickQRCode(targets[i]);
        }
    };
    var bindClickClears = function(targets) {
        for (var i = 0, size = targets.length; i < size; i++) {
            bindClickClear(targets[i]);
        }
    };
    var bindClickClear = function(target) {
        target.addEventListener('click', function(event) {
            var id = event.target.getAttribute('data-id');
            remove(id);
            var node = document.getElementById(id);
            node.className = 'container-fluid collapseOut';
            setTimeout(function() {
                document.getElementById(ID_PANELS).removeChild(node);
            }, 500);
        });
    };
    var bindClickMemos = function(targets) {
        for (var i = 0, size = targets.length; i < size; i++) {
            bindClickMemo(targets[i]);
        }
    };
    var bindClickMemo = function(target) {
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
                if (val === DEFAULT_MEMO) to.innerHTML = '';
                toggleDOM();
                to.addEventListener('blur', function(event) {
                    from = to;
                    toggleMemo(target);
                });
                to.focus();
            } else {
                to = document.createElement('div');
                var val = to.innerHTML = from.value;
                if (val === DEFAULT_MEMO) to.innerHTML = '';
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
            if (val === DEFAULT_MEMO) return;
            var entry= findById(id);
            entry.memo = val;
            saveById(id, entry);
        };
        var sanitize = function(element) {
            if (element.nodeName === 'DIV') {
                if (element.innerHTML === '') {
                    element.innerHTML = DEFAULT_MEMO;
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
    var findAll = function() {
        var entries = localStorage[KEY_ENTRIES];
        if (!entries) return [];
        else return JSON.parse(entries);
    };
    var findById = function(id) {
        var entries = findAll();
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].id == id) {
                return entries[i];
            }
        }
    };
    var saveAll = function(entries) {
        localStorage[KEY_ENTRIES] = JSON.stringify(entries);
    };
    var saveById = function(id, entry) {
        var entries = findAll(),
            newEntries = [];
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].id == id) {
                newEntries.push(entry);
                continue;
            }
            newEntries.push(entries[i]);
        }
        saveAll(newEntries);
    };
    var remove = function(id) {
        var entries = findAll(),
            newEntries = [];
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].id == id) {
                continue;
            }
            newEntries.push(entries[i]);
        }
        saveAll(newEntries);
    };
    var newEntry = function(url) {
        var entries = findAll(),
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
        saveAll(entries);
        unshiftEntry(entry);
    };
    var unshiftEntry = function(entry) {
        var list = document.getElementById(ID_PANELS),
            target = list.children[0],
            li = document.createElement('li');
        li.id = entry.id;
        li.innerHTML = createEntryAsHTML(entry, true);
        li.className = 'container-fluid fadein';
        list.insertBefore(li, target);
        bindEvents(li);
    };
    var bindEvents = function(target) {
        createQRCodes(target.querySelectorAll('.qrcode'));
        bindClickClears(target.querySelectorAll('.clearBtn'));
        bindClickZooms(target.querySelectorAll('.zoomBtn'));
        bindClickMemos(target.querySelectorAll('.memo'));
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
        while ((node = nodeIterator.nextNode())) {
            if (node.nodeName !== 'BR') {
                node.style.zIndex = 1;
            }
        }
    };

    document.getElementById('convert').onclick =
    document.getElementById('form').onsubmit = function() {
        var url = document.getElementById('url').value;
        if (/^(http|httpas).+$/.test(url)) newEntry(url);
        return false;
    };

    require(["qrcode_require"], function(_QRCode) {
        QRCode = _QRCode;
        document.getElementById('panels').innerHTML = createEntriesAsHTML(findAll());
        bindEvents(document.getElementById(ID_PANELS));
    });
})(window, document);
