/**
 * Main DecodexWatcher client object
 * 
 * @author Pierre HUBERT
 */

/**
 * DecodexWatcherClient object
 */
DWclient = {
	/**
	 * Decodex configuration
	 */
	 __config: __DWclientConfig,

	 /**
	  * Common functions
	  */
	common:{
		/**
		 * API functions
		 */
		api:{
			/**
			 * Make an API request
			 * 
			 * @param {String} apiURI The URI to call in the API
			 * @param {Object} params The params to include in request
			 * @param {Function} nextAction What to do next
			 * @param {Boolean} isGet Specify if it is a Get method
			 */
			makeAPIrequest: function(apiURI, params, nextAction, isGet){
				//Prepare the request URL
				var requestURL = DWclient.__config.apiURL + apiURI;

				//Prepare data to send in request
				var count = 0;
				var datas = "";
				for(paramName in params){
					//We add a "&" if it isn't the first param
					if(count != 0)
						datas += "&";

					//We add field value
					datas += encodeURIComponent(paramName) + "=" + encodeURIComponent(params[paramName]);

					count++; //Increment counter
				}     

				//Define request method
				if(!isGet)
					var requestMethod = "GET";
				else
					var requestMethod = "POST";

				//Create request
				var apiXHR = new XMLHttpRequest();
				apiXHR.open(requestMethod, requestURL);

				//Prepare request response
				apiXHR.onreadystatechange = function(){
					//We continue only if request is terminated
					if(apiXHR.readyState == 4){
						//Prepare result
						var result = JSON.parse(apiXHR.responseText);

						//We can do the next step
						nextAction(result);
					}
				}

				//Set request headers
				apiXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

				//Submit request
				apiXHR.send(datas);
			},
		},

		/**
		 * Messages functions
		 */
		messages:{
			/**
			 * Display a message on the screen
			 * 
			 * @param {String} title The title of the message
			 * @param {HTMLElement} content The content the message
			 * @param {String} type The type of the message (default, loading, success, info, error)
			 * @param {String} iconName The name of the containing icon
			 * @param {Boolean} isDississable Define wether the message can be dissmissed or not
			 * @return {HTMLElement} Display message element
			 */
			showMessage: function(title, content, type, iconName, isDissmissable){
				
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
				messageelem.style.position = "fixed";
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

				//Success
				return mainelem;
			}
		}
	}
};