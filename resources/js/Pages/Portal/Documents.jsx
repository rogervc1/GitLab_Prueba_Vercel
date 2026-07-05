import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Icon from '../../Portal/Components/Icon.jsx';
import Pagination from '../../Portal/Components/Pagination.jsx';
import Layout from '../../Portal/Layout.jsx';

const asArray = (value) => {
    if (Array.isArray(value)) {
        return value;
    }

    return value && typeof value === 'object' ? Object.values(value) : [];
};

export default function Documents({
    settings,
    documents = { items: [], total: 0, page: 1, total_pages: 1 },
    categories = [],
    filters = { search: '', category: [] },
}) {
    const [search, setSearch] = useState(filters.search || '');
    const selectedCategories = asArray(filters.category);
    const categoryItems = asArray(categories);
    const documentItems = asArray(documents.items);

    const visit = (nextFilters) => {
        router.get('/documentos', nextFilters, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    const toggleCategory = (category) => {
        const nextCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((item) => item !== category)
            : [...selectedCategories, category];

        visit({ search, category: nextCategories });
    };

    const submitSearch = (event) => {
        event.preventDefault();
        visit({ search, category: selectedCategories });
    };

    return (
        <Layout settings={settings}>
            <Head title="Documentos de Gestion" />
            <div className="portal-page">
                <section className="portal-hero portal-hero--compact">
                    <div className="portal-unap__container">
                        <p className="portal-hero__badge">Transparencia y gestión</p>
                        <h1 className="portal-hero__title">Documentos de Gestión</h1>
                        <p className="portal-hero__text">
                            Consulta planes, reglamentos, informes, directivas y formatos
                            oficiales.
                        </p>
                    </div>
                </section>

                <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <div className="rounded-lg border border-graphite-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <span className="grid h-10 w-10 place-items-center rounded-md bg-institutional-100 text-institutional-800">
                                    <Icon name="sliders" />
                                </span>
                                <div>
                                    <h2 className="font-black text-graphite-950">Filtros</h2>
                                    <p className="text-sm text-graphite-500">
                                        Categorias disponibles
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                {categoryItems.map((category) => (
                                    <label
                                        key={category.id}
                                        className="flex cursor-pointer items-center justify-between rounded-md border border-graphite-200 px-3 py-3 text-sm font-semibold text-graphite-700 transition hover:border-institutional-300 hover:bg-institutional-50"
                                    >
                                        <span>{category.name}</span>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category.name)}
                                            onChange={() => toggleCategory(category.name)}
                                            className="h-4 w-4 rounded border-graphite-300 text-institutional-700"
                                        />
                                    </label>
                                ))}
                            </div>

                            {selectedCategories.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => visit({ search, category: [] })}
                                    className="mt-5 w-full rounded-md border border-graphite-200 px-4 py-2 text-sm font-bold text-graphite-700 transition hover:bg-graphite-50"
                                >
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    </aside>

                    <div className="space-y-6">
                        <form
                            onSubmit={submitSearch}
                            className="rounded-lg border border-graphite-200 bg-white p-4 shadow-sm sm:p-5"
                        >
                            <label htmlFor="document-search" className="sr-only">
                                Buscar documento
                            </label>
                            <div className="flex items-center gap-3 rounded-lg border border-graphite-200 bg-graphite-50 px-4 py-3">
                                <Icon name="search" className="h-5 w-5 shrink-0 text-institutional-700" />
                                <input
                                    id="document-search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Buscar por nombre de documento"
                                    className="w-full border-0 bg-transparent text-base text-graphite-900 placeholder:text-graphite-400 focus:ring-0"
                                />
                            </div>
                        </form>

                        <div className="rounded-lg border border-graphite-200 bg-white shadow-sm">
                            <div className="flex flex-col gap-2 border-b border-graphite-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-lg font-black text-graphite-950">
                                        Resultados encontrados
                                    </h2>
                                    <p className="text-sm text-graphite-500">
                                        {documents.total} documento(s) disponibles
                                    </p>
                                </div>
                            </div>

                            <div className="divide-y divide-graphite-200">
                                {documentItems.length === 0 ? (
                                    <div className="p-8 text-center text-graphite-600">
                                        No se encontraron documentos con los filtros actuales.
                                    </div>
                                ) : (
                                    documentItems.map((document) => (
                                        <article
                                            key={document.id}
                                            className="grid gap-4 p-5 transition hover:bg-graphite-50 md:grid-cols-[1fr_auto] md:items-center"
                                        >
                                            <div className="flex gap-4">
                                                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-institutional-100 text-institutional-800">
                                                    <Icon name="file" className="h-6 w-6" />
                                                </span>
                                                <div>
                                                    <h3 className="font-bold text-graphite-950">
                                                        {document.title}
                                                    </h3>
                                                    <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-graphite-600">
                                                        <span className="rounded-md bg-graphite-100 px-2 py-1">
                                                            {document.category}
                                                        </span>
                                                        <span className="rounded-md bg-graphite-100 px-2 py-1">
                                                            {document.format}
                                                        </span>
                                                        <span className="rounded-md bg-graphite-100 px-2 py-1">
                                                            {document.size}
                                                        </span>
                                                        <span className="rounded-md bg-graphite-100 px-2 py-1">
                                                            {new Intl.DateTimeFormat('es-PE').format(
                                                                new Date(
                                                                    `${document.date}T00:00:00`,
                                                                ),
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <a
                                                href={document.url}
                                                className="inline-flex items-center justify-center gap-2 rounded-md bg-institutional-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-institutional-800"
                                            >
                                                <Icon name="download" className="h-4 w-4" />
                                                Descargar
                                            </a>
                                        </article>
                                    ))
                                )}
                            </div>

                            <div className="border-t border-graphite-200 p-5">
                                <Pagination
                                    currentPage={documents.page}
                                    totalPages={documents.total_pages}
                                    baseUrl="/documentos"
                                    query={{
                                        search: filters.search,
                                        category: selectedCategories,
                                    }}
                                />
                            </div>
                        </div>

                        {(filters.search || selectedCategories.length > 0) && (
                            <Link
                                href="/documentos"
                                className="inline-flex text-sm font-bold text-institutional-700 hover:text-institutional-900"
                            >
                                Ver todos los documentos
                            </Link>
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
