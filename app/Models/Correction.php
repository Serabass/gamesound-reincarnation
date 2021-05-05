<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Correction
 *
 * @property int $id
 * @property int|null $soundId
 * @property int|null $gameId
 * @property string|null $originalText
 * @property string|null $translation
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|Correction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Correction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Correction query()
 * @method static \Illuminate\Database\Eloquent\Builder|Correction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Correction whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Correction whereGameId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Correction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Correction whereOriginalText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Correction whereSoundId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Correction whereTranslation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Correction whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Correction extends Model
{
    use HasFactory;
}
