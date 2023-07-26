<?php

namespace App\Http\Resources;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $payment_status = 'Unpaid';
        if ($this->payment_status == Order::PAYMENT_STATUS_PAID) {
            $payment_status = 'Paid';
        } elseif ($this->payment_status == Order::PAYMENT_STATUS_PARTIALLY_PAID) {
            $payment_status = 'Partially Paid';
        }
        return [
            'id'                  => $this->id,
            'visitor_name'        => $this->visitor?->name,
            'visitor_phone'       => $this->visitor?->phone,
            'order_number'        => $this->order_number,
            'order_status'        => $this->order_status,
            'discount'            => $this->discount,
            'due_amount'          => $this->due_amount,
            'quantity'            => $this->quantity,
            'sub_total'           => $this->sub_total,
            'total'               => $this->total,
            'paid_amount'         => $this->paid_amount,
            'payment_method'      => $this->payment_method?->name,
            'sales_manager'       => $this->user?->name,
            'payment_status'      => $payment_status,
            'order_status_string' => $this->order_status == Order::STATUS_COMPLETED ? 'Completed' : 'Pending',
            'created_at'          => $this->created_at->toDayDateTimeString(),
            'updated_at'          => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not updated yet',
        ];
    }
}
