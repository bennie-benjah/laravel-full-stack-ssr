import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { Feature, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

import NewCommentForm from '@/components/NewCommentForm';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePage } from '@inertiajs/react';
import CommentItem from '../../components/CommentItem';
interface ShowProps {
    feature: {
        data: Feature;
    };
}

const breadcrumbs = (feature?: Feature): BreadcrumbItem[] => [
    {
        title: 'Features',
        href: route('features.index'),
    },
    {
        title: feature?.name || 'Feature Details',
        href: feature?.id ? route('features.show', feature.id) : route('features.index'),
    },
];

export default function Show({ feature }: ShowProps) {
    const featureData = feature?.data;
    const { auth } = usePage().props as { auth: { user: { id: number } } };
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
            <AppLayout breadcrumbs={breadcrumbs()}>
                <Head title="Feature Not Found" />
                <div className="mx-auto max-w-4xl p-6">
                    <div className="py-12 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Feature not found or loading...</h1>
                        <Link href="/features" className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
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
                        <DialogTitle>Delete Feature</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <strong>{featureData.name}</strong>? <br />
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={processing}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={processing}>
                            {processing ? 'Deleting...' : 'Delete Feature'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Feature Details</h1>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/features/${featureData.id}/edit`}>Edit Feature</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} disabled={processing}>
                                Delete Feature
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/features">Back to Features</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Feature Description */}
                <div className="rounded-lg border border-gray-200 p-6 transition-shadow duration-300 hover:shadow-lg dark:border-gray-700">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Description</h2>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{featureData.description}</p>
                </div>

                {/* Feature Information */}
                {/* <div className="mt-8">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Feature Information</h3>
                    <div className="rounded-lg border border-gray-200 p-6 transition-shadow duration-300 hover:shadow-lg dark:border-gray-700">
                        <div className="space-y-4">
                            <div>
                                <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">Feature ID</span>
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">#{featureData.id}</span>
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">Name</span>
                                <span className="text-lg text-gray-900 dark:text-white">{featureData.name}</span>
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">Created By</span>
                                <span className="text-lg text-gray-900 dark:text-white">{featureData.user?.name || 'Unknown'}</span>
                            </div>
                            <div>
                                <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">Created Date</span>
                                <span className="text-lg text-gray-900 dark:text-white">
                                    {featureData.created_at ? new Date(featureData.created_at).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* Comments Section */}
                <div className="mt-8">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Comments</h3>
                    <NewCommentForm feature={featureData} />
                    {featureData.comments && featureData.comments.length > 0 ? (
                        <div className="mt-6 space-y-4">
                            {featureData.comments.map((comment) => (
                                <CommentItem
                                    key={comment.id} // 👈 add this
                                    comment={comment}
                                    authUserId={auth.user.id}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-4 text-gray-500 dark:text-gray-400">No comments yet.</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
