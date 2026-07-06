import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Icon from './Components/Icon.jsx';

const navItems = [
    { label: 'Inicio', href: '/', route: 'home' },
    { label: 'Nosotros', href: '/nosotros', route: 'about' },
    { label: 'Documentos de Gestion', href: '/documentos', route: 'documents' },
    { label: 'Eventos', href: '/eventos', route: 'events' },
];

export default function Layout({ children, settings = {} }) {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();

    const socialLinks = [
        { icon: 'facebook', url: settings.facebook_url, label: 'Facebook' },
        { icon: 'instagram', url: settings.instagram_url, label: 'Instagram' },
        { icon: 'linkedin', url: settings.linkedin_url, label: 'LinkedIn' },
    ].filter((item) => item.url && item.url !== '#');

    const navClass = (href) => {
        const active = href === '/' ? url === '/' : url.startsWith(href);

        return `rounded-md px-3 py-2 text-sm font-semibold transition ${
            active
                ? 'bg-institutional-700 text-white'
                : 'text-graphite-700 hover:bg-institutional-50 hover:text-institutional-800'
        }`;
    };

    return (
        <div className="min-h-screen bg-graphite-50">
            <header className="sticky top-0 z-50 border-b border-graphite-200 bg-white/95 backdrop-blur">
                <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                    <Link
                        href="/"
                        className="flex min-w-0 items-center gap-2 sm:gap-3"
                        onClick={() => setIsOpen(false)}
                    >
                        <img
                            src="/images/Logo_UNAP.png"
                            alt="Logo UNAP"
                            className="h-11 w-11 shrink-0 object-contain sm:h-14 sm:w-14"
                        />
                        <span className="min-w-0 text-center leading-tight">
                            <span className="block text-[11px] font-black uppercase text-graphite-950 sm:text-sm lg:text-base">
                                {settings.header_title_line_1}
                            </span>
                            <span className="block text-[11px] font-black uppercase text-graphite-950 sm:text-sm lg:text-base">
                                {settings.header_title_line_2}
                            </span>
                        </span>
                        <img
                            src="/images/LogoDPSEC.png"
                            alt="Logo DPSEC"
                            className="h-11 w-11 shrink-0 object-contain sm:h-14 sm:w-14"
                        />
                    </Link>

                    <div className="hidden items-center gap-1 lg:flex">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} className={navClass(item.href)}>
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-graphite-200 text-graphite-800 lg:hidden"
                        onClick={() => setIsOpen((value) => !value)}
                        aria-label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
                    >
                        <Icon name={isOpen ? 'x' : 'menu'} />
                    </button>
                </nav>

                {isOpen && (
                    <div className="border-t border-graphite-200 bg-white px-4 py-3 lg:hidden">
                        <div className="mx-auto flex max-w-7xl flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={navClass(item.href)}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            <main>{children}</main>

            <footer className="bg-institutional-950 text-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="grid h-11 w-11 place-items-center rounded-md bg-white text-lg font-black text-institutional-900">
                                PS
                            </span>
                            <div>
                                <p className="font-black">{settings.footer_title}</p>
                                <p className="text-sm text-institutional-100">
                                    {settings.footer_subtitle}
                                </p>
                            </div>
                        </div>
                        <p className="mt-5 max-w-md text-sm leading-6 text-institutional-100">
                            {settings.footer_description}
                        </p>
                    </div>

                    <div className="space-y-4 text-sm text-institutional-100">
                        <h2 className="text-base font-bold text-white">Contacto</h2>
                        {settings.address && (
                            <p className="flex items-start gap-3">
                                <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0" />
                                {settings.address}
                            </p>
                        )}
                        {settings.phone && (
                            <p className="flex items-center gap-3">
                                <Icon name="phone" className="h-4 w-4" />
                                {settings.phone}
                            </p>
                        )}
                        {settings.email && (
                            <p className="flex items-center gap-3">
                                <Icon name="mail" className="h-4 w-4" />
                                {settings.email}
                            </p>
                        )}
                    </div>

                    {socialLinks.length > 0 && (
                        <div>
                            <h2 className="text-base font-bold text-white">Redes sociales</h2>
                            <div className="mt-4 flex gap-3">
                                {socialLinks.map(({ icon, url: socialUrl, label }) => (
                                    <a
                                        key={label}
                                        href={socialUrl}
                                        className="grid h-10 w-10 place-items-center rounded-md bg-white/10 text-white transition hover:bg-white hover:text-institutional-900"
                                        aria-label={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon name={icon} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-institutional-100">
                    {settings.footer_copyright}
                </div>
            </footer>
        </div>
    );
}
