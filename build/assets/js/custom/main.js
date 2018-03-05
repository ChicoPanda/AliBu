"use strict";

// Código principal de la aplicación

$(document).ready(function () {
    $(function () {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 2000,
            values: [0, 2000],
            slide: function slide(event, ui) {
                $("#price").val(ui.values[0] + "€ - " + ui.values[1] + "€");
            },
            stop: function stop() {
                filterItems();
            }
        });
        $("#price").val($("#slider-range").slider("values", 0) + "€ - " + $("#slider-range").slider("values", 1) + "€");
    });

    $('#user-info').hide();
    $('#user-logout').hide();

    var userLogged = JSON.parse(localStorage.getItem("userLogged"));
    if (userLogged != null) {
        $('#user-info').show();
        $('#user-logout').show();
        $('#user-login').hide();
        $('#user-register').hide();

        $('#user-info .text-menu').text(userLogged[0]);
        $('#user-info .user-avatar').css("background-image", "url('" + userLogged[1] + "')");
    }

    ebayApiCall();
    wallmartApiCall();
});

function filterItems() {
    var range = $('#slider-range').slider('values');
    var storeSelected = $("#store").val();
    var items = $(".product-item");
    items.hide();
    var products = [];
    switch (true) {
        case storeSelected == "all":
            products.push($(".ebay, .walmart"));
            break;
        case storeSelected == "ebay":
            products.push($(".ebay"));
            break;
        case storeSelected == "walmart":
            products.push($(".walmart"));
            break;
    }
    // console.log(products[0]);
    products[0].filter(function () {
        var item = $(this);
        var price = item.find(".price-item").text();
        var price = price.replace("€", "");
        console.log(price);
        // console.log(price >= range[0] && price <= range[1])
        return price >= range[0] && price <= range[1];
    }).show();
}

function convertPrice(price) {
    var result = 0;
    var number = /[0-9\.]$/;
    if (!number.exec(price)) {
        console.log("No se puede convertir");
    } else {
        var change = parseFloat(0.7641);
        var result = change * parseFloat(price);
    }
    return result.toFixed(2);
}

function ebayApiCall() {
    var url = "https://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByCategory";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=TipodeIn-AliBu-PRD-ddf6f4b63-4347d6bf";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&callback=findItemsByKeywordsCallback";
    url += "&REST-PAYLOAD";
    url += "&categoryId=31388";
    // url += "&categoryId(1)=31388";
    url += "&paginationInput.pageNumber=1";
    url += "&paginationInput.entriesPerPage=10";
    // console.log(url);
    $.ajax({
        method: "GET",
        url: url,
        dataType: "jsonp"
    });
};

function findItemsByKeywordsCallback(json) {
    var results = json.findItemsByCategoryResponse[0].searchResult[0].item;
    var container = $('.products');
    for (var i = 0; i < results.length; i++) {
        // console.log(results[i].sellingStatus[0].currentPrice[0].__value__);
        container.append('<div class="product-item ebay">' + '<img class="picture-item" src="' + results[i].galleryURL[0].replace('http:', 'https:') + '" />' + '<a target="_blank" href="' + results[i].viewItemURL[0].replace('http:', 'https:') + '">' + '<img class="logo logo-ebay" src="./build/assets/img/ebay-logo.svg"></img></a>' + '<div class="title-item">' + results[i].title[0].slice(0, 20) + '</div>' + '<div class="price-item">' + convertPrice(results[i].sellingStatus[0].currentPrice[0].__value__) + '€</div>' + '</div>');
    }
};

function wallmartApiCall() {
    var API_KEY = "tcstqnfcpms3hphph9qdbmta";
    buscarProductoWalmart();

    //Mas adelante esta sera la funcion que filtrara las cosas por ahora como pueden leer esta buscando "ipods" que el valor de la variable "query"
    function buscarProductoWalmart() {
        var url_walmart = "https://api.walmartlabs.com/v1/search";
        url_walmart += "?apiKey=" + API_KEY;
        //Aqui guardamos el valor de los inputs de los filtros por ejemplo asi:
        /*var Id = ""
        var query = document.getElementById("producto");
        var start = document.getElementById("producto");
        var number = document.getElementById("cantidadProductos");
        var sort = document.getElementById("importancia");
        var order = document.getElementById("ordenadoPor"); */
        var Id = "";
        var query = "watches";
        var start = "";
        var number = "";
        var sort = "relevance";
        var order = "asc";

        //El link de la peticion tiene que tener el campo "query" si no, no funciona
        if (!query) {
            return null;
        } else {
            url_walmart += "&query=" + query;
            if (Id) {
                url_walmart += "&categoryId=" + Id;
            }
            if (start) {
                url_walmart += "&start=" + start;
            }
            if (sort) {
                url_walmart += "&sort=" + sort;
            }
            if (order) {
                url_walmart += "&order=" + order;
            }
            if (number) {
                url_walmart += "&numItems=" + number;
            }

            // console.log(url_walmart);
            return Walmart(url_walmart);
        }
    }

    function Walmart(url_walmart) {
        $.ajax({
            url: url_walmart,
            jsonp: "callback",
            dataType: "jsonp",
            success: function success(response) {
                // console.log("HA IDO TODO BIEN");
                // console.log(response);
                //llamamos a esta funcion importante
                crearObjeto(response);
            },
            complete: function complete() {},
            error: function error(_error) {

                alert("uff, muerte");
            }
        });
    }

    //Aqui hacemos lo que hablamos en clase, meter lo que sacamos en un array de objetos
    //Aqui esta la documentacion para que sepan que cosas se pueden sacar https://developer.walmartlabs.com/docs/read/Search_API
    function crearObjeto(response) {

        var listaProductos = [];
        for (var i in response.items) {
            // console.log(response.items[i] + "ASD_ASDASKDJA_LSKDJASLKDJ");
            var item = response.items[i];

            var nuevoObjeto = {
                tienda: "Walmart",
                id: item.itemId,
                nombre: item.name,
                descripcionCorta: item.shortDescription,
                // descripcion: item.longDescription ,
                // imagenGrande: item.largeImage ,
                imagen: item.mediumImage,
                id_categoria: item.categoryNode,
                marca: item.brandName,
                puntuacion: item.customerRating,
                precio: item.salePrice,
                stock: item.stock

            };
            listaProductos.push(nuevoObjeto);
        }
        var container = $('.products');
        for (var i in listaProductos) {
            // console.log(listaProductos[i].precio);
            container.append('<div class="product-item walmart">' + '<img class="picture-item" src="' + listaProductos[i].imagen + '" />' + '<a target="_blank" href="enlace">' + '<img class="logo logo-walmart" src="./build/assets/img/walmart-logo.svg"></img></a>' + '<div class="title-item">' + listaProductos[i].nombre.slice(0, 20) + '</div>' + '<div class="price-item">' + convertPrice(listaProductos[i].precio) + '€</div>' + '</div>');
        }
        return listaProductos;
    }
}