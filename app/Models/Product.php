<?php

namespace App\Models;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    public const IMAGE_PATH = 'assets/uploads/products/';
    public const IMAGE_THUMB_PATH = 'assets/uploads/products_thumb/';
    public const ACTIVE_STATUS = 1;
    public const INACTIVE_STATUS = 0;

    protected $fillable = [
        'brand_id',
        'category_id',
        'sub_category_id',
        'supplier_id',
        'created_by_id',
        'updated_by_id',
        'cost',
        'description',
        'discount_fixed',
        'discount_percent',
        'name',
        'price',
        'sku',
        'slug',
        'status',
        'stock',
    ];

    public static array $rules = [
        'brand_id'         => 'required|numeric',
        'category_id'      => 'required|numeric',
        'sub_category_id'  => 'required|numeric',
        'supplier_id'      => 'required|numeric',
        'created_by_id'    => 'nullable|numeric',
        'updated_by_id'    => 'nullable|numeric',
        'cost'             => 'required|numeric',
        'description'      => 'nullable|string|min:10|max:1000',
        'discount_fixed'   => 'nullable|numeric',
        'discount_percent' => 'nullable|numeric',
        'name'             => 'required|string|min:3|max:255',
        'price'            => 'required|numeric',
        'sku'              => 'nullable|string|min:3|max:255|unique:products,sku',
        'slug'             => 'required|string|min:3|max:255',
        'status'           => 'required|numeric',
        'stock'            => 'required|numeric',
        'attributes'       => 'array',
    ];

    /**
     * @param array $input
     * @param int $auth_id
     * @return Builder|Model
     */
    final public function storeProduct(array $input): Builder|Model
    {
        return self::create($this->prepareData($input));
    }

    public function getAllProduct($columns = ['*']): Collection
    {
        $products = self::query()->select($columns)->get();
        return collect($products);
    }

    /**
     * @param array $input
     * @param int $auth_id
     * @return array
     */
    private function prepareData(array $input): array
    {
        return [
            'brand_id'         => $input['brand_id'] ?? 0,
            'category_id'      => $input['category_id'] ?? 0,
            'sub_category_id'  => $input['sub_category_id'] ?? 0,
            'supplier_id'      => $input['supplier_id'] ?? 0,
            'created_by_id'    => auth()->id(),
            'updated_by_id'    => auth()->id(),
            'cost'             => $input['cost'] ?? 0,
            'description'      => $input['description'] ?? '',
            'discount_end'     => $input['discount_end'] ?? null,
            'discount_fixed'   => $input['discount_fixed'] ?? 0,
            'discount_percent' => $input['discount_percent'] ?? 0,
            'discount_start'   => $input['discount_start'] ?? null,
            'name'             => $input['name'] ?? '',
            'price'            => $input['price'] ?? 0,
            'slug'             => $input['slug'] ? Str::slug($input['slug']) : '',
            'sku'              => $input['sku'] ?? '',
            'status'           => $input['status'] ?? 0,
            'stock'            => $input['stock'] ?? 0,
        ];
    }

    /**
     * @return BelongsTo
     */
    final public function created_by(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    /**
     * @return BelongsTo
     */
    final public function updated_by(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by_id');
    }

    /**
     * @return Collection
     */
    final public function getProductIdAndName(): Collection
    {
        return self::query()->select('name', 'id')->get();
    }

    /**
     * @param int $id
     * @return Builder|Collection|Model|null
     */
    final public function getProductById(int $id): Builder|Collection|Model|null
    {
        return self::query()->with('primary_photo')->findOrFail($id);
    }

    /**
     * @return LengthAwarePaginator
     */
    final public function getProducts(array $input): LengthAwarePaginator
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query()->with([
            'created_by:id,name',
            'updated_by:id,name',
            'category:id,name',
            'sub_category:id,name',
            'brand:id,name',
            'supplier:id,name,phone',
            'primary_photo',
            'product_attribute',
            'product_attribute.attributes',
            'product_attribute.attribute_value',
        ]);
        if (!empty($input['search'])) {
            $query->where('name', 'like', '%' . $input['search'] . '%');
            $query->orWhere('sku', 'like', '%' . $input['search'] . '%');
            $query->orWhere('price', 'like', '%' . $input['search'] . '%');
        }
        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'] ?? 'id', $input['direction'] ?? 'asc');
        }
        return $query->paginate($per_page);
    }

    public function photos()
    {
        return $this->hasMany(ProductPhoto::class)->where('is_primary', 0);
    }

    /**
     * @return BelongsTo
     */
    final public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return BelongsTo
     */
    final public function sub_category(): BelongsTo
    {
        return $this->belongsTo(SubCategory::class, 'sub_category_id');
    }

    /**
     * @return BelongsTo
     */
    final public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    /**
     * @return BelongsTo
     */
    final public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    /**
     * @return HasOne
     */
    final public function primary_photo(): HasOne
    {
        return $this->hasOne(ProductPhoto::class)->where('is_primary', 1);
    }

    /**
     * @return HasMany
     */
    final public function product_attribute(): HasMany
    {
        return $this->hasMany(ProductAttribute::class);
    }

}
