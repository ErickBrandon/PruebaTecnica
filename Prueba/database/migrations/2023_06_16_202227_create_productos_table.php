<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->String('Codigo');
            $table->String('Producto');
            $table->bigInteger('Unidades_Entrantes');
            $table->float('Costo_Unitario');
            $table->float('Costo_Total');
            $table->date('Fecha_Registro');
            $table->bigInteger('Unidades_Salientes')->default(0);
            $table->date('Ultima_Actualizacion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
