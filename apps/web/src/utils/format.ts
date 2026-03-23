export function formatDate(value: string): string {
    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(new Date(value));
}

export function cn(...values: Array<string | false | null | undefined>): string {
    return values.filter(Boolean).join(' ');
}
