// Type definitions for Contact form
export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactResponse {
    message?: string;
    error?: string;
}

export interface ContactMethod {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    href: string;
}
