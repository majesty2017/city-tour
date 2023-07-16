<?php

namespace App\Models;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

class Shop extends Model
{
    use HasFactory;

    public const IMAGE_PATH = 'assets/uploads/shops/';
    public const IMAGE_THUMB_PATH = 'assets/uploads/shops_thumb/';
    const ACTIVE_STATUS = 1;

    protected $guarded = ['logo_preview'];

    /**
     * @var string[]
     */
    public static array $rules = [
        'name'         => 'required|string|min:3|max:100',
        'address'      => 'string|max:200',
        'phone'        => 'required|string',
        'email'        => 'required|email',
        'status'       => 'required|numeric',
    ];

    /**
     * @param array $input
     * @return Builder|Model
     */
    final public function storeShop(array $input): Model|Builder
    {
        return self::query()->create($input);
    }

    /**
     * @return Collection
     */
    final public function getShopIdAndName(): Collection
    {
        return self::query()
            ->select('name', 'id', 'phone')
            ->where('status', self::ACTIVE_STATUS)
            ->get();
    }

    /**
     * @return BelongsTo
     */
    final public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    /**
     * @param array $input
     * @return LengthAwarePaginator
     */
    final public function shops(array $input): LengthAwarePaginator
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query();
        if (!empty($input['search'])) {
            $query->where('name', 'like', '%' . $input['search'] . '%')
            ->orWhere('phone', 'like', '%' . $input['search'] . '%')
            ->orWhere('email', 'like', '%' . $input['search'] . '%');
        }
        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'] ?? 'id', $input['direction'] ?? 'asc');
        }
        return $query->with('user:id,name')->paginate($per_page);
    }
}
