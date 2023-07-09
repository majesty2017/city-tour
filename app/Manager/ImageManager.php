<?php

namespace App\Manager;

use Illuminate\Contracts\Routing\UrlGenerator;
use Illuminate\Foundation\Application;
use Intervention\Image\Facades\Image;

class ImageManager
{
    public const DEFAULT_IMAGE = 'assets/img/default.webp';
    /**
     * @param string $name
     * @param int $width
     * @param int $height
     * @param string $path
     * @param string $file
     * @return string
     */
    final public static function uploadImage(string $name, int $width, int $height, string $path, string $file): string
    {
        $filename = $name.'.webp';
        Image::make($file)->fit($width, $height)->save(public_path($path).$filename, 50, 'webp');
        return $filename;
    }

    /**
     * @param $path
     * @param $img
     * @return void
     */
    final public static function deletePhoto($path, $image): void
    {
        $path = public_path($path).$image;
        if ($image != '' && file_exists($path)) {
            unlink($path);
        }
    }

    /**
     * @param string $path
     * @param string|null $image
     * @return string
     */
    final public static function prepareImageUrl(string $path, string | null $image): string
    {
        $url = url($path.$image);
        if (empty($image)) {
            $url = url(self::DEFAULT_IMAGE);
        }
        return $url;
    }
}
