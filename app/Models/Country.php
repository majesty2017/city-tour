<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * @return Collection|Builder[]
     */
    final public function getCountries(): array|Collection
    {
        return self::query()->select(['name', 'id'])->get();
    }
}
