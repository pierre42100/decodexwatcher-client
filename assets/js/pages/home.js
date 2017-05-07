/**
 * Home functions
 * 
 * @author Pierre HUBERT
 */

DWclient.pages.home = {

    /**
     * Home initiator
     */
    init: function(){
        $(document).ready(function() {

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

            //Enable get entire list datepicker
            $('#listDatePicker').calendar({
                type: 'date',
                text: SemanticFrenchDatePicker.datepickerText,
                monthFirst: false,
                formatter: {
                    date: SemanticFrenchDatePicker.frenchDateFormater,
                }
            });

            //Enable datepickers of changelist
            $('#changerangestart').calendar({
                type: 'date',
                endCalendar: $('#changerangeend'),
                text: SemanticFrenchDatePicker.datepickerText,
                monthFirst: false,
                formatter: {
                    date: SemanticFrenchDatePicker.frenchDateFormater,
                }
            });
            $('#changerangeend').calendar({
                type: 'date',
                startCalendar: $('#changerangestart'),
                text: SemanticFrenchDatePicker.datepickerText,
                monthFirst: false,
                formatter: {
                    date: SemanticFrenchDatePicker.frenchDateFormater,
                }
            });

        });
    }
};