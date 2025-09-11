import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Feature } from '@/types';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface ShowProps {
    feature: {
        data: Feature;
    };
}

const breadcrumbs = (feature: Feature): BreadcrumbItem[] => [
    {
        title: 'Features',
        href: route('features.index'),
    },
    {
        title: feature?.name || 'Feature Details',
        href: feature ? route('features.show', feature.id) : route('features.index'),
    },
];

export default function Show({ feature }: ShowProps) {
    const featureData = feature?.data;
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route('features.destroy', featureData.id), {
            onSuccess: () => {
                setShowDeleteDialog(false);
            },
            preserveScroll: true,
        });
    };

    useEffect(() => {
        console.log('Full feature data received:', feature);
        console.log('Extracted feature data:', featureData);
    }, [feature, featureData]);

    if (!featureData) {
        return (
            <AppLayout breadcrumbs={breadcrumbs({} as Feature)}>
                <Head title="Feature Not Found" />
                <div className="max-w-4xl mx-auto p-6">
                    <div className="text-center py-12">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Feature not found or loading...
                        </h1>
                        <Link
                            href="/features"
                            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Back to Features
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs(featureData)}>
            <Head title={featureData.name} />

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this feature?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the "
                            {featureData.name}" feature and remove all associated data.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteDialog(false)}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={processing}
                        >
                            {processing ? 'Deleting...' : 'Delete Feature'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Feature Details
                        </h1>
                    </div>

                    <div className="flex space-x-4">
                        <Link
                            href={`/features/${featureData.id}/edit`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Edit Feature
                        </Link>
                        <Button
                            variant="destructive"
                            className="px-4 py-2"
                            onClick={() => setShowDeleteDialog(true)}
                            disabled={processing}
                        >
                            Delete Feature
                        </Button>
                        <Link
                            href="/features"
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        >
                            Back to Features
                        </Link>
                    </div>
                </div>

                {/* Feature Content */}
                <div className="relative rounded-lg border border-gray-200 p-6 transition-shadow duration-300 hover:shadow-lg dark:border-gray-700">
                    {/* Description */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Description</h2>
                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                            {featureData.description}
                        </p>
                    </div>

                    {/* Additional Details */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Feature Information</h3>

                        <div className="relative rounded-lg border border-gray-200 p-6 transition-shadow duration-300 hover:shadow-lg dark:border-gray-700">
                            <div className="space-y-4">
                                <div>
                                    <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Feature ID</span>
                                    <span className="text-lg font-semibold text-gray-900 dark:text-white">#{featureData.id}</span>
                                </div>

                                <div>
                                    <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Name</span>
                                    <span className="text-lg text-gray-900 dark:text-white">{featureData.name}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Created By</span>
                                    <span className="text-lg text-gray-900 dark:text-white">
                                        {featureData.user?.name || 'Unknown'}
                                    </span>
                                </div>

                                <div>
                                    <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Created Date</span>
                                    <span className="text-lg text-gray-900 dark:text-white">
                                        {new Date(featureData.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
