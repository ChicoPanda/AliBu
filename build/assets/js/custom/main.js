"use strict";

// Código principal de la aplicación
$(document).ready(function () {
    ebayApiCall();
});
function ebayApiCall() {
    var url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByCategory";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=TipodeIn-AliBu-PRD-ddf6f4b63-4347d6bf";
    url += "&GLOBAL-ID=EBAY-ES";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&callback=findItemsByKeywordsCallback";
    url += "&REST-PAYLOAD";
    url += "&categoryId(0)=31387";
    url += "&categoryId(1)=31388";
    url += "&paginationInput.pageNumber=1";
    url += "&paginationInput.entriesPerPage=10";
    console.log(url);
    $.ajax({
        method: "GET",
        url: url,
        dataType: "jsonp"
    });
}

function findItemsByKeywordsCallback(json) {
    console.log(json);
}