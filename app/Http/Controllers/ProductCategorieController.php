<?php

namespace App\Http\Controllers;

use App\Services\ProductCategorieService;
use Illuminate\Http\Request;

class ProductCategorieController extends Controller {
    public ProductCategorieService $service;
    public function __construct(ProductCategorieService $service) {
        $this->service = $service;
    }
    public function getAllDataFromDatabase() {
        return $this->service->getAllDataFromDatabase();
    }
    /**
     * Create a newly resource in database.
     */
    public function createProductCategorieOnDatabase(Request $request) {
        return $this->service->createProductCategorieOnDatabase($request->all());
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateProductCategorieOnDatabase(Request $request, $id) {
        return $this->service->updateProductCategorieOnDatabase($request->all(), $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteProductCategorieFromDatabase(string $uuid) {
        return $this->service->destroyProductCategorieOnDatabase($uuid);
    }
}
