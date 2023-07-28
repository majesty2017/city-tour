<?php

namespace App\Models;

use App\Manager\OrderManager;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Transaction extends Model
{
    use HasFactory;

    public const CREDIT = 1;
    public const DEBIT = 2;

    public const SUCCESS = 1;
    public const FAILED = 2;

    protected $guarded = [];

    /**
     * @return MorphTo
     */
    final public function transactionable(): MorphTo
    {
        return $this->morphTo();
    }

    public function storeTransaction(array $input, $order)
    {
        return self::query()->create($this->prepareData($input, $order));
    }

    public function visitor()
    {
        return $this->belongsTo(Visitor::class);
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function payment_method()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function prepareData(array $input, $order)
    {
        return [
          'order_id' => $order?->id ?? 0 ,
          'trx_id' => OrderManager::generateOrderNumber(1000000000, 9999999999),
          'visitor_id' => $input['order_summary']['visitor_id'] ?? 0,
          'payment_method_id' => $input['order_summary']['payment_method_id'],
          'amount' => $input['order_summary']['paid_amount'],
          'transaction_type' => self::CREDIT,
          'status' => self::SUCCESS,
          'transactionable_type' => Visitor::class,
          'transactionable_id' => auth()->id(),
        ];
    }
}
