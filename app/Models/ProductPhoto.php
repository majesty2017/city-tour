<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductPhoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'photo',
        'is_primary'
    ];

    public const IMAGE_PATH = 'assets/uploads/products/';
    public const IMAGE_THUMB_PATH = 'assets/uploads/products_thumb/';

    public const IMAGE_WIDTH = 800;
    public const IMAGE_THUMB_WIDTH = 200;

    public const IMAGE_HEIGHT = 800;
    public const IMAGE_THUMB_HEIGHT = 200;

    /**
     * @param array $photo
     * @return mixed
     */
    final public function storeProductPhoto(array $photo): mixed
    {
        return self::create($photo);
    }
}
