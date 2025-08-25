<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ListRow extends Model
{
    use hasFactory;
    use SoftDeletes;

    protected $fillable = [
        'list_id',
        'product_id',
        'qty_value',
        'qty_uom',
        'completed',
        'created_by',
    ];

    /**
     * Get the list that owns the row.
     */
    public function list()
    {
        return $this->belongsTo(ListModel::class, 'list_id');
    }

    /**
     * Get the product associated with the row.
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    /**
     * Get the user that created the row.
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    //
}
