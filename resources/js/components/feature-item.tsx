import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Feature } from '../types/index';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
// import { route } from 'ziggy-js';
export default function FeatureItem({ feature }: { feature: Feature }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleReadMore = () => setIsExpanded(!isExpanded);
    const upvoteForm = useForm({
        is_upvote: true,
        feature_id: feature.id,
    });
    const downvoteForm = useForm({
        is_upvote: false,
        feature_id: feature.id,
    });
    const UpvoteDownvote = (is_upvote: boolean) => {
        if ((feature.user_upvoted && is_upvote) || (feature.user_downvoted && !is_upvote)) {
            upvoteForm.delete(route('upvote.destroy', feature.id), {
                preserveScroll: true,

            });
            return;

        }else{
            let form = null;
            if (is_upvote) {
                form = upvoteForm;
            } else {
                form = downvoteForm;
            }
            form.setData({
                is_upvote: is_upvote,
                feature_id: feature.id,

            });
            form.post(route('features.upvote', feature.id), {
                preserveScroll: true,
            });
        }
    };
    // Simple implementation assuming route names map to URLs like `/features/:id`

    return (
        <div className="relative rounded-lg border border-gray-200 p-6 transition-shadow duration-300 hover:shadow-lg dark:border-gray-700">
            {/* Voting section in top-left corner */}
            <div className="absolute top-4 left-4 flex flex-col items-center">
                <button
                    className={`text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 ${feature.user_upvoted ? 'text-blue-600 dark:text-blue-400' : ''}`}
                    onClick={() => UpvoteDownvote(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </button>
                <span
                    className={`my-1 text-xl font-semibold text-gray-800 dark:text-gray-200 ${feature.user_upvoted || feature.user_downvoted ? 'text-blue-600 dark:text-blue-400' : ''}`}
                >
                    {feature.upvote_count}
                </span>
                <button
                    className={`text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 ${feature.user_downvoted ? 'text-blue-600 dark:text-blue-400' : ''}`}
                    onClick={() => UpvoteDownvote(false)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
               
            </div>

            {/* Feature icon (if available) */}
            {feature.icon && (
                <div className="mb-4 flex justify-center">
                    <i className={`icon-${feature.icon} text-3xl text-blue-600 dark:text-blue-400`}></i>
                </div>
            )}

            {/* Feature content - adjusted for voting section */}
            <div className={feature.icon ? 'mt-2' : 'ml-10'}>
                <Link
                // href={route('features.show', feature.id)}
                // className="block mb-2 group"
                >
                    <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {feature.name}
                    </h3>
                </Link>

                <p className="mb-2 text-gray-600 dark:text-gray-400">
                    {isExpanded ? feature.description : `${feature.description.substring(0, 100)}...`}
                </p>
<div className="mt-6 py-4">
   <Link
    href={route('features.show', feature.id)}
    className="inline-block px-3 py-1 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
>
    Comments
</Link>

</div>
                <div className="mt-4 flex items-center justify-between">
                    <button
                        onClick={toggleReadMore}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>

                    <Link
                        href={`/features/${feature.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        View Details →
                    </Link>
                </div>
            </div>
        </div>
    );
}
