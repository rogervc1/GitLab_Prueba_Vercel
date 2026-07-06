<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('url', 500)->nullable()->after('image_url');
        });

        Schema::create('featured_videos', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->string('video_url', 500)->default('#');
            $table->string('image_url', 500);
            $table->string('duration', 20)->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('suggested_links', function (Blueprint $table) {
            $table->id();
            $table->string('title', 180);
            $table->text('description')->nullable();
            $table->string('icon_key', 80)->default('arrowRight');
            $table->string('url', 500)->default('#');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('institutional_metrics', function (Blueprint $table) {
            $table->id();
            $table->string('label', 120);
            $table->integer('value')->default(0);
            $table->string('suffix', 40)->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('institutional_metrics');
        Schema::dropIfExists('suggested_links');
        Schema::dropIfExists('featured_videos');

        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('url');
        });
    }
};
