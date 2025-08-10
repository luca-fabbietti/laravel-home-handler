<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'name',
        'description',
        'created_by',
    ];

    /**
     * Get the user that created the product.
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    /**
     * Get the lists that contain the product.
     */
    public function listRows()
    {
        return $this->hasMany(ListRow::class, 'product_id');
    }
}
