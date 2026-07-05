import { Head } from '@inertiajs/react';
import EventCard from '../../Portal/Components/EventCard.jsx';
import Pagination from '../../Portal/Components/Pagination.jsx';
import Layout from '../../Portal/Layout.jsx';

const asArray = (value) => {
    if (Array.isArray(value)) {
        return value;
    }

    return value && typeof value === 'object' ? Object.values(value) : [];
};

export default function Events({ settings, events = { items: [], page: 1, total_pages: 1 } }) {
    const eventItems = asArray(events.items);

    return (
        <Layout settings={settings}>
            <Head title="Eventos" />
            <div className="portal-page">
                <section className="portal-hero portal-hero--compact">
                    <div className="portal-unap__container">
                        <p className="portal-hero__badge">Agenda</p>
                        <h1 className="portal-hero__title">Eventos</h1>
                        <p className="portal-hero__text">
                            Actividades institucionales, jornadas comunitarias y espacios de
                            colaboracion.
                        </p>
                    </div>
                </section>

                <section className="portal-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {eventItems.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>

                    {eventItems.length === 0 && (
                        <p className="portal-status bg-white p-8 text-center">
                            No hay eventos publicados.
                        </p>
                    )}

                    <div className="mt-12 flex justify-center">
                        <Pagination
                            currentPage={events.page}
                            totalPages={events.total_pages}
                            baseUrl="/eventos"
                        />
                    </div>
                </section>
            </div>
        </Layout>
    );
}
