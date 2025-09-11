import type { Feature } from '../types';

export default function FeatureUpvoteDownvote({ feature }: { feature: Feature }) {
    return (
        <div className="absolute left-4 top-4 flex flex-col items-center">
                <button className={`text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors ${feature.user_upvoted ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 15.75 7.5-7.5 7.5 7.5"
                        />
                    </svg>
                </button>
                <span className={`my-1 text-xl font-semibold text-gray-800 dark:text-gray-200 ${feature.user_upvoted || feature.user_downvoted ? 'text-blue-600 dark:text-blue-400' : ''}`}>{feature.upvote_count}</span>
                <button className={`text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors ${feature.user_downvoted ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 15.75 7.5-7.5 7.5 7.5"
                        />
                    </svg>
                </button>
                <span className={`my-1 text-xl font-semibold text-gray-800 dark:text-gray-200 ${feature.user_upvoted || feature.user_downvoted ? 'text-blue-600 dark:text-blue-400' : ''}`}>{feature.upvote_count}</span>
                <button className={`text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors ${feature.user_downvoted ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </button>
            </div>
    );
}