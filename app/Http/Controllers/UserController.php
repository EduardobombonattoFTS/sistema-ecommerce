<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller {
    public UserService $service;

    public function __construct(UserService $service) {
        $this->service = $service;
    }
    public function getAllDataFromDatabase() {
        return $this->service->getAllDataFromDatabase();
    }

    /**
     * Create a newly resource in database.
     */
    public function createUserOnDatabase(Request $request) {
        return $this->service->createUserOnDatabase($request->all());
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateUserOnDatabase(Request $request, $uuid) {
        return $this->service->updateUserOnDatabase($request->all(), $uuid);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteUserFromDatabase(string $uuid) {
        return $this->service->destroyUserOnDatabase($uuid);
    }
}
