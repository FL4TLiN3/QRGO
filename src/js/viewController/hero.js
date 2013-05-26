
define(['const', 'localStorage'], function(Const, Storage) {
    var exports = {};

    var hero = document.getElementById(Const.ID_HERO);
    var heroCollapse = document.getElementById(Const.ID_HERO_COLLAPSE);
    var collapseButton = heroCollapse.childNodes[0];

    exports.init = function() {
        if (Storage.heroStateOpen()) exports.toggleHero();
        collapseButton.addEventListener('click', exports.toggleHero);
    };

    exports.toggleHero = function() {
        if (hero.offsetHeight === 0) {
            hero.className = 'hero hero-open';
            heroCollapse.className = 'hero-collapse hero-collapse-open';
            collapseButton.innerHTML = '<span class="icon-up"></span>';
            Storage.changeHeroState(Const.STATE_HERO_OPEN);
        } else {
            hero.className = 'hero hero-close';
            heroCollapse.className = 'hero-collapse hero-collapse-close';
            collapseButton.innerHTML = '<span class="icon-down"></span>';
            Storage.changeHeroState(Const.STATE_HERO_CLOSE);
        }
    };

    return exports;
});
