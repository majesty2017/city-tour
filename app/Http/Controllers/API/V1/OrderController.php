<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderDetailResource;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        return OrderResource::collection((new Order())->getOrders($request->all()));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        try {
            DB::beginTransaction();
            $order = (new Order())->placeOrder($request->all());
            DB::commit();
            return response()->json(['message' => 'Ticket sold successfully!']);
        } catch (\Throwable $e) {
            info('ORDER_PLACE_FAILED', ['message' => $e->getMessage(), $e]);
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()]);
        }
        // order
        // visitor
        // order product
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['visitor', 'payment_method', 'user', 'order_details']);
        return new OrderDetailResource($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
