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
		var siteName = byId('getInfosSiteURL').value;
		if((!siteName) || siteName == ""){
			var error = createElem("p");
			error.innerHTML = "Veuillez spécifier le nom d'un site web !";
			DWclient.common.messages.showMessage("Erreur", error, "error", false, true, 4000);

			//Quit script
			return false;
		}

		//Freeze screen
		DWclient.common.waitScreen.show();

		//Perform a request on the server
		var apiURL = "site/"+endAPIurl;
		params = {
			url: siteName,
		};

		//What to do next
		onceGotInfos = function(result){

			//Unfreeze screen
			DWclient.common.waitScreen.hide();

			//We check if there was an error
			if(result.error){
				//Prepare error display
				var error = createElem("p");
				error.innerHTML = "Une erreur a été rencontrée lors de la tentative de récupération des données auprès du serveur.<br />";
				error.innerHTML += "Le code de l'erreur est le code "+result.error.code+" et le message du serveur est le suivant : <br/>";
				error.innerHTML += "<i>"+result.error.message+"</i>";
				DWclient.common.messages.showMessage("Erreur", error, "error", false, true, 10000);
				return false;
			}

			//Else we can display informations about the website
			if(!allHistory)
				DWclient.common.messages.displayInfosOneSite(result);
			else
				DWclient.common.messages.displayMultipleSitesInfos(result);
		};

		//Perform the request on the server
		DWclient.common.api.makeAPIrequest(apiURL, params, onceGotInfos);

		//Success
		return true;
	},

	/**
	 * Get and return informations about a complete list
	 * 
	 * @return {Boolean} True for a success
	 */
	getCompleteList: function(){
		//Get list date
		var listDate = byId('getListDateInput').value;
		if((!listDate) || listDate == ""){
			var error = createElem("p");
			error.innerHTML = "Veuillez spécifier la date de la liste !";
			DWclient.common.messages.showMessage("Erreur", error, "error", false, true, 4000);

			//Quit script
			return false;
		}

		//Convert the list date to a timestamp
		var listTime = strDateToTime(listDate);
		console.log(listTime);

		//Success
		return true;
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
		byId("getListDateInput").value = getCurrentDate();
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
		byId("endChangesIntervalInput").value = getCurrentDate();
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

		//Make the "get complete list" button live
		byId("getACompletelist").onclick = function(){
			DWclient.pages.home.getCompleteList();
		}
	}
};