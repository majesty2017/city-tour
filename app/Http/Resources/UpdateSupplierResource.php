<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed $id
 * @property mixed $name
 * @property mixed $slug
 * @property mixed $serial
 * @property mixed $description
 * @property mixed $status
 * @property mixed $logo
 * @property mixed $email
 * @property mixed $phone
 * @property mixed $address
 * @property mixed $company_name
 */

class UpdateSupplierResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'company_name' => $this->company_name,
            'address' => $this->address,
            'phone'     => $this->phone,
            'email' => $this->email,
            'status' => $this->status,
            'logo_preview' => ImageManager::prepareImageUrl(Supplier::IMAGE_THUMB_PATH, $this->logo),
        ];
    }
}
