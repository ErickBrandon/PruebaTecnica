<?php

namespace App\Models;

use App\Models\Salida;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Producto extends Model
{
    protected $table = 'productos';
    public $timestamps = false;

    public function salida(){
        return $this->hasMany(Salida::class);
    }
}
