<?php

namespace App\Services;

use App\Models\ClientsAddress;

class ClientAddressService {
    protected ClientsAddress $model;
    private bool $viewResponse = true;

    public function __construct(ClientsAddress $model = null) {
        $this->model = $model;
    }

    public function viewResponse(bool $status = null) {
        $this->viewResponse = ($status ?? ($this->viewResponse ?? true));

        return $this;
    }

    public function createResponse($message = null, $data = null, $errors = null, int $statusCode = null, bool $status = false, bool $breakCode = false) {
        $response = [];

        $response["message"] = $message;

        if (is_string($data)) $data = [$data];
        $response["data"] = $data;

        if (is_string($errors)) $errors = [$errors];
        $response["errors"] = $errors;

        $response["statusCode"] = $statusCode;

        if (!is_null($status)) $response["status"] = $status;

        if ($breakCode) {
            header("Content-Type: application/json");
            http_response_code($statusCode);
            echo json_encode($response);
            exit;
        }

        return response()->json($response, $statusCode);
    }

    public function success($message, $data = [], $statusCode = 200, $breakCode = true) {
        return $this->createResponse($message, $data, null, $statusCode, true, $breakCode);
    }
    public function notFound($messageError, $data = [], $breakCode = true) {
        return $this->createResponse("Nenhuma informação existente!", $data, $messageError, 404, false, $breakCode);
    }
    public function fail($messageError, $data = [], $statusCode = 400, $breakCode = true) {
        return $this->createResponse($messageError, $data, $messageError, $statusCode, false, $breakCode);
    }

    public function getAllDataFromDatabase($viewResponse = null) {
        $this->viewResponse($viewResponse);

        try {
            $all = $this->model->orderBy('id')->get();
            if ($all->count() > 0)
                return $this->success("Endereços dos clientes retornados.", $all, 200, false);

            return $this->notFound("Nenhum endereço de cliente retornado.", [], false);
        } catch (\Exception $e) {

            return $this->fail("Houve uma falha ao retornar os endereços de clientes", $e);
        }
    }

    public function createClientAddressOnDatabase(array $data, $viewResponse = null) {
        $this->viewResponse($viewResponse);
        try {
            $create = $this->model->create($data);
            if (!$create)
                return $this->notFound("Não foi possível cadastrar o endereço, favor verificar os dados.", [], false);

            return $this->success("Endereço de cliente cadastrado com sucesso.", $create, 200, false);
        } catch (\Exception $e) {

            return $this->fail("Falha ao inserir o cadastro do endereço cliente.", $e);
        }
    }
    public function updateClientAddressOnDatabase($data, $uuid, $viewResponse = null) {
        $this->viewResponse($viewResponse);

        if (!$this->model->where('uuid', $uuid)) {
            return $this->fail("uuid errado", [], false);
        }
        try {

            $update = $this->model->where('uuid', $uuid);
            if ($update->doesntExist())
                return $this->notFound("Enderço de cliente não encontrado, favor verificar as informações", [], false);

            $update = $update->first();
            foreach ($data as $key => $value) {
                if ($value !== null) $update->$key = $value;
            }
            if (!$update->save())
                return $this->notFound("Não foi possivel salvar as alterações do endereço.", [], false);

            return $this->success("Dados do enderço do cliente alterados com sucesso.", $data, 200, false);
        } catch (\Exception $e) {
            return $this->fail("Falha ao atualizar dados do endereço do cliente", $e);
        }
    }

    public function destroyClientAddressFromDatabase($uuid, $viewResponse = null) {
        $this->viewResponse($viewResponse);

        try {
            $destroy = $this->model->where('uuid', $uuid);
            if ($destroy->doesntExist())
                return $this->notFound("Endereço de cliente não encontrado, favor verificar as informações.", [], false);
            $destroy = $destroy->delete();
            if (!$destroy)
                return $this->notFound("Não foi possível excluir o endereço do cliente, favor verficiar as informações.", [], false);

            return $this->success("Endereço do cliente excluído com sucesso.", $destroy, 200, false);
        } catch (\Exception $e) {

            return $this->fail("Houve uma falha ao excluir o endereço de cliente.", $e);
        }
    }
}
