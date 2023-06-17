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
        Schema::create('salidas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->String('Tienda');
            $table->bigInteger('Unidades_Asignadas');
            $table->date('Fecha_Registro');
            $table->unsignedBigInteger('producto_id')->nullable();


            $table->foreign('producto_id')
            ->references('id')->on('productos')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salidas');
    }
};
