<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientsAddress extends Model {
    use HasFactory;

    protected $fillable = [
        'cep',
        'street',
        'number',
        'district',
        'city',
        'state',
        'client_id',
    ];

    public function client() {
        return $this->belongsTo(Client::class, 'client_id', 'uuid');
    }
}
