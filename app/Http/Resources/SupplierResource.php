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
 * @property mixed $user
 * @property mixed $created_at
 * @property mixed $updated_at
 * @property mixed $company_name
 * @property mixed $address
 * @property mixed $phone
 * @property mixed $email
 */

class SupplierResource extends JsonResource
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
            'status'       => $this->status == 1 ? 'Active' : 'Inactive',
            'logo'        => ImageManager::prepareImageUrl(Supplier::IMAGE_THUMB_PATH, $this->logo),
            'logo_full'   => ImageManager::prepareImageUrl(Supplier::IMAGE_PATH, $this->logo),
            'created_by'   => $this->user?->name,
            'created_at'   => $this->created_at->toDayDateTimeString(),
            'updated_at'   => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not updated yet',
        ];
    }
}
