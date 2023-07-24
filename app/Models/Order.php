<?php

namespace App\Models;

use App\Manager\OrderManager;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    public const STATUS_PENDING = 1;
    public const STATUS_PROCESSED = 2;
    public const STATUS_COMPLETED = 3;

    /**
     * @param array $input
     * @return Builder|Model|array
     */
    final public function placeOrder(array $input): Builder|Model|array
    {
        $order_data = $this->prepareData($input);
        if (isset($order_data['error_description'])) {
            return $order_data;
        }
        $order = self::query()->create($order_data['order_data']);
        return (new OrderDetail())->storeOrderDetail($order_data['order_details'], $order);
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
                'quantity'          => $price['quantity'],
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
