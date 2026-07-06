<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $this->modifyColumns([
            ['news', 'image_url', 'TEXT NOT NULL'],
            ['events', 'image_url', 'TEXT NOT NULL'],
            ['events', 'url', 'TEXT NULL'],
            ['offices', 'url', 'TEXT NOT NULL'],
            ['documents', 'file_url', 'TEXT NOT NULL'],
            ['featured_videos', 'video_url', 'TEXT NOT NULL'],
            ['featured_videos', 'image_url', 'TEXT NOT NULL'],
            ['suggested_links', 'url', 'TEXT NOT NULL'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $this->modifyColumns([
            ['news', 'image_url', 'VARCHAR(500) NOT NULL'],
            ['events', 'image_url', 'VARCHAR(500) NOT NULL'],
            ['events', 'url', 'VARCHAR(500) NULL'],
            ['offices', 'url', "VARCHAR(500) NOT NULL DEFAULT '#'"],
            ['documents', 'file_url', 'VARCHAR(500) NOT NULL'],
            ['featured_videos', 'video_url', "VARCHAR(500) NOT NULL DEFAULT '#'"],
            ['featured_videos', 'image_url', 'VARCHAR(500) NOT NULL'],
            ['suggested_links', 'url', "VARCHAR(500) NOT NULL DEFAULT '#'"],
        ]);
    }

    /**
     * @param  array<int, array{0: string, 1: string, 2: string}>  $columns
     */
    private function modifyColumns(array $columns): void
    {
        if (DB::getDriverName() !== 'mysql') {
            return;
        }

        foreach ($columns as [$table, $column, $definition]) {
            DB::statement("ALTER TABLE `{$table}` MODIFY `{$column}` {$definition}");
        }
    }
};
