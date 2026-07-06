import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import EventCard from '../../Portal/Components/EventCard.jsx';
import Icon from '../../Portal/Components/Icon.jsx';
import Layout from '../../Portal/Layout.jsx';

const asArray = (value) => {
    if (Array.isArray(value)) {
        return value;
    }

    return value && typeof value === 'object' ? Object.values(value) : [];
};

export default function Home({
    settings = {},
    featuredNews = [],
    events = [],
    offices = [],
    featuredVideos = [],
    suggestedLinks = [],
}) {
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const newsItems = asArray(featuredNews);
    const eventItems = asArray(events);
    const officeItems = asArray(offices);
    const videoItems = asArray(featuredVideos);
    const suggestedItems = asArray(suggestedLinks);
    const hasNews = newsItems.length > 0;
    const facebookUrl = settings.facebook_url && settings.facebook_url !== '#'
        ? settings.facebook_url
        : null;
    const facebookPluginUrl = facebookUrl
        ? `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
              facebookUrl,
          )}&tabs=timeline&width=500&height=640&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`
        : null;

    useEffect(() => {
        if (!hasNews) {
            return undefined;
        }

        const interval = setInterval(() => {
            setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [hasNews, newsItems.length]);

    const nextSlide = () => setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
    const prevSlide = () =>
        setCurrentNewsIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);

    const news = newsItems[currentNewsIndex] || {
        title: settings.site_name || '',
        description: settings.footer_description || '',
        image: '',
    };

    return (
        <Layout settings={settings}>
            <Head title="Inicio" />
            <div className="portal-page">
                <section className="portal-hero">
                    {hasNews && (
                        <div className="portal-hero__slides" aria-hidden="true">
                            {newsItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`portal-hero__slide ${
                                        index === currentNewsIndex ? 'is-active' : ''
                                    }`}
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                            ))}
                        </div>
                    )}

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

                            {hasNews && newsItems.length > 1 && (
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
                                        {newsItems.map((_, index) => (
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
                            )}
                        </div>
                    </div>
                </section>

                <section className="portal-section px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-start gap-8 lg:flex-row">
                            {officeItems.length > 0 && (
                                <aside className="portal-unap__sidebar sticky top-24 w-full lg:w-auto">
                                    <div className="portal-unap__sidebar-panel">
                                        <div className="portal-unap__sidebar-menu grid grid-cols-1 gap-4 sm:grid-cols-3 lg:flex lg:flex-col">
                                            {officeItems.map(({ title, description, icon_key: iconKey, url }) => (
                                                <a
                                                    key={title}
                                                    href={url}
                                                    target={url === '#' ? undefined : '_blank'}
                                                    rel={url === '#' ? undefined : 'noopener noreferrer'}
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
                            )}

                            <div className="min-w-0 flex-1 space-y-16">
                                <div>
                                    <div className="portal-section__header flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                                        <div>
                                            <p className="portal-section__kicker">
                                                {settings.home_events_kicker}
                                            </p>
                                            <h2 className="portal-section__title text-2xl font-extrabold sm:text-3xl">
                                                {settings.home_events_title}
                                            </h2>
                                        </div>
                                        <Link href="/eventos" className="portal-button inline-flex">
                                            {settings.home_events_link_label}
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {eventItems.map((event) => (
                                            <EventCard key={event.id} event={event} />
                                        ))}
                                    </div>
                                </div>

                                {videoItems.length > 0 && (
                                    <div className="border-t border-graphite-100 pt-16">
                                        <div className="portal-section__header">
                                            <div>
                                                <p className="portal-section__kicker">
                                                    {settings.home_videos_kicker}
                                                </p>
                                                <h2 className="portal-section__title text-2xl font-extrabold sm:text-3xl">
                                                    {settings.home_videos_title}
                                                </h2>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {videoItems.map((video) => (
                                                <a
                                                    key={video.id}
                                                    href={video.url}
                                                    className="portal-video-card"
                                                    target={video.url === '#' ? undefined : '_blank'}
                                                    rel={video.url === '#' ? undefined : 'noopener noreferrer'}
                                                >
                                                    <div className="portal-video-card__media">
                                                        <img
                                                            src={video.image}
                                                            alt={video.title}
                                                            className="aspect-video w-full object-cover"
                                                        />
                                                        <span className="portal-video-card__play">
                                                            <Icon name="play" className="h-11 w-11" />
                                                        </span>
                                                        {video.duration && (
                                                            <span className="portal-video-card__duration">
                                                                {video.duration}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="portal-unap__news-body">
                                                        <h3 className="portal-unap__news-title text-lg font-bold">
                                                            {video.title}
                                                        </h3>
                                                        <p className="portal-unap__news-description line-clamp-2 text-sm text-graphite-600">
                                                            {video.description}
                                                        </p>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {suggestedItems.length > 0 && (
                                    <div className="border-t border-graphite-100 pt-16">
                                        <div className="portal-section__header">
                                            <div>
                                                <p className="portal-section__kicker">
                                                    {settings.home_suggested_kicker}
                                                </p>
                                                <h2 className="portal-section__title text-2xl font-extrabold sm:text-3xl">
                                                    {settings.home_suggested_title}
                                                </h2>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            {suggestedItems.map(({ id, title, description, icon, url }) => (
                                                <a
                                                    key={id}
                                                    href={url}
                                                    className="portal-suggestion-card flex items-center gap-4 rounded-lg border p-4 transition-shadow hover:shadow-md"
                                                    target={url === '#' ? undefined : '_blank'}
                                                    rel={url === '#' ? undefined : 'noopener noreferrer'}
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
                                )}

                                {facebookPluginUrl && (
                                    <div className="border-t border-graphite-100 pt-16">
                                        <div className="portal-section__header flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                                            <div>
                                                <p className="portal-section__kicker">
                                                    {settings.home_facebook_kicker}
                                                </p>
                                                <h2 className="portal-section__title text-2xl font-extrabold sm:text-3xl">
                                                    {settings.home_facebook_title}
                                                </h2>
                                            </div>
                                            <a
                                                href={facebookUrl}
                                                className="portal-button inline-flex"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Ver en Facebook
                                            </a>
                                        </div>

                                        <div className="overflow-hidden rounded-lg border border-graphite-200 bg-white shadow-sm">
                                            <iframe
                                                title={settings.home_facebook_title}
                                                src={facebookPluginUrl}
                                                width="100%"
                                                height="640"
                                                style={{ border: 'none', overflow: 'hidden' }}
                                                scrolling="no"
                                                frameBorder="0"
                                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
