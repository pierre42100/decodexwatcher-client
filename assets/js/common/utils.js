/**
 * Utilities functions
 * 
 * @author Pierre HUBERT
 */

/**
 * Create a new HTML node
 * 
 * @param {String} nodeType The type of the HTML node
 * @param {HTMLElement} appendTo Optionnal, defines node on which the new node will be applied
 * @return {HTMLElement} The newly created element
 */
function createElem(nodeType, appendTo){
    var newElem = document.createElement(nodeType);

    if(appendTo)
        appendTo.appendChild(newElem);

    //Return result
    return newElem;
}

/**
 * Get an HTML element specified by an ID
 * 
 * @param {String} nodeName The ID of the element
 * @return {HTMLElement} The elemnt / False for a failure
 */
function byId(nodeName){
    return document.getElementById(nodeName);
}

/**
 * Convert a timestamp to a "string" name
 * 
 * @param {Integer} timestamp The timestamp to convert
 * @return {String} The timestamp as a string
 */
function timeToStr(timestamp){
    //Create a date element
    var date = new Date();
    date.setTime(timestamp*1000);

    //Months
    var months = {
        1: "Janvier",
        2: "Février", 
        3: "Mars",
        4: "Avril",
        5: "Mai",
        6: "Juin",
        7: "Juillet",
        8: "Août",
        9: "Septembre",
        10: "Octobre",
        11: "Novembre",
        12: "Décembre"
    }

    //Get hours
    var hours = date.getHours();
    if(hours < 10)
        hours = "0"+hours;

    //Get the minutes
    var minutes = date.getMinutes();
    if(minutes < 10)
        minutes = "0"+minutes;

    //Compose the date
    var string = date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear()+" à "+hours+"h"+minutes;

    //Return it
    return string;
}