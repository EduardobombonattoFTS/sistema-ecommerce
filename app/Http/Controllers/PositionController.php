<?php

namespace App\Http\Controllers;

use App\Services\PositionService;
use Illuminate\Http\Request;

class PositionController extends Controller {
    public PositionService $service;
    public function __construct(PositionService $service) {
        $this->service = $service;
    }

    public function getAllDataFromDatabase() {
        return $this->service->getAllDataFromDatabase();
    }
    /**
     * Create a newly resource in database.
     */
    public function createPositionOnDatabase(Request $request) {
        return $this->service->createPositionOnDatabase($request->all());
    }

    /**
     * Update the specified resource in storage.
     */
    public function updatePositionOnDatabase(Request $request, $id) {
        return $this->service->updatePositionOnDatabase($request->all(), $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deletePositionFromDatabase(string $uuid) {
        return $this->service->destroyPositionOnDatabase($uuid);
    }
}
