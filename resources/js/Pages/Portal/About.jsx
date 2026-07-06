import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import Layout from '../../Portal/Layout.jsx';

const asArray = (value) => {
    if (Array.isArray(value)) {
        return value;
    }

    return value && typeof value === 'object' ? Object.values(value) : [];
};

export default function About({ settings = {}, sections = [], metrics = [] }) {
    const sectionItems = asArray(sections);
    const metricItems = asArray(metrics);
    const [active, setActive] = useState(sectionItems[0]?.key || null);
    const sectionsByKey = useMemo(
        () => Object.fromEntries(sectionItems.map((section) => [section.key, section])),
        [sectionItems],
    );
    const content = sectionsByKey[active] || sectionItems[0];

    return (
        <Layout settings={settings}>
            <Head title={settings.about_title || 'Nosotros'} />
            <div className="portal-page">
                <section className="portal-hero portal-hero--compact">
                    <div className="portal-unap__container">
                        <p className="portal-hero__badge">{settings.about_badge}</p>
                        <h1 className="portal-hero__title">{settings.about_title}</h1>
                        <p className="portal-hero__text">{settings.about_description}</p>
                    </div>
                </section>

                <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
                    {sectionItems.length > 0 && (
                        <aside className="lg:sticky lg:top-24 lg:self-start">
                            <div className="rounded-lg border border-graphite-200 bg-white p-3 shadow-sm">
                                {sectionItems.map((item) => (
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
                    )}

                    {content && (
                        <article className="rounded-lg border border-graphite-200 bg-white p-8 shadow-sm">
                            <h2 className="text-3xl font-black text-graphite-950">
                                {content.title}
                            </h2>
                            <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite-600">
                                {content.body}
                            </p>

                            {metricItems.length > 0 && (
                                <div className="mt-8 grid gap-5 md:grid-cols-3">
                                    {metricItems.map((metric) => (
                                        <div key={metric.id} className="rounded-lg bg-graphite-50 p-5">
                                            <p className="text-3xl font-black text-institutional-800">
                                                {metric.value}
                                                {metric.suffix}
                                            </p>
                                            <p className="mt-2 text-sm font-bold text-graphite-700">
                                                {metric.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </article>
                    )}
                </section>
            </div>
        </Layout>
    );
}
