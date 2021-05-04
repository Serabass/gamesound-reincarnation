<?php

namespace App\Http\Controllers;

use App\Models\Sound;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller {
  public function index(Request $request) {
    $pageSize = 100;
    $page = $request->input('page');
    $query = $request->input('query', '');
    $onlyEmpty = $request->input('onlyEmpty', 0);
    $sounds = Sound::whereIsSpeech(true)
      ->where('originalText', 'LIKE', '%' . $query . '%');

    $groupNames = Sound::select('groupName')->groupBy('groupName')->pluck('groupName');
    $langs = Sound::select('lang')->groupBy('lang')->pluck('lang');

    if ($onlyEmpty) {
      $sounds = $sounds->where('originalText', '=', '');
    }

    return Inertia::render('Pages/Index', [
      'sounds'     => $sounds->paginate($pageSize),
      'page'       => $page,
      'query'      => $query,
      'onlyEmpty'  => $onlyEmpty,
      'pageSize'   => $pageSize,
      'groupNames' => $groupNames,
      'langs'      => $langs,
    ]);
  }
}
