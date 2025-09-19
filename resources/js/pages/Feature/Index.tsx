import FeatureItem from '@/components/feature-item';
import { Pagination } from '@/components/ui/pagination';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Toast } from '@/components/ui/toast';
import { can } from '@/helpers';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Feature as SharedFeature } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Define your hard-coded route URLs
const ROUTES = {
    features: {
        index: '/features',
        create: '/features/create',
        show: (id: number) => `/features/${id}`,
        edit: (id: number) => `/features/${id}/edit`,
        destroy: (id: number) => `/features/${id}`,
    },
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Features',
        href: ROUTES.features.index,
    },
];

// Use the shared Feature type for compatibility
type Feature = SharedFeature;

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
    success?: string;
    messageType?: string; // Add messageType prop to determine toast style
}

export default function Index({ features }: IndexProps) {
    const { auth } = usePage().props as { auth: { user: { id: number } } };
    const { data: featuresList, links, meta } = features;
    const { props } = usePage();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'delete'>('success');

    useEffect(() => {
        // Check if there's a success message in the page props
        if (props.success) {
            setToastMessage(props.success as string);

            // Determine toast type based on messageType or message content
            const type = props.messageType === 'delete' ? 'delete' : 'success';
            setToastType(type);

            setShowToast(true);

            // Auto-hide the toast after 5 seconds
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [props.success, props.messageType]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Features" />

            {/* Toast Notification */}
            {showToast && <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} className="fixed top-4 right-4 z-50" />}

            <div className="flex flex-col gap-6 p-6">
                {/* Header section */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Our Features</h1>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Discover what makes our product special</p>
                    </div>
                    {/* Add new feature button */}
                    {can(auth.user, 'manage_features') && (
                        <Link
                            href={ROUTES.features.create}
                            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase ring-blue-300 transition duration-150 ease-in-out hover:bg-blue-700 focus:border-blue-900 focus:ring focus:outline-none active:bg-blue-900 disabled:opacity-25"
                        >
                            Add New Feature
                        </Link>
                    )}
                </div>

                {/* Features grid */}
                {featuresList.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {featuresList.map((feature) => (
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
                    <div className="py-12 text-center">
                        <div className="mx-auto max-w-md">
                            <PlaceholderPattern className="mx-auto mb-4 size-32 stroke-gray-900/10 dark:stroke-gray-100/10" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No features available</h3>
                            <p className="mb-6 text-gray-500 dark:text-gray-400">There are no features to display at the moment.</p>
                            {/* Add new feature button */}
                            <Link
                                href={ROUTES.features.create}
                                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase ring-blue-300 transition duration-150 ease-in-out hover:bg-blue-700 focus:border-blue-900 focus:ring focus:outline-none active:bg-blue-900 disabled:opacity-25"
                            >
                                Create Your First Feature
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
