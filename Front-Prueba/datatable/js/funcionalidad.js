var _productoEnJuego = null;
$("#modal_form").on("hidden.bs.modal", function () {
    _productoEnJuego=null;
    document.getElementById('modal_titulo').innerText="";
    document.getElementById('Codigo').value= null
    document.getElementById('Producto').value=null;
    document.getElementById('UE').value=null
    document.getElementById('CU').value=null
    document.getElementById('CT').value= null
    document.getElementById('btn_form').innerText="";
   
});
$("#modal_salida").on("hidden.bs.modal", function () {
    _productoEnJuego=null;
    
    document.getElementById('UA').value= null
   
});

function edit(id) {
    _productoEnJuego= _listaProdcutos.find(e => e.id == id);
    document.getElementById('modal_titulo').innerText="Id - "+_productoEnJuego.id+" | "+_productoEnJuego.Producto;
    document.getElementById('Codigo').value= _productoEnJuego.Codigo
    document.getElementById('Producto').value= _productoEnJuego.Producto;
    document.getElementById('UE').value= _productoEnJuego.Unidades_Entrantes
    document.getElementById('CU').value= _productoEnJuego.Costo_Unitario
    document.getElementById('CT').value= _productoEnJuego.Costo_Total
    document.getElementById('btn_form').innerText="Actualizar registro";
    $("#modal_form").modal('show');
}


$('#btn_NuevoP').on('click', function () {
    document.getElementById('modal_titulo').innerText="Nuevo registro";
    document.getElementById('btn_form').innerText="Guardar registro";
    $("#modal_form").modal('show');
});
$('#UE').on('input', function (e) {

    let unidadesEntrntes= parseInt(e.target.value);
    let costo = parseFloat(document.getElementById('CU').value).toFixed(2);
    console.log(costo != "NaN");
    if (document.getElementById('CU').value != "") {
        document.getElementById('CT').value= unidadesEntrntes * costo;
    }else{
        document.getElementById('CT').value= parseFloat(0).toFixed(2);
       
    }
   
});
$('#CU').on('input', function (e) {

    let costo= parseFloat(e.target.value).toFixed(2);
    let unidadesEntrntes = parseInt(document.getElementById('UE').value);
    console.log(unidadesEntrntes);
    if (document.getElementById('UE').value != "") {
        document.getElementById('CT').value= unidadesEntrntes * costo;
    }else{
        document.getElementById('CT').value= parseFloat(0).toFixed(2);
       
    }
   
});

$('#Form_Registro').on('submit', function (e) {
    e.preventDefault();
    document.getElementById('CT').disabled =false
    let data = $("#Form_Registro").serialize()
    document.getElementById('CT').disabled =true
    let url ="";
    let metodo ="";
   if (_productoEnJuego == null) {
    url ='http://127.0.0.1:8000/api/NuevoProducto';
    metodo ='POST'
   }else{
    url ='http://127.0.0.1:8000/api/ActualizarProducto/'+_productoEnJuego.id;
    metodo ='PUT'
   }
   $.ajax({
    url:url,
    type: metodo,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data,
    success:  function(payload){
        if (payload != false) {
            $('#tbl_productos').DataTable().ajax.reload();
            Swal.fire(
            'Tarea realizada con éxito',
            'Click para continuar',
            'success'
            )
            $("#modal_form").modal('hide');
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Te faltaron algunos campos por llenar',
              })
        }
      
    },
    error: function(){
    }
});
});

function remove(id) {
    Swal.fire({
        title: 'Se Eliminará el producto con id: '+id,
        text: "¿Desea continuar?",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Continuar'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url:'http://127.0.0.1:8000/api/EliminarProducto/'+id,
                type: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: true,
                success:  function(payload){
                  $('#tbl_productos').DataTable().ajax.reload();
                  Swal.fire(
                    '¡Eliminado!',
                    'Se eliminó correctamente.',
                    'success'
                  );
                  $("#modal_form").modal('hide');
                },
                error: function(){
                }
            });
          
          
        }
      })
    
}

function salida(id) {
    _productoEnJuego= _listaProdcutos.find(e => e.id == id);

    if (_productoEnJuego.Unidades_Salientes < _productoEnJuego.Unidades_Entrantes) {
        document.getElementById('modal_titulo_salida').innerText= "Salida a tienda | "+_productoEnJuego.Producto;
        document.getElementById('UA').setAttribute('max',(_productoEnJuego.Unidades_Entrantes - _productoEnJuego.Unidades_Salientes));
        $("#modal_salida").modal('show');
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya no hay unidades para asignar en una salida',
          })
    }
    
}

$('#From_Salidas').on('submit', function (e) {
    e.preventDefault();
    let data = $("#From_Salidas").serialize();
    console.log(_productoEnJuego.id);
    $.ajax({
        url:'http://127.0.0.1:8000/api/GuardarSalida/'+_productoEnJuego.id,
        type: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data,
        success:  function(payload){
            if (payload != false) {
                $('#tbl_salidas').DataTable().ajax.reload();
                $('#tbl_productos').DataTable().ajax.reload();
                Swal.fire(
                    'Tarea realizada con éxito',
                    'Click para continuar',
                    'success'
                )
                $("#modal_salida").modal('hide');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Te faltaron algunos campos por llenar',
                  })
            }
          
        },
        error: function(){
        }
    });
});