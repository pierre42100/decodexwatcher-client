/**
 * Wait splash screen
 * 
 * @author Pierre HUBERT
 */

DWclient.common.waitScreen = {
	/**
	 * @var {HTMLElement} Waitscreen element
	 */
	waitScreenElem: false,

	/**
	 * Show waitscreen element
	 * 
	 * @return {Boolean} True for a success
	 */
	show: function(){

		//We check if wait screen already exists or not
		if(this.waitScreenElem){
			this.waitScreenElem.style.display = "block"; //Show it back
			return true;
		}

		//Else we have to create it
		var messageElem = createElem("p");
		messageElem.innerHTML = "Veuillez patienter, chargement en cours...";
		this.waitScreenElem = DWclient.common.messages.showMessage("Veuillez patienter", messageElem, "loading");

		//Success
		return true;
	},

	/**
	 * Hide waitscreen element
	 * 
	 * @return {Boolean} True for a success
	 */
	hide: function(){
		//Hide element
		if(this.waitScreenElem){
			this.waitScreenElem.style.display = "none"; //Do not delete it
			return true;
		}

		//Else no wait splash screen was found
		return false;
	}
};