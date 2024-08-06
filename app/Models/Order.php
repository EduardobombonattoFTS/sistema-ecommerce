<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model {
    use HasFactory;

    protected $fillable = [
        'client_id',
        'product_id',
        'user_id',
        'payment_method',
    ];

    public function clients() {
        return $this->belongsTo(Client::class, 'client_id', 'uuid');
    }

    public function products() {
        return $this->belongsToMany(Product::class, 'product_id', 'uuid')->withPivot('quantidade');
    }

    public function users() {
        return $this->belongsTo(User::class, 'user_id', 'uuid');
    }

    public function payment_methods() {
        return $this->belongsTo(PaymentMethod::class, 'payment_method', 'id');
    }
}
