<?php

namespace App\Http\Requests;

use App\Models\SaleManager;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreSaleManagerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name'       => 'required|string|min:3|max:100',
            'address'    => 'string|max:200',
            'phone'      => 'required|string',
            'nid_number' => 'required|string',
            'email'      => 'required|email',
            'password'   => [
                'required',
                'string',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
            'status'     => 'required|numeric',
            'shop_id'    => 'required|numeric',
        ];
    }
}
