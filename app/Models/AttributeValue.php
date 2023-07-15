<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AttributeValue extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'status', 'user_id', 'attribute_id'];

    /**
     * @return BelongsTo
     */
    final public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static array $rules = [
        'name' => 'required|string|min:3|max:255|unique:attribute_values,name',
        'status' => 'required|numeric',
    ];
}
