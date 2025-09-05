// components/ui/pagination.tsx
import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: PaginationLink[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export function Pagination({ links, meta }: PaginationProps) {
    return (
        <nav className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 sm:px-0">
            <div className="-mt-px flex w-0 flex-1">
                {links.prev ? (
                    <Link
                        href={links.prev}
                        className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        Previous
                    </Link>
                ) : (
                    <span className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-300 dark:text-gray-600">
                        Previous
                    </span>
                )}
            </div>

            <div className="hidden md:-mt-px md:flex">
                {meta.links.map((link, index) => {
                    if (link.url === null) {
                        return (
                            <span
                                key={index}
                                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 dark:text-gray-400"
                            >
                                {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                                link.active
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                        </Link>
                    );
                })}
            </div>

            <div className="-mt-px flex w-0 flex-1 justify-end">
                {links.next ? (
                    <Link
                        href={links.next}
                        className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        Next
                    </Link>
                ) : (
                    <span className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-300 dark:text-gray-600">
                        Next
                    </span>
                )}
            </div>
        </nav>
    );
}
export default Pagination;
