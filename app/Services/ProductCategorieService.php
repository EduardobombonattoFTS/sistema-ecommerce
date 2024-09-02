<?php

namespace App\Services;

use App\Models\ProductCategorie;

class ProductCategorieService {
    protected ProductCategorie $model;
    private bool $viewResponse = true;

    public function __construct(ProductCategorie $model = null) {
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
                return $this->success("Categorias de produtos retornados.", $all, 200, false);

            return $this->notFound("Nenhuma categorias de produtos encontrado.", [], 200, false);
        } catch (\Exception $e) {

            return $this->fail("Houve uma falha ao retornar as categorias de produtos", $e);
        }
    }
    public function createProductCategorieOnDatabase(array $data, $viewResponse = null) {
        $this->viewResponse($viewResponse);

        try {
            $create = $this->model->create($data);
            if (!$create)
                return $this->notFound("Não foi possível cadastrar a categorias de produtos, favor verificar os dados.", [], false);

            return $this->success("Categorias de produtos cadastrado com sucesso.", $create, 200, false);
        } catch (\Exception $e) {

            return $this->fail("Falha ao inserir o cadastro da categorias de produtos.", $e);
        }
    }
    public function updateProductCategorieOnDatabase($data, $id, $viewResponse = null) {
        $this->viewResponse($viewResponse);

        if (!$this->model->where('id', $id)) {
            return $this->fail("id errado", [], false);
        }
        try {

            $update = $this->model->where('id', $id);
            if ($update->doesntExist())
                return $this->notFound("Categorias de produtos não encontrado, favor verificar as informações", [], false);

            $update = $update->first();
            foreach ($data as $key => $value) {
                if ($value !== null) $update->$key = $value;
            }
            if (!$update->save())
                return $this->notFound("Não foi possivel salvar as alterações da categorias de produtos.", [], false);
            return $this->success("Dados da categorias de produtos alterados com sucesso.", $data, 200, false);
        } catch (\Exception $e) {
            return $this->fail("Falha ao atualizar dados da categorias de produtos", $e);
        }
    }

    public function destroyProductCategorieOnDatabase($id, $viewResponse = null) {
        $this->viewResponse($viewResponse);

        try {
            $destroy = $this->model->where('id', $id);
            if ($destroy->doesntExist())
                return $this->notFound("Categorias de produtos não encontrado, favor verificar as informações.", [], false);
            $destroy = $destroy->delete();
            if (!$destroy)
                return $this->notFound("Não foi possível excluir a categorias de produtos, favor verficiar as informações.", [], false);

            return $this->success("Categorias de produtos excluído com sucesso.", $destroy, 200, false);
        } catch (\Exception $e) {

            return $this->fail("Houve uma falha ao excluir a categorias de produtos.", $e);
        }
    }
}
