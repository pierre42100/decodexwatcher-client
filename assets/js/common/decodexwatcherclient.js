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
			 * @param {String} iconName The name of the containing icon
			 * @param {Boolean} isDississable Define wether the message can be dissmissed or not
			 * @return {Boolean} True for a success
			 */
			showMessage: function(title, content, iconName, isDississable){
				
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
				messageelem.className = "ui icon message";

				//Success
				return false;
			}
		}
	}
};

var content = createElem("div");
content.innerHTML = "<p>Hello world !</p>";
DWclient.common.messages.showMessage("Message title", content);