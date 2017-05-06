/**
 * Datepicker french adaptations
 * 
 * @author Pierre HUBERT
 */

/**
 * Datepicker for Semantic UI
 * 
 * French adaptation
 */
var SemanticFrenchDatePicker = {
    /**
     * Datepicker french texts
     */
	datepickerText: {
      days: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      monthsShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Aujourd\'hui',
      now: 'Maintenant',
      am: 'AM',
      pm: 'PM'
    },

    /**
     * French date formater
     */
     frenchDateFormater : function(date, settings) {
        if (!date) return '';
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return day + '/' + month + '/' + year;
     }
}