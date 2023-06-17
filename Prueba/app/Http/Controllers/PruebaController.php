<?php

namespace App\Http\Controllers;

use App\Models\Salida;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PruebaController extends Controller
{   
    public function NuevoProducto(Request $request){
        if ($request->Codigo != null && $request->Producto !=null && $request->UE !=null && $request->CU!=null && $request->CT!=null) {
            DB::beginTransaction();
            $Fecha=date('Y/m/d');
            try {
                $nuevo = new Producto();
                $nuevo->Codigo =$request->Codigo;
                $nuevo->Producto =$request->Producto;
                $nuevo->Unidades_Entrantes= $request->UE;
                $nuevo->Costo_Unitario= $request->CU;
                $nuevo->Costo_Total= $request->CT;
                $nuevo->Fecha_Registro= $Fecha;
                $nuevo->save();
                DB::commit();
            } catch (\Throwable $th) {
                DB::rollback();
            }
            return $nuevo->id;
        }else{
            return false;
        }
        
    }
    public function update(Producto $producto,Request $request){
        if ($request->Codigo != null && $request->Producto !=null && $request->UE !=null && $request->CU!=null && $request->CT!=null) {
            DB::beginTransaction();
            $Fecha=date('Y/m/d');
            try {
                $producto->Codigo =$request->Codigo;
                $producto->Producto =$request->Producto;
                $producto->Unidades_Entrantes= $request->UE;
                $producto->Costo_Unitario= $request->CU;
                $producto->Costo_Total= $request->CT;
                $producto->Codigo;
                $producto->Ultima_Actualizacion= $Fecha;
                $producto->save();
                DB::commit();
            } catch (\Throwable $th) {
                DB::rollback();
            }
            return $producto;
        }else{
            return false;
        }
        
    }

    public function ListaProductos(){
        $productos = Producto::get();
        return datatables()->of($productos)->toJson();
    }

    public function Eliminar(Producto $producto){
        DB::beginTransaction();
       try {
        $producto->delete();
        
        DB::commit();

       } catch (\Throwable $th) {
        DB::rollback();

       }
    }

    function ListaSalidas() {
        $salidas = Salida::leftjoin('productos','productos.id','=','salidas.producto_id')
        ->select('salidas.id AS ID','Tienda','Unidades_Asignadas','salidas.Fecha_Registro AS FR','producto_id','Codigo','Producto');
        return datatables()->of($salidas)->toJson();
    }


    function GuardarSalida(Producto $Producto,Request $request) {
        if ($request->tienda != null &&  $request->tienda != null) {
            $Fecha=date('Y/m/d');
            DB::beginTransaction();
            try {
                $Producto->Unidades_Salientes = $Producto->Unidades_Salientes + $request->UA;
                $Producto->Ultima_Actualizacion = $Fecha;
                $Producto->save();
                
                $salida = new Salida();
                $salida->Tienda = $request->tienda;
                $salida->Unidades_Asignadas = $request->UA;
                $salida->Fecha_Registro = $Fecha;
                $salida->producto()->associate($Producto->id);
                $salida->save();
                DB::commit();
                return $salida;
            } catch (\Throwable $th) {
             DB::rollback();
             
            }
        }else{
            return false;
        }
        

    }
}
