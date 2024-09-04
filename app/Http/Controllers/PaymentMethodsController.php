<?php

namespace App\Http\Controllers;

use App\Services\PaymentMethodService;
use Illuminate\Http\Request;

class PaymentMethodsController extends Controller {
    public PaymentMethodService $service;
    public function __construct(PaymentMethodService $service) {
        $this->service = $service;
    }

    public function getAllDataFromDatabase() {
        return $this->service->getAllDataFromDatabase();
    }
    /**
     * Create a newly resource in database.
     */
    public function createPaymentMethodOnDatabase(Request $request) {
        return $this->service->createPaymentMethodsOnDatabase($request->all());
    }

    /**
     * Update the specified resource in storage.
     */
    public function updatePaymentMethodOnDatabase(Request $request, $id) {
        return $this->service->updatePaymentMethodsOnDatabase($request->all(), $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deletePaymentMethodFromDatabase(string $uuid) {
        return $this->service->destroyPaymentMethodsOnDatabase($uuid);
    }
}
