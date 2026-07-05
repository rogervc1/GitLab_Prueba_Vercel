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
        Schema::table('users', function (Blueprint $table) {
            $table->string('full_name')->nullable()->after('email');
            $table->string('password_hash')->nullable()->after('password');
            $table->boolean('is_active')->default(true)->after('password_hash');
        });

        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->text('description');
            $table->string('image_url', 500);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->text('description');
            $table->date('event_date')->index('ix_events_event_date');
            $table->string('location', 255);
            $table->string('image_url', 500);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        Schema::create('document_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120);
            $table->string('slug', 140)->unique();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('institutional_sections', function (Blueprint $table) {
            $table->id();
            $table->string('key', 80)->unique();
            $table->string('title', 180);
            $table->text('body');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('offices', function (Blueprint $table) {
            $table->id();
            $table->string('title', 180);
            $table->text('description');
            $table->string('icon_key', 80);
            $table->string('url', 500)->default('#');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key', 120)->unique();
            $table->text('value');
        });

        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->foreignId('category_id')->constrained('document_categories');
            $table->date('published_date')->index('ix_documents_published_date');
            $table->string('format', 20);
            $table->string('file_size', 40);
            $table->string('file_url', 500);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
        Schema::dropIfExists('site_settings');
        Schema::dropIfExists('offices');
        Schema::dropIfExists('institutional_sections');
        Schema::dropIfExists('document_categories');
        Schema::dropIfExists('events');
        Schema::dropIfExists('news');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['full_name', 'password_hash', 'is_active']);
        });
    }
};
