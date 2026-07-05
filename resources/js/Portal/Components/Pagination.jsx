import { Link } from '@inertiajs/react';
import Icon from './Icon.jsx';

export default function Pagination({ currentPage, totalPages, baseUrl, query = {} }) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const hrefFor = (page) => {
        const params = new URLSearchParams();

        Object.entries(query).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => params.append(key, item));
            } else if (value !== undefined && value !== null && value !== '') {
                params.set(key, value);
            }
        });

        if (page > 1) {
            params.set('page', page);
        } else {
            params.delete('page');
        }

        const search = params.toString();

        return search ? `${baseUrl}?${search}` : baseUrl;
    };

    const buttonClass = (page) =>
        `portal-page-button ${page === currentPage ? 'is-active' : ''}`;

    return (
        <nav className="portal-pagination" aria-label="Paginacion">
            {currentPage === 1 ? (
                <span className="portal-page-button opacity-45">
                    <Icon name="chevronLeft" className="h-4 w-4" />
                </span>
            ) : (
                <Link href={hrefFor(currentPage - 1)} className="portal-page-button" preserveScroll>
                    <Icon name="chevronLeft" className="h-4 w-4" />
                </Link>
            )}

            {pages.map((page) => (
                <Link
                    key={page}
                    href={hrefFor(page)}
                    className={buttonClass(page)}
                    preserveScroll
                >
                    {page}
                </Link>
            ))}

            {currentPage === totalPages ? (
                <span className="portal-page-button opacity-45">
                    <Icon name="chevronRight" className="h-4 w-4" />
                </span>
            ) : (
                <Link href={hrefFor(currentPage + 1)} className="portal-page-button" preserveScroll>
                    <Icon name="chevronRight" className="h-4 w-4" />
                </Link>
            )}
        </nav>
    );
}
