<?php

namespace App\Http\Controllers;

use App\Models\Correction;
use App\Models\Sound;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller {
  public function index(Request $request) {
    $pageSize = 100;
    $page = $request->input('page');
    $filters = $request->input('filters');

    $langFilters = \Arr::wrap($filters['lang']);

    $query = $request->input('query', '');
    $groupName = $request->input('groupName', '');
    $onlyEmpty = $request->input('onlyEmpty', 0);
    $sounds = Sound::whereIsSpeech(true)
      ->where('originalText', 'LIKE', '%' . $query . '%');

    $groupNames = Sound::select('groupName')->groupBy('groupName')->pluck('groupName');
    $langs = Sound::select('lang')->groupBy('lang')->pluck('lang');

    if ($onlyEmpty) {
      $sounds = $sounds->where('originalText', '=', '');
    }

    if (! empty($groupName)) {
      $sounds = $sounds->where('groupName', 'LIKE', '%' . $groupName . '%');
    }

    if (! empty($langFilters)) {
      $sounds = $sounds->whereIn('lang', $langFilters);
    }

    $stats = [
      'doubtful' => Sound::where('originalText', 'LIKE', '%(?)%')->count()
    ];

    return Inertia::render('Pages/Index', [
      'sounds'      => $sounds->paginate($pageSize),
      'stats'       => $stats,
      'page'        => $page,
      'query'       => $query,
      'onlyEmpty'   => $onlyEmpty,
      'pageSize'    => $pageSize,
      'groupName'   => $groupName,
      'groupNames'  => $groupNames,
      'langs'       => $langs,
      'langFilters' => $langFilters,
    ]);
  }

  public function saveCorrection(Request $request) {
    $id = $request->get('id');
    $originalText = $request->get('originalText');
    $cor = new Correction();
    $cor->originalText = $originalText;
    $cor->translation = '';
    $cor->gameId = 1;
    $cor->soundId = $id;
    $cor->save();
  }
}
