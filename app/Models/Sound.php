<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Sound
 *
 * @property int $id
 * @property int|null $gameId
 * @property string $originalText
 * @property string $behavior
 * @property string $lang
 * @property string $translation
 * @property string $translationAccepted
 * @property string|null $groupName
 * @property string $fileName
 * @property int $isSpeech
 * @property string $gender
 * @property int $recorded
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Sound newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sound newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sound query()
 * @method static \Illuminate\Database\Eloquent\Builder|Sound whereBehavior($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sound whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sound whereFileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sound whereGameId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sound whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sound whereGroupName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sound whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sound whereIsSpeech($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sound whereLang($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sound whereOriginalText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sound whereRecorded($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sound whereTranslation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sound whereTranslationAccepted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sound whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $is_speech
 */
class Sound extends Model {
}
