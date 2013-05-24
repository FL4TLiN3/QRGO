(function(global, document) {
    var entries = [{
        title: 'Dynamic Bezel Lines',
        description: 'Dynamically created bezel lines experiment. Works with text or images with transparency',
        postAt: '14 May 2013'
    }, {
        title: 'Dynamic Bezel Lines',
        description: 'Dynamically created bezel lines experiment. Works with text or images with transparency',
        postAt: '14 May 2013'
    }, {
        title: 'Dynamic Bezel Lines',
        description: 'Dynamically created bezel lines experiment. Works with text or images with transparency',
        postAt: '14 May 2013'
    }, {
        title: 'Dynamic Bezel Lines',
        description: 'Dynamically created bezel lines experiment. Works with text or images with transparency',
        postAt: '14 May 2013'
    }, {
        title: 'Dynamic Bezel Lines',
        description: 'Dynamically created bezel lines experiment. Works with text or images with transparency',
        postAt: '14 May 2013'
    }, {
        title: 'Dynamic Bezel Lines',
        description: 'Dynamically created bezel lines experiment. Works with text or images with transparency',
        postAt: '14 May 2013'
    }, {
        title: 'Dynamic Bezel Lines',
        description: 'Dynamically created bezel lines experiment. Works with text or images with transparency',
        postAt: '14 May 2013'
    }, {
        title: 'Dynamic Bezel Lines',
        description: 'Dynamically created bezel lines experiment. Works with text or images with transparency',
        postAt: '14 May 2013'
    }, {
        title: 'Dynamic Bezel Lines',
        description: 'Dynamically created bezel lines experiment. Works with text or images with transparency',
        postAt: '14 May 2013'
    }, {
        title: 'Dynamic Bezel Lines',
        description: 'Dynamically created bezel lines experiment. Works with text or images with transparency',
        postAt: '14 May 2013'
    }, {
        title: 'Dynamic Bezel Lines',
        description: 'Dynamically created bezel lines experiment. Works with text or images with transparency',
        postAt: '14 May 2013'
    }];

    var createEntryAsHTML = function(entry) {
        return '' +
            '<li>' +
            '<div class="panel-content">' +
            '<div class="small">' + entry.postAt + '</div>' +
            '<h2>' + entry.title + '</h2>' +
            '<p class="excerpt">' + entry.description + '</p>' +
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

    document.getElementById('panels').innerHTML = createEntriesAsHTML(entries);
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
            node.style.zIndex = 1;
        }
    };
})(window, document);
