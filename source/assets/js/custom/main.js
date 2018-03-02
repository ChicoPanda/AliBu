// Código principal de la aplicación
<<<<<<< HEAD
$(document).ready(function(){
    ebayApiCall();
})
function ebayApiCall(){
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
    })
}

function findItemsByKeywordsCallback(json){
    console.log(json);
}
=======
$(document).ready(function() {
    var eBayAPI = {
        key: 'TipodeIn-AliBu-PRD-ddf6f4b63-4347d6bf',
        requestURLBase: 'https://svcs.ebay.com/services/search/FindingService/v1?',
        categories: {
            watches: 31387,
            tablets: 171485,
            cameras: 31388
        },
        // lastResquest: [],
        parseResponse: function(r) {
            var results = r.findItemsByCategoryResponse[0].searchResult[0].item;
            for (var i = 0; i < results.length; i++) {
                $(".products").append("<span>" + results[i].title + "</span>");
            }
        },
        fetchData: function() {
            var requestURL = this.requestURLBase +
                'SECURITY-APPNAME=' + eBayAPI.key +
                '&OPERATION-NAME=' + 'findItemsByCategory' +
                '&SERVICE-VERSION=' + '1.0.0' +
                '&RESPONSE-DATA-FORMAT=' + 'JSON' +
                '&REST-PAYLOAD' +
                '&categoryId=' + this.categories.watches +
                '&paginationInput.entriesPerPage=' + '10' +
                '&GLOBAL-ID=' + 'EBAY-US' +
                '&siteid=' + '0';
            return $.ajax({
                url: requestURL,
                type: 'GET',
                dataType: 'JSONP',
                context: this,
                success: function(r) {
                    // this.lastResquest = [];
                    this.parseResponse(r);
                },
                error: function() {},
                complete: function() {}
            });
        }
    }
});
>>>>>>> 76c4dfaf6d42c82365f9e590cebc521efd85f130
