<?php
// Preload Composer's autoload
require __DIR__ . '/vendor/autoload.php';

// Preload Laravel core files
foreach (glob(__DIR__ . '/vendor/laravel/framework/src/Illuminate/**/*.php') as $file) {
    opcache_compile_file($file);
}