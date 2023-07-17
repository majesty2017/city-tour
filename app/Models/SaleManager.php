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
}
