import { Feature } from '../types/index';
import { useState } from 'react';
export default function FeatureItem({ feature }: { feature: Feature }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleReadMore = () => setIsExpanded(!isExpanded);
    return (
        <div className="relative rounded-lg border border-gray-200 p-6 transition-shadow duration-300 hover:shadow-lg dark:border-gray-700">
            {/* Voting section in top-left corner */}
            <div className="absolute left-4 top-4 flex flex-col items-center">
                <button className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
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
                <span className="my-1 text-xl font-semibold text-gray-800 dark:text-gray-200">12</span>
                <button className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
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

            {/* Feature icon (if available) */}
            {feature.icon && (
                <div className="mb-4 flex justify-center">
                    <i className={`icon-${feature.icon} text-3xl text-blue-600 dark:text-blue-400`}></i>
                </div>
            )}

            {/* Feature content - adjusted for voting section */}
            <div className={feature.icon ? "mt-2" : "ml-10"}>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{feature.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{isExpanded ? feature.description : `${feature.description.substring(0, 100)}...`}</p>
                <button onClick={toggleReadMore} className="text-blue-600 dark:text-blue-400">
                    {isExpanded ? "Read Less" : "Read More"}
                </button>
            </div>
        </div>
    );
}

