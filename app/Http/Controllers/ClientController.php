<?php

namespace App\Http\Controllers;

use App\Services\ClientService;
use Illuminate\Http\Request;

class ClientController extends Controller {
    public ClientService $service;

    public function __construct(ClientService $service) {
        $this->service = $service;
    }
    public function getAllDataFromDatabase() {
        return $this->service->getAllDataFromDatabase();
    }

    /**
     * Create a newly resource in database.
     */
    public function createClientOnDatabase(Request $request) {
        return $this->service->createClientOnDatabase($request->all());
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateClientOnDatabase(Request $request, $uuid) {
        return $this->service->updateClientOnDatabase($request->all(), $uuid);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteClientFromDatabase(string $uuid) {
        return $this->service->destroyClientOnDatabase($uuid);
    }
}
