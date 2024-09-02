<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller {
    public ProductService $service;

    public function __construct(ProductService $service) {
        $this->service = $service;
    }

    public function getAllDataFromDatabase() {
        return $this->service->getAllDataFromDatabase();
    }
    /**
     * Create a newly resource in database.
     */
    public function createProductOnDatabase(Request $request) {
        return $this->service->createProductOnDatabase($request->all());
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateProductOnDatabase(Request $request, $uuid) {
        return $this->service->updateProductOnDatabase($request->all(), $uuid);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteProductFromDatabase(string $uuid) {
        return $this->service->destroyProductOnDatabase($uuid);
    }
}
