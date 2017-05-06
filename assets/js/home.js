$(document)
.ready(function() {

    // fix menu when passed
    $('.masthead')
        .visibility({
            once: false,
            onBottomPassed: function() {
                $('.fixed.menu').transition('fade in');
            },
            onBottomPassedReverse: function() {
                $('.fixed.menu').transition('fade out');
            }
        })
    ;

    // create sidebar and attach to menu open
    $('.ui.sidebar')
        .sidebar('attach events', '.toc.item')
    ;

    //Add the informations popup
    $('.ui:not(.container, .grid)').each(function() {
        //Check if there is anything to show
        if($(this).attr('infos-popup')){
            $(this).popup({
                on        : 'hover',
                variation : 'small inverted',
                exclusive : true,
                content   : $(this).attr('infos-popup')
            });
        }
      });

});