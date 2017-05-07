/**
 * API functions
 * 
 * @author Pierre HUBERT
 */

/**
 * API main object
 */
DWclient.common.api = {
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
            var requestMethod = "POST";
        else
            var requestMethod = "GET";

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
};