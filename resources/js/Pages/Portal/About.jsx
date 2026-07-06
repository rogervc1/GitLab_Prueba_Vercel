import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import Layout from '../../Portal/Layout.jsx';

const asArray = (value) => {
    if (Array.isArray(value)) {
        return value;
    }

    return value && typeof value === 'object' ? Object.values(value) : [];
};

export default function About({ settings, sections = [] }) {
    const fallbackSections = [
        {
            key: 'equipo',
            title: 'Nuestro Equipo',
            body: 'Contamos con profesionales que coordinan programas de extension, voluntariado, graduados y gestion ambiental con enfoque territorial.',
        },
    ];
    const sectionItems = asArray(sections);
    const visibleSections = sectionItems.length > 0 ? sectionItems : fallbackSections;
    const [active, setActive] = useState(visibleSections[0].key);
    const sectionsByKey = useMemo(
        () => Object.fromEntries(visibleSections.map((section) => [section.key, section])),
        [visibleSections],
    );
    const content = sectionsByKey[active] || visibleSections[0];

    return (
        <Layout settings={settings}>
            <Head title="Nosotros" />
            <div className="portal-page">
                <section className="portal-hero portal-hero--compact">
                    <div className="portal-unap__container">
                        <p className="portal-hero__badge">Identidad institucional</p>
                        <h1 className="portal-hero__title">Nosotros</h1>
                        <p className="portal-hero__text">
                            Trabajamos para que el conocimiento universitario dialogue con las
                            necesidades reales de la sociedad.
                        </p>
                    </div>
                </section>

                <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <div className="rounded-lg border border-graphite-200 bg-white p-3 shadow-sm">
                            {visibleSections.map((item) => (
                                <button
                                    key={item.key}
                                    type="button"
                                    onClick={() => setActive(item.key)}
                                    className={`w-full rounded-md px-4 py-3 text-left text-sm font-bold transition ${
                                        active === item.key
                                            ? 'bg-institutional-700 text-white'
                                            : 'text-graphite-700 hover:bg-institutional-50 hover:text-institutional-800'
                                    }`}
                                >
                                    {item.title}
                                </button>
                            ))}
                        </div>
                    </aside>

                    <article className="rounded-lg border border-graphite-200 bg-white p-8 shadow-sm">
                        <h2 className="text-3xl font-black text-graphite-950">
                            {content.title}
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite-600">
                            {content.body}
                        </p>
                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            {['Proyectos', 'Convenios', 'Voluntariado'].map((label, index) => (
                                <div key={label} className="rounded-lg bg-graphite-50 p-5">
                                    <p className="text-3xl font-black text-institutional-800">
                                        {index + 12}
                                    </p>
                                    <p className="mt-2 text-sm font-bold text-graphite-700">
                                        {label} activos
                                    </p>
                                </div>
                            ))}
                        </div>
                    </article>
                </section>
            </div>
        </Layout>
    );
}
