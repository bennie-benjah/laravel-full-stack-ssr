import { Feature } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { can } from '@/helpers';

export default function NewCommentForm({ feature }: { feature: Feature }) {
    const { auth } = usePage().props as { auth: { user: { id: number } } };
    const user = usePage().props.auth.user;
    const { data, setData, post, processing, errors } = useForm({
        comment: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('features.comments.store', feature.id), {
            preserveScroll: true,
            preserveState: true,

            onSuccess: () => setData('comment', ''),
        });
    };
    if (!can(user, 'manage_comments')) {
        return <div>You do not have permission to Comment.</div>;
    }


    return (
        <div className="mt-4">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Add a Comment</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={data.comment}
                    onChange={(e) => setData('comment', e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full rounded-md border border-gray-300 p-2"
                    required
                />
                {errors.comment && <p className="text-sm text-red-500">{errors.comment}</p>}
                <button
                    type="submit"
                    disabled={processing}
                    className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {processing ? 'Submitting...' : 'Comment'}
                </button>
            </form>
        </div>
    );
}
