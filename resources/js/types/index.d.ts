import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';
// import comments from '../routes/features/comments/index';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: string[];
    [key: string]: unknown; // This allows for additional properties...
}
export type PaginatedData = {
    data: T[];
    links: Record<string, string | null>;
};
// In your types file
// In your types file
export interface User {
    id: number;
    name: string;
    email: string;
    permissions: string[];
    roles: string[];
}
export type Comment = {
    id: number;
    comment: string;
    user: User;
    created_at: string;
};
export type Feature = {
    id: number;
    name: string;
    description: string;
    icon?: string;
    created_at: string;
    updated_at?: string;
    user?: User; // Add user property
    upvote_count: number; // Add upvote_count property
    user_upvoted?: boolean; // Add user_upvoted property
    user_downvoted?: boolean; // Add user_downvoted property
    comments?: Comment[]; // Add comments property
};

// Define the pagination response structure
export interface PaginatedResponse<T> {
    data: T[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface IndexProps {
    features: PaginatedResponse<Feature>;
}
