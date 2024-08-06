<?php

namespace App\Models;

use App\Traits\STRUUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model {
    use HasFactory, STRUUID;
    protected $fillable = [
        'uuid',
        'cpf',
        'name',
        'email',
        'phone'
    ];

    public function address() {
        return $this->hasOne(ClientsAddress::class, 'client_id', 'uuid');
    }

    public function orders() {
        return $this->hasMany(Order::class, 'client_id', 'uuid');
    }
}
