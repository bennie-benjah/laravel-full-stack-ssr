import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import { can } from '@/helpers';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    created_at: string;
    updated_at: string;
}

interface ShowProps {
    user: {
        data: User;
    };
}

const breadcrumbs = (user?: User): BreadcrumbItem[] => [
    { title: 'Users', href: route('users.index') },
    {
        title: user?.name || 'User Details',
        href: user?.id ? route('users.show', user.id) : route('users.index'),
    },
];

export default function Show({ user }: ShowProps) {
    const userData = user?.data;
    const { auth } = usePage().props as { auth: { user: { id: number } } };
    const authUser = usePage().props.auth.user;

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route('users.destroy', userData.id), {
            onSuccess: () => {
                setShowDeleteDialog(false);
            },
            preserveScroll: true,
        });
    };

    useEffect(() => {
        console.log('Full user data received:', user);
        console.log('Extracted user data:', userData);
    }, [user, userData]);

    if (!userData) {
        return (
            <AppLayout breadcrumbs={breadcrumbs()}>
                <Head title="User Not Found" />
                <div className="mx-auto max-w-4xl p-6">
                    <div className="py-12 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            User not found or loading...
                        </h1>
                        <Link
                            href={route('users.index')}
                            className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Back to Users
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs(userData)}>
            <Head title={userData.name} />

            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        User Details
                    </h1>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {can(authUser, 'manage_users') && (
                                <DropdownMenuItem asChild>
                                    <Link href={`/users/${userData.id}/edit`}>
                                        Edit User
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            {can(authUser, 'manage_users') && (
                                <DropdownMenuItem
                                    onClick={() => setShowDeleteDialog(true)}
                                    disabled={processing}
                                >
                                    Delete User
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem asChild>
                                <Link href={route('users.index')}>
                                    Back to Users
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* User Information */}
                <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                        Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                Name
                            </span>
                            <span className="text-lg text-gray-900 dark:text-white">
                                {userData.name}
                            </span>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                Email
                            </span>
                            <span className="text-lg text-gray-900 dark:text-white">
                                {userData.email}
                            </span>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                Roles
                            </span>
                            <span className="text-lg text-gray-900 dark:text-white">
                                {userData.roles && userData.roles.length > 0
                                    ? userData.roles.join(', ')
                                    : 'No roles assigned'}
                            </span>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                                Joined
                            </span>
                            <span className="text-lg text-gray-900 dark:text-white">
                                {userData.created_at
                                    ? new Date(
                                          userData.created_at
                                      ).toLocaleDateString()
                                    : 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
