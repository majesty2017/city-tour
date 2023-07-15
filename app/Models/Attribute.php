<?php

namespace App\Models;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Attribute extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'status', 'user_id'];

    public static array $rules = [
        'name' => 'required|string|min:3|max:255',
        'status' => 'required|numeric',
    ];

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
    final public function getAttributeIdAndName(): Collection
    {
        return self::query()
            ->select('name', 'id')
            ->with('value:id,name,attribute_id')
            ->get();
    }

    /**
     * @return HasMany
     */
    final public function value(): HasMany
    {
        return $this->hasMany(AttributeValue::class, 'attribute_id', 'id');
    }

    /***
     * @return LengthAwarePaginator
     */
    final public function getAttributeList(): LengthAwarePaginator
    {
        return self::query()
            ->with(['user', 'value', 'value.user:id,name'])
            ->orderBy('updated_at', 'desc')
            ->paginate(10);
    }
}
