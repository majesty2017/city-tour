<?php

namespace App\Models;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

class Product extends Model
{
    use HasFactory;

    public const IMAGE_PATH = 'assets/uploads/products/';
    public const IMAGE_THUMB_PATH = 'assets/uploads/products_thumb/';

    protected $guarded = [];

    public static array $rules = [
        'name' => 'required|string|min:3|max:100',
        'slug' => 'required|string|min:3|max:100',
        'description' => 'string|max:200',
        'serial' => 'required|numeric',
        'status' => 'required|numeric',
    ];

    /**
     * @param array $input
     * @param int $auth_id
     * @return Builder|Model
     */
    final public function storeProduct(array $input, int $auth_id): Builder|Model
    {
        return self::create($this->prepareData($input, $auth_id));
    }

    /**
     * @param array $input
     * @param int $auth_id
     * @return array
     */
    private function prepareData(array $input, int $auth_id): array
    {
        return [
            'brand_id' => $input['brand_id'] ?? '',
            'category_id' => $input['category_id'] ?? '',
            'sub_category_id' => $input['sub_category_id'] ?? '',
            'supplier_id' => $input['supplier_id'] ?? '',
            'created_by_id' => $auth_id,
            'updated_by_id' => $auth_id,
            'cost' => $input['cost'] ?? '',
            'description' => $input['description'] ?? '',
            'discount_end' => $input['discount_end'] ?? '',
            'discount_fixed' => $input['discount_fixed'] ?? '',
            'discount_percent' => $input['discount_percent'] ?? '',
            'discount_start' => $input['discount_start'] ?? '',
            'name' => $input['name'] ?? '',
            'price' => $input['price'] ?? '',
            'sku' => $input['sku'] ?? '',
            'slug' => $input['slug'] ?? '',
            'status' => $input['status'] ?? '',
            'stock' => $input['stock'] ?? '',
        ];
    }

    /**
     * @return BelongsTo
     */
    final public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return Collection
     */
    final public function getProductIdAndName(): Collection
    {
        return self::query()->select('name', 'id')->get();
    }

    /**
     * @return LengthAwarePaginator
     */
    final public function getProducts(array $input): LengthAwarePaginator
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query();
        if (!empty($input['search'])) {
            $query->where('name', 'like', '%'.$input['search'].'%');
        }
        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'] ?? 'id', $input['direction'] ?? 'asc');
        }
        return $query->with('user:id,name')->paginate($per_page);
    }

}
