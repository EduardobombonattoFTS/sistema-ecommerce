<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller {
    public UserService $service;

    public function __construct(UserService $service) {
        $this->service = $service;
    }
}