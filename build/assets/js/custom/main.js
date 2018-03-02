'use strict';

// Código principal de la aplicación
$(document).ready(function () {
    var eBayAPI = {
        key: 'TipodeIn-AliBu-PRD-ddf6f4b63-4347d6bf',
        requestURLBase: 'https://svcs.ebay.com/services/search/FindingService/v1?',
        categories: {
            watches: 31387,
            tablets: 171485,
            cameras: 31388
        },
        // lastResquest: [],
        parseResponse: function parseResponse(r) {
            var results = r.findItemsByCategoryResponse[0].searchResult[0].item;
            for (var i = 0; i < results.length; i++) {
                $(".products").append("<span>" + results[i].title + "</span>");
            }
        },
        fetchData: function fetchData() {
            var requestURL = this.requestURLBase + 'SECURITY-APPNAME=' + eBayAPI.key + '&OPERATION-NAME=' + 'findItemsByCategory' + '&SERVICE-VERSION=' + '1.0.0' + '&RESPONSE-DATA-FORMAT=' + 'JSON' + '&REST-PAYLOAD' + '&categoryId=' + this.categories.watches + '&paginationInput.entriesPerPage=' + '10' + '&GLOBAL-ID=' + 'EBAY-US' + '&siteid=' + '0';
            return $.ajax({
                url: requestURL,
                type: 'GET',
                dataType: 'JSONP',
                context: this,
                success: function success(r) {
                    // this.lastResquest = [];
                    this.parseResponse(r);
                },
                error: function error() {},
                complete: function complete() {}
            });
        }
    };
});