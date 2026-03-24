export function formatDate(value) {
    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(new Date(value));
}
export function cn(...values) {
    return values.filter(Boolean).join(' ');
}
