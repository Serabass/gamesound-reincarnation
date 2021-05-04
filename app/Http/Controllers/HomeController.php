<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Sound;
use Inertia\Inertia;

class HomeController extends Controller {
  public function index() {
    $sounds = Sound::whereIsSpeech(true)->paginate();
    return Inertia::render('Pages/Index', [
      'sounds' => $sounds,
    ]);
  }
}
