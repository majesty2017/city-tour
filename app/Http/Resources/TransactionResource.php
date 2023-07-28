<?php

namespace App\Http\Resources;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
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
            'amount' => $this->amount,
            'status' => $this->status == Transaction::SUCCESS ? 'Success' : 'Failed',
            'trx_id' => $this->trx_id,
            'visitor_name' => $this->visitor?->name,
            'visitor_phone' => $this->visitor?->phone,
            'payment_method_name' => $this->payment_method?->name,
            'account_number' => $this->payment_method?->account_number,
            'transaction_type' => $this->transaction_type == Transaction::CREDIT ? 'Credit' : 'Debit',
            'transaction_by' => $this->transactionable?->name,
            'created_at'   => $this->created_at->toDayDateTimeString(),
            'updated_at'   => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString() : 'Not updated yet',
        ];
    }
}
