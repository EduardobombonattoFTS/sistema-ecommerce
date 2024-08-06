<?php

namespace App\Models;

use App\Traits\STRUUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model {
    use HasFactory, STRUUID;

    protected $fillable = [
        'uuid',
        'name',
        'details',
        'description',
        'quantity_in_stock',
        'categorie_id',
    ];

    public function product_categories() {
        return $this->belongsTo(ProductCategorie::class, 'categorie_id', 'id');
    }

    public function orders() {
        return $this->belongsToMany(Order::class, 'product_id', 'uuid')->withPivot('quantity_in_stock');
    }
}
