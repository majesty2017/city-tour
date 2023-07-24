<?php

namespace App\Models;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

class Visitor extends Model
{
    use HasFactory;

    public const IMAGE_PATH = 'assets/uploads/visitors/';
    public const IMAGE_THUMB_PATH = 'assets/uploads/visitors_thumb/';
    const ACTIVE_STATUS = 1;

    protected $guarded = ['photo_preview'];

    /**
     * @var string[]
     */
    public static array $rules = [
        'name' => 'required|string|min:3|max:100',
        'gender' => 'required|string|min:3|max:100',
        'address' => 'string|max:200',
        'phone' => 'required|string',
        'email' => 'required|email',
        'status' => 'required|numeric',
    ];

    /**
     * @param array $input
     * @return Builder|Model
     */
    final public function storeVisitor(array $input): Model|Builder
    {
        return self::query()->create($this->prepareData($input));
    }

    /**
     * @param array $input
     * @return array
     */
    final public function prepareData(array $input): array
    {
        return [
            'name' => $input['name'] ?? '',
            'email' => $input['email'] ?? '',
            'phone' => $input['phone'] ?? '',
            'nid_photo'  => $input['nid_photo'] ?? '',
            'address'    => $input['address'] ?? '',
            'nid_number' => $input['nid_number'] ?? '',
            'user_id'    => auth()->id(),
            'status'     => $input['status'] ?? 1,
            'gender'     => $input['gender'] ?? null,
        ];
    }

    /**
     * @return Collection
     */
    final public function getVisitorIdAndName(): Collection
    {
        return self::query()
            ->select('name', 'id')
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
    final public function visitors(array $input): LengthAwarePaginator
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query();
        if (!empty($input['search'])) {
            $query->where('name', 'like', '%' . $input['search'] . '%');
            $query->orWhere('phone', 'like', '%' . $input['search'] . '%');
            $query->orWhere('email', 'like', '%' . $input['search'] . '%');
        }
        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'] ?? 'id', $input['direction'] ?? 'asc');
        }
        return $query->with('user:id,name')->paginate($per_page);
    }


    /**
     * @param array $search
     * @return Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getVisitors(array $search): \Illuminate\Database\Eloquent\Collection|array
    {
        return self::query()->select('id', 'name', 'phone')
            ->where('name', 'like', '%' . $search['search'] . '%')
            ->orWhere('phone', 'like', '%' . $search['search'] . '%')
            ->take(10)->get();
    }
}
