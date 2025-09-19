import {Feature} from '@/types';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function NewCommentForm({feature}: {feature: Feature}) {
    const { data, setData, post, processing, errors} = useForm({
        comment: '',
    });

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        post(route('features.comments.store', feature.id), {
            preserveScroll: true,
            preserveState: true,

            onSuccess: () => setData('comment', '')
        });
    };

    return (
        <div className="mt-4">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Add a Comment</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={data.comment}
                    onChange={(e) => setData('comment', e.target.value)}
                    placeholder="Add a comment..."
                className="w-full p-2 border border-gray-300 rounded-md"
                required
            />
            {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}
            <button
                type="submit"
                disabled={processing}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
                {processing ? 'Submitting...' : 'Comment'}
            </button>
        </form>
    </div>
    );
}
