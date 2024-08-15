<?php

namespace App\Services;

use App\Models\User;

class UserService {
    protected User $model;

    public function __construct(User $model = null) {
        $this->model = $model;
    }
}
