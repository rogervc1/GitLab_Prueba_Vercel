import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import EventCard from '../../Portal/Components/EventCard.jsx';
import Icon from '../../Portal/Components/Icon.jsx';
import Layout from '../../Portal/Layout.jsx';

const videos = [
    {
        id: 1,
        title: 'Impacto de los proyectos sociales universitarios',
        description: 'Resumen audiovisual de acciones desarrolladas con comunidades aliadas.',
        duration: '03:42',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 2,
        title: 'Voluntariado y compromiso estudiantil',
        description: 'Testimonios de estudiantes que participan en iniciativas de servicio.',
        duration: '04:18',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    },
    {
        id: 3,
        title: 'Gestion ambiental en accion',
        description: 'Buenas practicas para promover una cultura sostenible en el campus.',
        duration: '02:55',
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    },
];

const suggestedActions = [
    {
        title: 'Convocatorias abiertas',
        description: 'Revisa oportunidades activas para proyectos, voluntariado y aliados.',
        icon: 'users',
    },
    {
        title: 'Convenios comunitarios',
        description: 'Conoce las lineas de colaboracion disponibles para instituciones externas.',
        icon: 'handshake',
    },
    {
        title: 'Reportes de impacto',
        description: 'Consulta avances, indicadores y resultados de intervenciones sociales.',
        icon: 'building',
    },
];

const defaultNews = [
    {
        id: 0,
        title: 'Dirección de Proyección Social y Extensión Cultural',
        description: 'Vinculación universitaria, impacto social y desarrollo comunitario.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    },
];

const asArray = (value) => {
    if (Array.isArray(value)) {
        return value;
    }

    return value && typeof value === 'object' ? Object.values(value) : [];
};

export default function Home({ settings, featuredNews = [], events = [], offices = [] }) {
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const newsItems = asArray(featuredNews);
    const eventItems = asArray(events);
    const officeItems = asArray(offices);
    const carouselNews = newsItems.length > 0 ? newsItems : defaultNews;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNewsIndex((prev) => (prev + 1) % carouselNews.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [carouselNews.length]);

    const nextSlide = () => setCurrentNewsIndex((prev) => (prev + 1) % carouselNews.length);
    const prevSlide = () =>
        setCurrentNewsIndex((prev) => (prev - 1 + carouselNews.length) % carouselNews.length);

    const news = carouselNews[currentNewsIndex];

    return (
        <Layout settings={settings}>
            <Head title="Inicio" />
            <div className="portal-page">
                <section className="portal-hero">
                    <div className="portal-hero__slides" aria-hidden="true">
                        {carouselNews.map((item, index) => (
                            <div
                                key={item.id}
                                className={`portal-hero__slide ${
                                    index === currentNewsIndex ? 'is-active' : ''
                                }`}
                                style={{ backgroundImage: `url(${item.image})` }}
                            />
                        ))}
                    </div>

                    <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
                        <div className="portal-hero__inner">
                            <div className="portal-hero__content">
                                <h1 className="portal-hero__title text-3xl sm:text-5xl lg:text-7xl">
                                    {news.title}
                                </h1>
                                <p className="portal-hero__text text-sm sm:text-base lg:text-lg">
                                    {news.description}
                                </p>
                            </div>

                            <div className="portal-hero__controls right-0 hidden sm:flex">
                                <button
                                    type="button"
                                    onClick={prevSlide}
                                    className="portal-hero__arrow"
                                    aria-label="Anterior"
                                >
                                    <Icon name="chevronLeft" className="h-6 w-6" />
                                </button>
                                <div className="portal-hero__dots px-2">
                                    {carouselNews.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setCurrentNewsIndex(index)}
                                            className={`portal-hero__dot ${
                                                index === currentNewsIndex ? 'is-active' : ''
                                            }`}
                                            aria-label={`Ir a diapositiva ${index + 1}`}
                                        />
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={nextSlide}
                                    className="portal-hero__arrow"
                                    aria-label="Siguiente"
                                >
                                    <Icon name="chevronRight" className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="portal-section px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-start gap-8 lg:flex-row">
                            <aside className="portal-unap__sidebar sticky top-24 w-full lg:w-auto">
                                <div className="portal-unap__sidebar-panel">
                                    <div className="portal-unap__sidebar-menu grid grid-cols-1 gap-4 sm:grid-cols-3 lg:flex lg:flex-col">
                                        {officeItems.map(({ title, description, icon_key: iconKey, url }) => (
                                            <a
                                                key={title}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="portal-unap__sidebar-item w-full"
                                            >
                                                <span className="portal-unap__sidebar-icon">
                                                    {iconKey === 'building' && (
                                                        <img
                                                            src="/images/LogoDPSEC.png"
                                                            alt={title}
                                                            className="h-full w-full object-contain"
                                                        />
                                                    )}
                                                    {iconKey === 'graduation' && (
                                                        <img
                                                            src="/images/LogoSeguimientoAlGraduado.jpg"
                                                            alt={title}
                                                            className="h-full w-full object-contain"
                                                        />
                                                    )}
                                                    {iconKey === 'leaf' && (
                                                        <img
                                                            src="/images/LogoGestionAmbiental.jpg"
                                                            alt={title}
                                                            className="h-full w-full object-contain"
                                                        />
                                                    )}
                                                </span>
                                                <span className="portal-unap__sidebar-content">
                                                    <span className="portal-unap__sidebar-label">
                                                        {title}
                                                    </span>
                                                    <span className="portal-unap__sidebar-help">
                                                        {description}
                                                    </span>
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </aside>

                            <div className="min-w-0 flex-1 space-y-16">
                                <div>
                                    <div className="portal-section__header flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                                        <div>
                                            <p className="portal-section__kicker">
                                                Agenda institucional
                                            </p>
                                            <h2 className="portal-section__title text-2xl font-extrabold sm:text-3xl">
                                                Eventos recientes
                                            </h2>
                                        </div>
                                        <Link href="/eventos" className="portal-button inline-flex">
                                            Ver todos los eventos
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {eventItems.map((event) => (
                                            <EventCard key={event.id} event={event} />
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-graphite-100 pt-16">
                                    <div className="portal-section__header">
                                        <div>
                                            <p className="portal-section__kicker">
                                                Material audiovisual
                                            </p>
                                            <h2 className="portal-section__title text-2xl font-extrabold sm:text-3xl">
                                                Videos destacados
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {videos.map((video) => (
                                            <article key={video.id} className="portal-video-card">
                                                <div className="portal-video-card__media">
                                                    <img
                                                        src={video.image}
                                                        alt=""
                                                        className="aspect-video w-full object-cover"
                                                    />
                                                    <span className="portal-video-card__play">
                                                        <Icon name="play" className="h-11 w-11" />
                                                    </span>
                                                    <span className="portal-video-card__duration">
                                                        {video.duration}
                                                    </span>
                                                </div>
                                                <div className="portal-unap__news-body">
                                                    <h3 className="portal-unap__news-title text-lg font-bold">
                                                        {video.title}
                                                    </h3>
                                                    <p className="portal-unap__news-description line-clamp-2 text-sm text-graphite-600">
                                                        {video.description}
                                                    </p>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-graphite-100 pt-16">
                                    <div className="portal-section__header">
                                        <div>
                                            <p className="portal-section__kicker">
                                                También puede interesarte
                                            </p>
                                            <h2 className="portal-section__title text-2xl font-extrabold sm:text-3xl">
                                                Accesos sugeridos
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {suggestedActions.map(({ title, description, icon }) => (
                                            <a
                                                key={title}
                                                href="#"
                                                className="portal-suggestion-card flex items-center gap-4 rounded-lg border p-4 transition-shadow hover:shadow-md"
                                            >
                                                <span className="portal-unap__sidebar-icon flex-shrink-0">
                                                    <Icon name={icon} className="h-5 w-5" />
                                                </span>
                                                <span className="min-w-0 flex-1">
                                                    <span className="portal-unap__sidebar-label block truncate text-sm font-bold">
                                                        {title}
                                                    </span>
                                                    <span className="portal-unap__sidebar-help block truncate text-xs text-graphite-500">
                                                        {description}
                                                    </span>
                                                </span>
                                                <Icon
                                                    name="arrowRight"
                                                    className="h-4 w-4 flex-shrink-0 text-institutional-600"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
