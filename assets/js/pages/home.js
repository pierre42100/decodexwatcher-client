/**
 * Home functions
 * 
 * @author Pierre HUBERT
 */

DWclient.pages.home = {

    /**
     * Gets and return informations about a single website
     *
     * @param {Boolean} allHistory Defines wether all the history has to be shown or not
     * @return {Boolean} True for a success
     */
    getInfosSite: function(allHistory){
        //Check if all the history is required or not
        if(!allHistory)
            var endAPIurl = "infos";
        else
            endAPIurl = "history";
        
        //Get website name
        var error = createElem("p");
        error.innerHTML = "Veuillez spécifier le nom d'un site web !";
        DWclient.common.messages.showMessage("Error", error, "error", false, true);
    },

    /**
     * Home initiator
     */
    init: function(){

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

        //Make the search website buttons lives
        byId("getCurrentInfosWebsite").onclick = function(){
            DWclient.pages.home.getInfosSite(false);
        }
        byId("getAllHistoryWebsite").onclick = function(){
            DWclient.pages.home.getInfosSite(true);
        }
    }
};