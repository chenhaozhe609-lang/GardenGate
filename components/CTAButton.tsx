import Link from 'next/link';

interface CTAButtonProps {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
    className?: string;
}

export function CTAButton({
    text,
    href,
    variant = 'primary',
    className = '',
}: CTAButtonProps) {
    const baseStyles = 'px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl inline-block';

    const variantStyles = {
        primary: 'bg-gradient-to-r from-neonGreen to-neonBlue text-white',
        secondary: 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700',
    };

    return (
        <Link
            href={href}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {text}
        </Link>
    );
}
