<?php

// Preload Composer's autoload
require __DIR__.'/vendor/autoload.php';

// Preload all vendor PHP files
$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator(__DIR__.'/vendor', RecursiveDirectoryIterator::SKIP_DOTS)
);

foreach ($iterator as $file) {
    if ($file->isFile() && $file->getExtension() === 'php') {
        try {
            opcache_compile_file($file->getPathname());
        } catch (Throwable $e) {
            // Skip files that can't be preloaded
        }
    }
}
