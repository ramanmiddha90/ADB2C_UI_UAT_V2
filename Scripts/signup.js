(function onPageReady() {
    var intervalHandle = setInterval(
        function () {
            if (window.pageReady) {
                function GetParameterValues(param) {
                    var url = document.referrer.slice(window.location.href.indexOf('?') + 1).split('&');
                    for (var i = 0; i < url.length; i++) {
                        var urlparam = url[i].split('=');
                        if (urlparam[0].toUpperCase() == param.toUpperCase()) {
                            return urlparam[1];
                        }

                    }
                    return null;
                };

                function loadFields() {

                    var fieldInfo = $.parseJSON($("#FieldInfo").val());
                    fieldInfo.Fields_Info.forEach(function (UXField) {
                        if (!UXField.Is_Mandatory) {
                            var fieldAttr = "." + UXField.Id + "_li";
                            var requiredFieldAttr = "." + UXField.Id + "_required_li";
                            console.log(requiredFieldAttr);
                            if (UXField.Is_Req && $(requiredFieldAttr) != null && $(requiredFieldAttr) != undefined && $(requiredFieldAttr).length > 0) {
                                $(fieldAttr).hide();
                                $(requiredFieldAttr).show();
                            } else {
                                $(fieldAttr).show();
                                $(requiredFieldAttr).hide();
                            }
                        }
                    });
                }
                var continuteButton = document.getElementById('continue');
                if (continuteButton && $("#continue").is(':visible')) {

                    loadFields();

                    $("#continue").click(function (e) {
                        debugger;
                        e.preventDefault();
                        e.stopPropagation();
                    });
                    $("#Cancel").click(function () {
                        var returnUrl = GetParameterValues('return_url'); //Encoded value FE URL
                        if (returnUrl == null)
                            returnUrl = "";
                        var redirectURI = GetParameterValues('redirect_uri');
                        var url = decodeURIComponent(redirectURI) + "#error=access_denied&error_description=AAD_Custom_466:" + returnUrl;
                        window.location.replace(url);
                        debugger;
                        console.log("called after");


                    });
                    clearInterval(intervalHandle);
                }
            }
        }, 50);
}());