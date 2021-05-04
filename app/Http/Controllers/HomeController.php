<?php

namespace App\Http\Controllers;

use App\Models\Sound;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller {
  public function index(Request $request) {
    $page = $request->input('page');
    $query = $request->input('query', '');
    $sounds = Sound::whereIsSpeech(true)
      ->where('originalText', 'LIKE', '%' . $query . '%')
      ->paginate(10);
    return Inertia::render('Pages/Index', [
      'sounds' => $sounds,
      'page' => $page,
      'query' => $query,
    ]);
  }
}
