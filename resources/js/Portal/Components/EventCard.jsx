import Icon from './Icon.jsx';

export default function EventCard({ event }) {
    const date = new Intl.DateTimeFormat('es-PE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(`${event.date}T00:00:00`));

    return (
        <article className="portal-unap__news-card group flex h-full flex-col">
            <div className="portal-unap__news-image relative aspect-[16/10] overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="portal-unap__news-badge">Evento</span>
            </div>
            <div className="portal-unap__news-body flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-graphite-500">
                    <span className="inline-flex items-center gap-1.5">
                        <Icon name="calendar" className="portal-meta-icon h-4 w-4 text-institutional-600" />
                        {date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Icon name="mapPin" className="portal-meta-icon h-4 w-4 text-institutional-600" />
                        {event.location}
                    </span>
                </div>
                <h3 className="portal-unap__news-title line-clamp-2 text-lg font-extrabold leading-tight text-graphite-900 transition-colors group-hover:text-institutional-700">
                    {event.title}
                </h3>
                <p className="portal-unap__news-description mt-3 line-clamp-3 text-sm leading-relaxed text-graphite-600">
                    {event.description}
                </p>
                <a
                    href="#"
                    className="portal-unap__news-link mt-auto inline-flex items-center gap-2 text-sm font-bold text-white transition-transform hover:translate-x-1"
                >
                    Leer más
                    <Icon name="chevronRight" className="h-4 w-4" />
                </a>
            </div>
        </article>
    );
}
