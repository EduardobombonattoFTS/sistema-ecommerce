<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller {
    public OrderService $service;

    public function __construct(OrderService $service) {
        $this->service = $service;
    }

    public function getAllDataFromDatabase() {
        return $this->service->getAllDataFromDatabase();
    }
    /**
     * Create a newly resource in database.
     */
    public function createOrderOnDatabase(Request $request) {
        return $this->service->createOrderOnDatabase($request->all());
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateOrderOnDatabase(Request $request, $uuid) {
        return $this->service->updateOrderOnDatabase($request->all(), $uuid);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteOrderFromDatabase(string $uuid) {
        return $this->service->destroyOrderOnDatabase($uuid);
    }
}
