import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface UserResource {
    id: number;
    name: string;
    email: string;
    roles: string[];
    created_at: string;
    updated_at: string;
}

interface EditProps {
    user: UserResource;
    allRoles: string[]; // passed from controller (RolesEnum::cases() or config)
}

export default function Edit({ user, allRoles }: EditProps) {
    const u = user;

    const { data, setData, put, processing, errors } = useForm({
        name: u.name || '',
        email: u.email || '',
        roles: u.roles || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('users.update', { user: u.id }));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Users', href: route('users.index') },
        { title: u.name, href: route('users.edit', { user: u.id }) },
        { title: 'Edit', href: route('users.edit', { user: u.id }) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${u.name}`} />

            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit User</h1>
                    <Link
                        href={route('users.index')}
                        className="inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                    >
                        Back
                    </Link>
                </div>

                {/* Form Card */}
                <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        {/* Roles */}
                        {/* Roles */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {allRoles.map((role) => (
                                    <label key={role} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <input
                                            type="radio"
                                            name="role"
                                            value={role}
                                            checked={data.roles[0] === role}
                                            onChange={() => setData('roles', [role])}
                                            className="border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                                        />
                                        {role}
                                    </label>
                                ))}
                            </div>
                            {errors.roles && <p className="mt-1 text-sm text-red-600">{errors.roles}</p>}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <Link
                                href={route('users.index')}
                                className="inline-flex items-center rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Update User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
