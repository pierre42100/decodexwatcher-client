/**
 * Messages functions
 * 
 * @author Pierre HUBERT
 */

DWclient.common.messages = {
	/**
	 * Display a message on the screen
	 * 
	 * @param {String} title The title of the message
	 * @param {HTMLElement} content The content the message
	 * @param {String} type The type of the message (default, loading, success, info, error)
	 * @param {String} iconName The name of the containing icon
	 * @param {Boolean} isDississable Define wether the message can be dissmissed or not
	 * @param {Integer} timeout Optionnal, define a timeout for the message
	 * @return {HTMLElement} Display message element
	 */
	showMessage: function(title, content, type, iconName, isDissmissable, timeout){
		
		//Determine message type
		var messageType = ""
		if(type){
			switch(type){
				//Default message
				case "loading":
					iconName = "loading";
					break;
				
				//Success message
				case "success":
					iconName = "check";
					messageType = "success";
					break;

				//Infos message
				case "info":
					iconName = "info";
					messageType = "info";
					break;
				
				//Error message
				case "error":
					iconName = false;
					messageType = "error";
					break;

			}
		}

		//Create main element
		var mainelem = createElem("div", document.body);
		mainelem.style.position = "fixed";
		mainelem.style.top = "0px";
		mainelem.style.left = "0px";
		mainelem.style.width = "100%";
		mainelem.style.height = "100%";
		mainelem.style.zIndex = "1000";

		//Create overlay
		var overlay = createElem("div", mainelem);
		overlay.style.width = "100%";
		overlay.style.height = "100%";
		overlay.style.position = "fixed";
		overlay.style.zIndex = 1000;
		overlay.style.top = "0px";
		overlay.style.backgroundColor = "#00000080";

		//Create message node
		var messageelem = createElem("div", mainelem);
		messageelem.style.width = "94%";
		//messageelem.style.position = "fixed";
		messageelem.style.zIndex = 1001;
		messageelem.style.top = "3%";
		messageelem.style.left = "3%";
		messageelem.className = "ui "+messageType+" message";

		//Add dismiss icon (if required)
		if(isDissmissable){
			var dismisselem = createElem("i", messageelem);
			dismisselem.className = "close icon";
			dismisselem.onclick = function(){
				this.parentNode.parentNode.remove();
			}
		}

		//Add message icon
		if(iconName){
			var iconelem = createElem("i", messageelem);
			messageelem.className += " icon ";

			if(iconName == "loading")
				iconelem.className = "notched circle loading icon";
			else
				iconelem.className = iconName + " icon";
		}

		//Create content element
		var contentelem = createElem("div", messageelem);
		contentelem.className = "content";

		//Add header
		var headerelem = createElem("div", contentelem);
		headerelem.className = "header";
		headerelem.innerHTML = title;

		//Add message content
		contentelem.appendChild(content);

		//Defines a timeout for the message if required
		if(timeout){
			setTimeout(( function(){
				mainelem.remove();
			}), timeout);
		}

		//Success
		return mainelem;
	},

	/**
	 * Display informations about a single website
	 * 
	 * @param {object} infos The informations about the website
	 * @return {Boolean} True for a success
	 */
	displayInfosOneSite: function(infos){
		//Create information element
		var contenerelem = createElem("div");

		//Process informations
		var table = createElem("table", contenerelem);
		table.className = "ui striped table";

		//Add site name
		var nameelem = createElem("tr", table);
		nameelem.innerHTML = "<td> Nom du site </td><td>"+infos.name+"</td>";

		//Add site comment
		var siteComment = createElem("tr", table);
		siteComment.innerHTML = "<td>Commentaire du Décodex</td><td>"+infos.comment+"</td>";

		//Trust level
		var trustLevel = createElem("tr", table);
		var trustLevelname = createElem("td", trustLevel);
		var trustLevelContent = createElem("td", trustLevel);
		trustLevelname.innerHTML = "Niveau de fiabilité (du Décodex)";
		trustLevelContent.style.color = DWclient.__config.trustLevels[infos.trustLevel].color;
		trustLevelContent.innerHTML = DWclient.__config.trustLevels[infos.trustLevel].name;

		//URLs
		var urlselem = createElem("tr", table);
		var urlsname = createElem("td", urlselem);
		var urlsvalues = createElem("td", urlselem);
		urlsname.innerHTML = "Adresses du site";

		for(i in infos.urls)
			urlsvalues.innerHTML += "<a href='http://"+infos.urls[i]+"' target='_blank'>"+infos.urls[i]+"</a><br />";

		//Lastest informations entry
		var latestelem = createElem("tr", table);
		latestelem.innerHTML = "<td>Dernière version de notation du site</td><td>"+(infos.latest == 1 ? "Oui" : "Non")+"</td>";

		//Date add
		var dateelem = createElem("tr", table);
		dateelem.innerHTML = "<td>Date d'enregistrement</td><td>"+timeToStr(infos.insertTime)+"</td>";

		//Apply message dialog
		this.showMessage("Informations à propos de <i>"+infos.name+"</i>", contenerelem, "info", null, true);

		//Success
		return true;
	},

	/**
	 * Display informations about multiple websites
	 * 
	 * @param {Object} infos Informations about the websites
	 * @return {Boolean} Ture for a success
	 */
	displayMultipleSitesInfos: function(infos){
		//Create dialog information element
		var contenerelem = createElem("div");

		//Create table
		var tableelem = createElem("table", contenerelem);
		tableelem.className = "ui striped table";

		//Create header row
		var tableheader = createElem("thead", tableelem);
			var namefield = createElem("th", tableheader);
			namefield.innerHTML = "Nom du site";

			var commentField = createElem("th", tableheader);
			commentField.innerHTML = "Commentaire";

			var trustField = createElem("th", tableheader);
			trustField.innerHTML = "Note";

			var urlsfield = createElem("th", tableheader);
			urlsfield.innerHTML = "URLs";

			var latestField = createElem("th", tableheader);
			latestField.innerHTML = "Dernière version";

			var dateField = createElem("th", tableheader);
			dateField.innerHTML = "Date d'enregistrement";

		//Apply message dialog
		this.showMessage("Informations sur des sites web", contenerelem, "info", null, true);

		//Success
		return true;
	},
};