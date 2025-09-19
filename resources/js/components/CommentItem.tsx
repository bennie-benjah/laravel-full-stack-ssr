import { Comment } from '../types/index';
import { useForm } from '@inertiajs/react';
// import { Trash2 } from 'lucide-react';
import { route } from 'ziggy-js';

export default function CommentItem({ comment, authUserId }: { comment: Comment; authUserId: number }) {
    const { delete: destroy } = useForm();
    // const { auth } = usePage().props as { auth: { user: { id: number } } };
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this comment?')) {
            destroy(route('comments.destroy', comment.id), {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 py-4 flex items-start space-x-3">
            {/* User Avatar */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>


            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{comment.user.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(comment.created_at).toLocaleString()}
                        </span>
                    </div>

                    {/* Delete button - only for comment owner */}
                    {authUserId === comment.user.id && (
                        <button
                            onClick={handleDelete}
                            className="text-red-500 hover:text-red-700 transition"
                            title="Delete comment"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                        </button>
                    )}
                </div>

                <p className="text-gray-800 dark:text-gray-200 mt-1">{comment.comment}</p>
            </div>
        </div>
    );
}
