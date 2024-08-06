<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategorie extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];
    public function produtcs() {
        return $this->hasMany(Product::class, 'categorie_id', 'id');
    }
}
