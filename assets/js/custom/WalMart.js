var API_KEY = "tcstqnfcpms3hphph9qdbmta";


//Mas adelante esta sera la funcion que filtrara las cosas por ahora como pueden leer esta buscando "ipods" que el valor de la variable "query"
function buscarProductoWalmart() {
    var url_walmart = "http://api.walmartlabs.com/v1/search";
    url_walmart += "?apiKey=" + API_KEY;
    //Aqui guardamos el valor de los inputs de los filtros por ejemplo asi:
    /*var Id = ""
    var query = document.getElementById("producto");
    var start = document.getElementById("producto");
    var number = document.getElementById("cantidadProductos");
    var sort = document.getElementById("importancia");
    var order = document.getElementById("ordenadoPor"); */
    var Id = ""
    var query = "ipod";
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

        console.log(url_walmart);
        return Walmart(url_walmart);
    }
}



function Walmart(url_walmart) {
    $.ajax({
        url: url_walmart,
        jsonp: "callback",
        dataType: "jsonp",
        success: function (response) {
            console.log("HA IDO TODO BIEN");
            console.log(response);
            //llamamos a esta funcion importante
            crearObjeto(response)

        },
        complete: function () {

        },
        error: function (error) {
           
            alert("uff, muerte")
        }
    });
}

//Aqui hacemos lo que hablamos en clase, meter lo que sacamos en un array de objetos
//Aqui esta la documentacion para que sepan que cosas se pueden sacar https://developer.walmartlabs.com/docs/read/Search_API
function crearObjeto(response) {

    var listaProductos = [];
    for (var i in response.items) {
        console.log(response.items[i] +"ASD_ASDASKDJA_LSKDJASLKDJ");
        let item = response.items[i];
      
        var nuevoObjeto = {
            tienda: "Walmart",
            id: item.itemId ,
            nombre: item.name ,
            descripcionCorta: item.shortDescription ,
           // descripcion: item.longDescription ,
           // imagenGrande: item.largeImage ,
            imagen: item.mediumImage ,
            id_categoria: item.categoryNode ,
            marca: item.brandName ,
            puntuacion: item.customerRating ,
            precio: item.salePrice,
            stock: item.stock,
            
        };
        listaProductos.push(nuevoObjeto);
    }
    for (var i in listaProductos) {
        console.warn(listaProductos[i]);
    }

    return listaProductos;
}
