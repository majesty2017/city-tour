<?php

namespace App\Manager;

use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class ReportManager
{
    public const LOW_STOCK_ALERT = 5;
    public int $total_product = 0;
    public int $total_stock = 0;
    public int $low_stock = 0;
    public int $buy_stock_price = 0;
    public int $sale_stock_price = 0;
    public int $possible_profit = 0;
    public int $total_sale = 0;
    public int $total_sale_today = 0;
    public int $total_purchase = 0;
    public int $total_purchase_today = 0;

    private Collection $products;
    private Collection $orders;

    public function __construct()
    {
        $this->getProducts();
        $this->setTotalProduct();
        $this->calculateStock();
        $this->findLowStock();
        $this->calculateBuyStockPrice();
        $this->calculateSaleStockPrice();
        $this->calculatePossibleProfit();
        $this->getOrders();
        $this->calculateTotalSale();
        $this->calculateTotalSaleToday();
        $this->calculateTotalPurchase();
        $this->calculateTotalPurchaseToday();
    }

    private function getProducts()
    {
        $this->products = (new Product())->getAllProduct();
    }

    private function setTotalProduct(): void
    {
        $this->total_product = count($this->products);
    }

    private function calculateStock()
    {
        $this->total_stock = $this->products->sum('stock');
    }

    private function findLowStock()
    {
        $this->low_stock = $this->products->where('stock', '<=', self::LOW_STOCK_ALERT)->count();
    }

    private function calculateBuyStockPrice()
    {
        foreach ($this->products as $product) {
            $this->buy_stock_price += ($product->cost * $product->stock);
        }
    }

    private function calculateSaleStockPrice()
    {
        foreach ($this->products as $product) {
            $this->sale_stock_price += ($product->price * $product->stock);
        }
    }

    private function calculateTotalPurchase()
    {
        $this->total_purchase = $this->buy_stock_price;
    }

    private function calculateTotalPurchaseToday()
    {
        $product_buy_today = $this->products->whereBetween('created_at', [Carbon::today()->startOfDay(), Carbon::today()->endOfDay()]);
        foreach ($product_buy_today as $product) {
            $this->total_purchase_today = ($product->cost * $product->stock);;
        }
    }

    private function calculatePossibleProfit()
    {
        $this->possible_profit = $this->sale_stock_price - $this->buy_stock_price;
    }

    private function getOrders()
    {
        $this->orders = (new Order())->getOrdersReport();
    }

    private function calculateTotalSale()
    {
        $this->total_sale = $this->orders->sum('total');
    }

    private function calculateTotalSaleToday()
    {
        $this->total_sale_today = $this->orders->whereBetween('created_at', [Carbon::today()->startOfDay(), Carbon::today()->endOfDay()])->sum('total');
    }
}
