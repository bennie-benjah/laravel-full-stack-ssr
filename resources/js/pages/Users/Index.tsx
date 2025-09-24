import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface User {
    id: number;
    name: string;
    email: string;
    roles: { id: number; name: string }[]; // assuming spatie/roles
    created_at: string;
}

interface Props {
    users: {
        data: User[];
    };
}

export default function Index({ users }: Props) {
    const { data } = users;

    return (
        <AppLayout>
            <Head title="Users" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Users
                    </h1>
                    <Link
                        href={route('users.create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                        Add User
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Roles</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Created At</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                            {data.length > 0 ? (
                                data.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{user.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {user.roles?.map((r) => (
                                                <span key={r.id} className="inline-block px-2 py-1 mr-1 rounded bg-gray-200 dark:bg-gray-700 text-xs">
                                                    {r.name}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm">
                                            {/* <Link
                                                href={route('users.show', user.id)}
                                                className="text-blue-600 hover:underline mr-3"
                                            >
                                                View
                                            </Link> */}
                                            <Link
                                                href={route('users.edit', user.id)}
                                                className="text-green-600 hover:underline mr-3"
                                            >
                                                Edit
                                            </Link>
                                            {/* <Link
                                                href={route('users.destroy', user.id)}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </Link> */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
