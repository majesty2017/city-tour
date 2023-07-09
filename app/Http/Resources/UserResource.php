<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email' => $this->email,
            'group' => $this->group,
            'phone' => $this->phone,
            'region' => $this->region,
            'city' => $this->city,
            'address' => $this->address,
            'nationality_status' => $this->nationality_status,
            'passport_id' => $this->passport_id,
            'next_place_of_visit' => $this->next_place_of_visit,
            'designation' => $this->designation,
            'gender' => $this->gender,
            'is_lead' => $this->is_lead,
            'is_visitor' => $this->is_visitor,
            'is_admin' => $this->is_admin,
            'is_superadmin' => $this->is_superadmin,
            'status' => $this->status,
            'image' => $this->image,
            'created_at' => $this->created_at->forHumans(),
        ];
    }
}
