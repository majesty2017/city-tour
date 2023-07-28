<?php

namespace App\Models;

use App\Manager\OrderManager;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    public const STATUS_PENDING = 1;
    public const STATUS_PROCESSED = 2;
    public const STATUS_COMPLETED = 3;

    public const PAYMENT_STATUS_PAID = 1;
    public const PAYMENT_STATUS_PARTIALLY_PAID = 2;
    public const PAYMENT_STATUS_UNPAID = 3;

    /**
     * @return LengthAwarePaginator
     */
    final public function getOrders(array $input): LengthAwarePaginator
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query()->with(['user:id,name', 'visitor:id,name,phone', 'payment_method:id,name']);
        if (!empty($input['search'])) {
            $query->where('order_number', 'like', '%' . $input['search'] . '%')
            ->orWhere('user:name', 'like', '%' . $input['search'] . '%')
            ->orWhere('visitor:name', 'like', '%' . $input['search'] . '%');
        }
        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'] ?? 'id', $input['direction'] ?? 'asc');
        }
        return $query->paginate($per_page);
    }

    final public function visitor(): BelongsTo
    {
        return $this->belongsTo(Visitor::class);
    }

    public function payment_method(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function order_details(): HasMany
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     *
     */
    final public function placeOrder(array $input)
    {
        $order_data = $this->prepareData($input);
        if (isset($order_data['error_description'])) {
            return $order_data;
        }
        $order = self::query()->create($order_data['order_data']);
        (new OrderDetail())->storeOrderDetail($order_data['order_details'], $order);
        (new Transaction())->storeTransaction($input, $order);
        return $order;
    }

    /**
     * @param array $input
     * @return array
     */
    final public function prepareData(array $input): array
    {
        $price = OrderManager::handle_order_data($input);
        if (isset($price['description'])) {
            return $price;
        } else {
            $order_data = [
                'visitor_id'        => $input['order_summary']['visitor_id'] ?? 0,
                'user_id'           => auth()->id(),
                'quantity'          => $price['quantity'] ?? 0,
                'order_status'      => self::STATUS_COMPLETED,
                'paid_amount'       => $input['order_summary']['paid_amount'],
                'due_amount'        => $input['order_summary']['due_amount'],
                'sub_total'         => $price['sub_total'],
                'discount'          => $price['discount'],
                'total'             => $price['total'],
                'order_number'      => OrderManager::generateOrderNumber(10000000, 99999999),
                'payment_method_id' => $input['order_summary']['payment_method_id'],
                'payment_status'    => OrderManager::decidePaymentStatus($price['total'], $input['order_summary']['paid_amount']),
            ];
            return ['order_data' => $order_data, 'order_details' =>$price['order_details']];
        }
    }
}
