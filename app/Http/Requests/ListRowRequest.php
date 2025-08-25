<?php

namespace App\Http\Requests;

use App\Models\ListModel;
use Illuminate\Foundation\Http\FormRequest;

class ListRowRequest extends FormRequest
{
    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'list_id' => $this->route('list_id'),
            'row_id' => $this->route('row_id'),
        ]);
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return ListModel::where('id', $this->route('list_id'))->where('created_by', auth()->id())->exists();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'list_id' => 'required|integer|exists:lists,id',
        ];

        $storeOrUpdateRules = [
            'product_id' => 'required|integer|exists:products,id',
            'qty_value' => 'required|string',
            'qty_uom' => 'required|string',
        ];

        if ($this->isMethod('POST') || $this->isMethod('PUT')) {
            $rules = array_merge($rules, $storeOrUpdateRules);
        }

        return $rules;
    }
}
