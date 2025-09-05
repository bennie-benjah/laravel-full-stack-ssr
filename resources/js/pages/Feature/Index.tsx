import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { features } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
// Update the import path to match the actual location and casing of the Pagination component
// Example: If the file is named Pagination.tsx, use:
import { Pagination } from '@/components/ui/pagination';
import FeatureItem from '@/components/feature-item';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Features',
        href: features().url,
    },
];

// Define a proper type for your features
interface Feature {
    id: number;
    name: string;
    description: string;
    icon?: string; // Optional icon name
}

// Define the pagination response structure
interface PaginatedResponse<T> {
    data: T[];
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
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

interface IndexProps {
    features: PaginatedResponse<Feature>;
}

export default function Index({ features }: IndexProps) {
    const { data: featuresList, links, meta } = features;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Features" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Our Features</h1>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                            Discover what makes our product special
                        </p>
                    </div>
                    {/* Add new feature button if needed */}
                    {/* <Link
                        href={route('features.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                    >
                        Add New Feature
                    </Link> */}
                </div>

                {/* Features grid */}
                {featuresList.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.data.map((feature) => (
                                <FeatureItem key={feature.id} feature={feature} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {meta.last_page > 1 && (
                            <div className="mt-8">
                                <Pagination links={links} meta={meta} />
                            </div>
                        )}
                    </>
                ) : (
                    // Empty state
                    <div className="text-center py-12">
                        <div className="mx-auto max-w-md">
                            <PlaceholderPattern className="mx-auto size-32 stroke-gray-900/10 dark:stroke-gray-100/10 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No features available</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                There are no features to display at the moment.
                            </p>
                            {/* Add new feature button if needed */}
                            {/* <Link
                                href={route('features.create')}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                            >
                                Create Your First Feature
                            </Link> */}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
