(function () {

    ARGUMENTA_CONFIG = ARGUMENTA_CONFIG || {};
    var baseUrl = ARGUMENTA_CONFIG.baseUrl || 'https://argumenta.io';
    var widgetsUrl = ARGUMENTA_CONFIG.widgetsUrl || baseUrl + '/widgets';

    // Loads Argumenta-Widgets via RequireJS
    var loadWidgets = function () {
        var src = widgetsUrl + '/js/require.js';
        var main = widgetsUrl + '/js/main';
        document.write(
            '<script src="' + src + '" data-main="' + main + '"></script>'
        );
    };

    // Let's do this!
    loadWidgets();

})();
