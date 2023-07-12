<?php

namespace App\Models;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Supplier extends Model
{
    use HasFactory;

    public const IMAGE_PATH = 'assets/uploads/suppliers/';
    public const IMAGE_THUMB_PATH = 'assets/uploads/suppliers_thumb/';

    protected $guarded = ['logo_preview'];

    /**
     * @var string[]
     */
    public static array $rules = [
        'name' => 'required|string|min:3|max:100',
        'company_name' => 'required|string|min:3|max:100',
        'address' => 'string|max:200',
        'phone' => 'required|string',
        'email' => 'required|email',
        'status' => 'required|numeric',
    ];

    /**
     * @param array $input
     * @return Builder|Model
     */
    final public function storeSupplier(array $input): Model|Builder
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
     * @param array $input
     * @return LengthAwarePaginator
     */
    final public function suppliers(array $input): LengthAwarePaginator
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query();
        if (!empty($input['search'])) {
            $query->where('name', 'like', '%' . $input['search'] . '%');
        }
        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'] ?? 'id', $input['direction'] ?? 'asc');
        }
        return $query->with('user:id,name')->paginate($per_page);
    }
}
