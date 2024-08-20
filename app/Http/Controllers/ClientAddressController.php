<?php

namespace App\Http\Controllers;

use App\Services\ClientAddressService;
use Illuminate\Http\Request;

class ClientAddressController extends Controller {
    public ClientAddressService $service;

    public function __construct(ClientAddressService $service) {
        $this->service = $service;
    }
    public function getAllDataFromDatabase() {
        return $this->service->getAllDataFromDatabase();
    }

    /**
     * Create a newly resource in database.
     */
    public function createClientAddressOnDatabase(Request $request) {
        return $this->service->createClientAddressOnDatabase($request->all());
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateClientAddressOnDatabase(Request $request, $uuid) {
        return $this->service->updateClientAddressOnDatabase($request->all(), $uuid);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyClientAddressFromDatabase(string $uuid) {
        return $this->service->destroyClientAddressFromDatabase($uuid);
    }
}
