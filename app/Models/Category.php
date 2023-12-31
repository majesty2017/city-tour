<?php

namespace App\Models;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property mixed $photo
 */
class Category extends Model
{
    use HasFactory;

    public const IMAGE_PATH = 'assets/uploads/categories/';
    public const IMAGE_THUMB_PATH = 'assets/uploads/categories_thumb/';

    protected $guarded = ['photo_preview'];

    public static array $rules = [
        'name' => 'required|string|min:3|max:100',
        'slug' => 'required|string|min:3|max:100',
        'description' => 'string|max:200',
        'serial' => 'required|numeric',
        'status' => 'required|numeric',
    ];

    /**
     * @param array $input
     * @return Builder|Model
     */
    final public function storeCategory(array $input): Model|Builder
    {
        return self::query()->create($input);
    }

    /**
     * @return BelongsTo
     */
    final public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    final public function getCategoryIdAndName(): \Illuminate\Support\Collection
    {
        return self::query()->select('name', 'id')->get();
    }

    /**
     * @return LengthAwarePaginator
     */
    final public function categories(array $input): LengthAwarePaginator
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
