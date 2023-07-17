<?php

namespace App\Models;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

class SaleManager extends Model
{
    use HasFactory;

    public const IMAGE_PATH = 'assets/uploads/sales_managers/';
    public const IMAGE_THUMB_PATH = 'assets/uploads/sales_managers_thumb/';
    const ACTIVE_STATUS = 1;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'photo',
        'nid_photo',
        'address',
        'nid_number',
        'user_id',
        'shop_id',
        'status',
        'password',
    ];


    /**
     * @param array $input
     * @return Builder|Model
     */
    final public function storeSalesManager(array $input): Model|Builder
    {
        return self::create($this->prepareData($input));
    }

    /**
     * @param array $input
     * @param int $auth_id
     * @return array
     */
    private function prepareData(array $input): array
    {
        return [
            'name'       => $input['name'] ?? '',
            'email'      => $input['email'] ?? '',
            'phone'      => $input['phone'] ?? '',
            'photo'      => $input['photo'] ?? '',
            'nid_photo'  => $input['nid_photo'] ?? '',
            'address'    => $input['address'] ?? '',
            'nid_number' => $input['nid_number'] ?? '',
            'user_id'    => auth()->id(),
            'shop_id'    => $input['shop_id'],
            'status'     => $input['status'],
            'password'   => bcrypt($input['password']),
        ];
    }

    /**
     * @return Collection
     */
    final public function getSaleManagerIdAndName(): Collection
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
     * @return BelongsTo
     */
    final public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class);
    }


    /**
     * @param array $input
     * @return LengthAwarePaginator
     */
    final public function salesManager(array $input): LengthAwarePaginator
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query()->with(['user:id,name', 'shop:id,name']);
        if (!empty($input['search'])) {
            $query->where('name', 'like', '%' . $input['search'] . '%');
        }
        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'] ?? 'id', $input['direction'] ?? 'asc');
        }
        return $query->paginate($per_page);
    }
}
