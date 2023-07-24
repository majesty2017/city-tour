<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
      'name',
      'account_number',
      'status'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Builder[]|Collection
     */
    final public function getPaumentMethods(): Collection|array
    {
        return self::query()->select('id', 'name')->get();
    }
}
