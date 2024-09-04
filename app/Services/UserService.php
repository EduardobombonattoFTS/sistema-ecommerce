<?php

namespace App\Services;

use App\Models\User;

class UserService {
    protected User $model;
    private bool $viewResponse = true;

    public function __construct(User $model = null) {
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
    public function notFound($messageError, $data = [], $statusCode = 404, $breakCode = true) {
        return $this->createResponse("Nenhuma informação existente!", $data, $messageError, $statusCode, false, $breakCode);
    }
    public function fail($messageError, $data = [], $statusCode = 400, $breakCode = true) {
        return $this->createResponse($messageError, $data, $messageError, $statusCode, false, $breakCode);
    }

    public function getAllDataFromDatabase($viewResponse = null) {
        $this->viewResponse($viewResponse);

        try {
            $all = $this->model->orderBy('id')->get();
            if ($all->count() > 0)
                return $this->success("usuarios retornados.", $all, 200, false);

            return $this->notFound("Nenhum usuarios encontrado.", [], 200, false);
        } catch (\Exception $e) {

            return $this->fail("Houve uma falha ao retornar os usuarios", $e);
        }
    }

    public function createUserOnDatabase(array $data, $viewResponse = null) {
        $this->viewResponse($viewResponse);

        try {
            $create = $this->model->create($data);
            if (!$create)
                return $this->notFound("Não foi possível cadastrar o usuarios, favor verificar os dados.", [], false);

            return $this->success("usuarios cadastrado com sucesso.", $create, 200, false);
        } catch (\Exception $e) {

            return $this->fail("Falha ao inserir o cadastro do usuarios.", $e);
        }
    }
    public function updateUserOnDatabase($data, $uuid, $viewResponse = null) {
        $this->viewResponse($viewResponse);

        if (!$this->model->where('uuid', $uuid)) {
            return $this->fail("uuid errado", [], false);
        }
        try {

            $update = $this->model->where('uuid', $uuid);
            if ($update->doesntExist())
                return $this->notFound("usuarios não encontrado, favor verificar as informações", [], false);

            $update = $update->first();
            foreach ($data as $key => $value) {
                if ($value !== null) $update->$key = $value;
            }
            if (!$update->save())
                return $this->notFound("Não foi possivel salvar as alterações do registro.", [], false);

            return $this->success("Dados do usuarios alterados com sucesso.", $data, 200, false);
        } catch (\Exception $e) {
            return $this->fail("Falha ao atualizar dados do usuarios", $e);
        }
    }

    public function destroyUserOnDatabase($uuid, $viewResponse = null) {
        $this->viewResponse($viewResponse);

        try {
            $destroy = $this->model->where('uuid', $uuid);
            if ($destroy->doesntExist())
                return $this->notFound("usuarios não encontrado, favor verificar as informações.", [], false);
            $destroy = $destroy->delete();
            if (!$destroy)
                return $this->notFound("Não foi possível excluir o usuarios, favor verficiar as informações.", [], false);

            return $this->success("usuarios excluído com sucesso.", $destroy, 200, false);
        } catch (\Exception $e) {

            return $this->fail("Houve uma falha ao excluir o usuarios.", $e);
        }
    }
}
