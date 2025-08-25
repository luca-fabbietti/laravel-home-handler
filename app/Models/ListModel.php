<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ListModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'lists';

    protected $fillable = [
        'name',
        'description',
        'created_by',
    ];

    /**
     * Get the user that created the list.
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the rows associated with the list.
     */
    public function rows()
    {
        return $this->hasMany(ListRow::class, 'list_id');
    }
    //
}
