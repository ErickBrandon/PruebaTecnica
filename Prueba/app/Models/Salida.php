<?php

namespace App\Models;

use App\Models\Producto;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Salida extends Model
{
    protected $table = 'salidas';
    public $timestamps = false;


    public function producto(){
        return $this->belongsTo(Producto::class);
    }
}
