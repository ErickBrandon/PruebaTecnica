$(document).ready(function() {
    _listaProdcutos = [];
    tblProductos();
    tblSalidas();
} );

function tblProductos() {
    $('#tbl_productos').DataTable({
        paging: false,
        ordering: false,
        info: false,
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "_END_ de _TOTAL_ Productos",
            "infoEmpty": "No existe el producto",
            "infoFiltered": "",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "<span class='feather icon-search'></span>",
            "zeroRecords": "No hay concidencias",
            "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "<span class='feather icon-chevron-right'>",
            "previous": "<span class='feather icon-chevron-left'>"
            }
        },
        lengthMenu: [6],
        bLengthChange : false,
        'ajax':{
            'url':'http://127.0.0.1:8000/api/ListaProductos',
            'type': 'POST',
            'dataSrc':function (data) {
                _listaProdcutos = data.data;
                return data.data;
           } 
        },
        "createdRow": function( row, data) {
            $(row).attr('id', data['id'] );
            $(row).attr('class', "c-"+data['Codigo'] );
        },
        'columns':[
            {data:"id"},
            {data:'Codigo'},
            {data:'Producto'},
            {data:'Unidades_Entrantes'},
            {data:'Costo_Unitario'},
            {data:'Costo_Total'},
            {data:'Fecha_Registro'},
            {data:'Unidades_Salientes'},
            {data:'Ultima_Actualizacion'},
            {data:"id",
            "render": function (data) {
                return "<button class='btn btn-dark' onclick=salida("+data+") data-toggle='modal' data-target='#exampleModal'>"+
                "<span class='material-icons'>exit_to_app</span></button>"
              }
            },
            {data:"id",
            "render": function (data) {
                return "<button class='btn btn-info' onclick=edit("+data+") data-toggle='modal' data-target='#exampleModal'>"+
                "<span class='material-icons'>edit_note</span></button>"
              }
            },
            {data:"id",
            "render": function (data) {
                return "<button class='btn btn-danger ' onclick=remove("+data+")>"+
                "<span class='material-icons'>delete</span></button>"
              }
            },
        ],
       
    });
}

function tblSalidas() {
    $('#tbl_salidas').DataTable({
        paging: false,
        ordering: false,
        info: false,
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "_END_ de _TOTAL_ Productos",
            "infoEmpty": "No existe el producto",
            "infoFiltered": "",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "<span class='feather icon-search'></span>",
            "zeroRecords": "No hay concidencias",
            "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "<span class='feather icon-chevron-right'>",
            "previous": "<span class='feather icon-chevron-left'>"
            }
        },
        lengthMenu: [6],
        bLengthChange : false,
        'ajax':{
            'url':'http://127.0.0.1:8000/api/ListaSalidas',
            'type': 'POST',
            'dataSrc':function (data) {
                return data.data;
           } 
        },
        "createdRow": function( row, data) {
            $(row).attr('id', data['ID'] );
        },
        'columns':[
            {data:"ID"},
            {data:'Tienda'},
            {data:'Unidades_Asignadas'},
            {data:'FR'},
            {data:'producto_id'},
            {data:'Codigo'},
            {data:'Producto'},
        ],
       
    });
}