<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();

        if (! DB::table('users')->where('email', 'admin@dpsec.local')->exists()) {
            $password = Hash::make('Admin12345!');

            DB::table('users')->insert([
                'name' => 'Administrador DPSEC',
                'email' => 'admin@dpsec.local',
                'password' => $password,
                'password_hash' => $password,
                'full_name' => 'Administrador DPSEC',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        $newsItems = [
            [
                'title' => 'Convocatoria de voluntariado universitario 2026',
                'description' => 'Estudiantes y docentes se integran a proyectos comunitarios de alto impacto social.',
                'image_url' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
                'is_featured' => true,
                'published_at' => '2026-05-01 00:00:00',
            ],
            [
                'title' => 'Programa de acompaniamiento a comunidades locales',
                'description' => 'Nuevas brigadas academicas fortalecen iniciativas de salud, ambiente y educacion.',
                'image_url' => 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80',
                'is_featured' => false,
                'published_at' => '2026-04-15 00:00:00',
            ],
        ];

        foreach ($newsItems as $item) {
            $this->insertIfMissing('news', 'title', $item['title'], $item + [
                'is_published' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        $events = [
            ['Feria de Proyectos Sociales', '2026-06-12', 'Auditorio principal', 'Exposicion de proyectos con participacion de aliados comunitarios.', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80'],
            ['Taller de Gestion Ambiental', '2026-06-20', 'Laboratorio ambiental', 'Capacitacion practica para iniciativas sostenibles en campus.', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80'],
            ['Encuentro de Graduados', '2026-07-04', 'Sala de conferencias', 'Panel de experiencias profesionales y redes de colaboracion.', 'https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=900&q=80'],
            ['Jornada de Salud Comunitaria', '2026-07-18', 'Centro poblado Santa Rosa', 'Acciones de orientacion preventiva junto a equipos multidisciplinarios.', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'],
        ];

        foreach ($events as [$title, $eventDate, $location, $description, $imageUrl]) {
            $this->insertIfMissing('events', 'title', $title, [
                'title' => $title,
                'description' => $description,
                'event_date' => $eventDate,
                'location' => $location,
                'image_url' => $imageUrl,
                'is_published' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        $categoryByName = [];
        foreach (['Planes', 'Reglamentos', 'Informes', 'Directivas', 'Formatos', 'Politicas'] as $name) {
            $slug = strtolower(str_replace(' ', '-', $name));

            if (! DB::table('document_categories')->where('slug', $slug)->exists()) {
                DB::table('document_categories')->insert([
                    'name' => $name,
                    'slug' => $slug,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }

            $categoryByName[$name] = DB::table('document_categories')->where('slug', $slug)->value('id');
        }

        $documents = [
            ['Plan Anual de Proyeccion Social 2026', 'Planes', '2026-03-15', 'PDF', '2.4 MB', '#'],
            ['Reglamento de Actividades de Responsabilidad Social', 'Reglamentos', '2025-11-04', 'PDF', '1.8 MB', '#'],
            ['Informe de Resultados del Programa de Voluntariado', 'Informes', '2026-01-28', 'PDF', '3.1 MB', '#'],
            ['Directiva para Presentacion de Proyectos Sociales', 'Directivas', '2025-09-18', 'DOCX', '860 KB', '#'],
            ['Matriz de Seguimiento de Convenios Comunitarios', 'Formatos', '2026-02-10', 'XLSX', '540 KB', '#'],
            ['Politica Institucional de Gestion Ambiental', 'Politicas', '2025-08-21', 'PDF', '1.2 MB', '#'],
        ];

        foreach ($documents as [$title, $categoryName, $publishedDate, $format, $fileSize, $fileUrl]) {
            $this->insertIfMissing('documents', 'title', $title, [
                'title' => $title,
                'category_id' => $categoryByName[$categoryName],
                'published_date' => $publishedDate,
                'format' => $format,
                'file_size' => $fileSize,
                'file_url' => $fileUrl,
                'is_published' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        $sections = [
            ['equipo', 'Nuestro Equipo', 'Contamos con profesionales que coordinan programas de extension, voluntariado, graduados y gestion ambiental con enfoque territorial.'],
            ['mision', 'Mision', 'Promover la participacion universitaria en iniciativas que aporten al desarrollo humano, social y ambiental de la comunidad.'],
            ['vision', 'Vision', 'Ser una oficina referente en articulacion social universitaria, reconocida por proyectos sostenibles, medibles y colaborativos.'],
            ['valores', 'Valores', 'Servicio, responsabilidad, transparencia, innovacion social y respeto por la diversidad cultural.'],
        ];

        foreach ($sections as $index => [$key, $title, $body]) {
            $this->insertIfMissing('institutional_sections', 'key', $key, [
                'key' => $key,
                'title' => $title,
                'body' => $body,
                'sort_order' => $index,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        $offices = [
            ['Proyeccion Social', 'Programas y proyectos de vinculacion comunitaria.', 'building', '#'],
            ['Graduados', 'Seguimiento, empleabilidad y redes profesionales.', 'graduation', '#'],
            ['Gestion Ambiental', 'Cultura sostenible y acciones ambientales.', 'leaf', '#'],
        ];

        foreach ($offices as $index => [$title, $description, $iconKey, $url]) {
            $this->insertIfMissing('offices', 'title', $title, [
                'title' => $title,
                'description' => $description,
                'icon_key' => $iconKey,
                'url' => $url,
                'sort_order' => $index,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        $settings = [
            'site_name' => 'Direccion de Proyeccion Social y Extension Cultural',
            'footer_title' => 'Oficina de Proyeccion Social',
            'footer_subtitle' => 'Vinculacion, impacto y desarrollo',
            'footer_description' => 'Articulamos programas, proyectos y actividades que conectan la vida universitaria con las necesidades de la comunidad.',
            'address' => 'Av. Universitaria 123, Lima, Peru',
            'phone' => '(01) 555-0198',
            'email' => 'proyeccion.social@universidad.edu.pe',
            'facebook_url' => '#',
            'instagram_url' => '#',
            'linkedin_url' => '#',
        ];

        foreach ($settings as $key => $value) {
            $this->insertIfMissing('site_settings', 'key', $key, [
                'key' => $key,
                'value' => $value,
            ]);
        }
    }

    /**
     * Insert a record only when a matching value does not exist.
     *
     * @param  array<string, mixed>  $values
     */
    private function insertIfMissing(string $table, string $column, mixed $value, array $values): void
    {
        if (! DB::table($table)->where($column, $value)->exists()) {
            DB::table($table)->insert($values);
        }
    }
}
