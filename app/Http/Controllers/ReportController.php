<?php

namespace App\Http\Controllers;

use App\Manager\PriceManager;
use App\Manager\ReportManager;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reportManager = new ReportManager();
        $report = [
            'total_product'   => $reportManager->total_product,
            'total_stock'     => $reportManager->total_stock,
            'low_stock'       => $reportManager->low_stock,
            'buy_value'       => PriceManager::priceFormat($reportManager->buy_stock_price),
            'sale_value'      => PriceManager::priceFormat($reportManager->sale_stock_price),
            'possible_profit' => PriceManager::priceFormat($reportManager->possible_profit),
            'total_sale' => PriceManager::priceFormat($reportManager->total_sale),
            'total_sale_today' => PriceManager::priceFormat($reportManager->total_sale_today),
            'total_purchase' => PriceManager::priceFormat($reportManager->total_purchase),
            'total_purchase_today' => PriceManager::priceFormat($reportManager->total_purchase_today),
        ];
        return response()->json($report);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
