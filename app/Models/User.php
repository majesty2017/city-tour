<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public const USER_IMAGE_PATH = 'assets/uploads/users/';
    public const USER_IMAGE_THUMB_PATH = 'assets/uploads/users_thumb/';

    const ACTIVE_STATUS = 1;
    const INACTIVE_STATUS = 0;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
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
        'nationality_status',
        'next_place_of_visit',
        'gender',
        'is_lead',
        'is_visitor',
        'is_manager',
        'is_admin',
        'region',
        'city',
        'designation',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password'          => 'hashed',
    ];


    /**
     * @param array $input
     * @return Builder|Model
     */
    final public function storeUser(array $input): Model|Builder
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
            'name'                => $input['name'] ?? '',
            'email'               => $input['email'] ?? '',
            'phone'               => $input['phone'] ?? '',
            'photo'               => $input['photo'] ?? '',
            'nid_photo'           => $input['nid_photo'] ?? '',
            'address'             => $input['address'] ?? '',
            'nid_number'          => $input['nid_number'] ?? '',
            'user_id'             => auth()->id(),
            'status'              => $input['status'],
            'password'            => bcrypt($input['password']),
            'gender'              => $input['gender'] ?? null,
        ];
    }


    /**
     * @param array $input
     * @return Builder|Model
     */
    final public function storeVisitor(array $input): Model|Builder
    {
        return self::create($this->prepareVisitorData($input));
    }

    /**
     * @param array $input
     * @param int $auth_id
     * @return array
     */
    private function prepareVisitorData(array $input): array
    {
        return [
            'name'                => $input['name'] ?? '',
            'email'               => $input['email'] ?? '',
            'phone'               => $input['phone'] ?? '',
            'photo'               => $input['photo'] ?? '',
            'nid_photo'           => $input['nid_photo'] ?? '',
            'address'             => $input['address'] ?? '',
            'nid_number'          => $input['nid_number'] ?? '',
            'user_id'             => auth()->id(),
            'shop_id'             => $input['shop_id'],
            'status'              => $input['status'],
            'password'            => bcrypt($input['password']),
            'nationality_status'  => $input['nationality_status'] ?? null,
            'next_place_of_visit' => $input['next_place_of_visit'] ?? null,
            'gender'              => $input['gender'] ?? null,
            'is_lead'             => $input['is_lead'] ?? 0,
            'is_visitor'          => 1,
            'region'              => $input['region'] ?? null,
            'city'                => $input['city'] ?? null,
            'designation'         => $input['designation'] ?? null,
        ];
    }


    /**
     * @param array $input
     * @return Builder|Model
     */
    final public function storeSalesManager(array $input): Model|Builder
    {
        return self::create($this->prepareSalesManagerData($input));
    }

    /**
     * @param array $input
     * @param int $auth_id
     * @return array
     */
    private function prepareSalesManagerData(array $input): array
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
            'is_visitor' => 0,
            'is_manager' => 1,
        ];
    }

    /**
     * @return Model|Builder|null
     */
    final public function getAuthUser(): Model|Builder|null
    {
        return self::query()->where('id', auth()->id())->first();
    }

    /**
     * @return Collection
     */
    final public function getUserIdAndName(): Collection
    {
        return self::query()
            ->select('name', 'id', 'phone')
            ->where('is_admin', self::ACTIVE_STATUS)
            ->where('status', self::ACTIVE_STATUS)
            ->get();
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
    final public function getUsers(array $input): LengthAwarePaginator
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query()->where('is_admin', self::ACTIVE_STATUS)
            ->where('is_superadmin', 0);
        if (!empty($input['search'])) {
            $query->where('name', 'like', '%' . $input['search'] . '%');
        }
        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'] ?? 'id', $input['direction'] ?? 'asc');
        }
        return $query->paginate($per_page);
    }


    /**
     * @param array $input
     * @return LengthAwarePaginator
     */
    final public function salesManager(array $input): LengthAwarePaginator
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query()->with('shop:id,name')->where('is_manager', self::ACTIVE_STATUS)
            ->where('is_superadmin', 0);
        if (!empty($input['search'])) {
            $query->where('name', 'like', '%' . $input['search'] . '%');
        }
        if (!empty($input['order_by'])) {
            $query->orderBy($input['order_by'] ?? 'id', $input['direction'] ?? 'asc');
        }
        return $query->paginate($per_page);
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
}
