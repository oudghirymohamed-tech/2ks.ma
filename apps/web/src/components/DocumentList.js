import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Download, Eye, Trash2, File } from 'lucide-react';
import { formatDate } from '../utils/format';
const categoryLabels = {
    'prescription': 'Ordonnance',
    'lab-report': 'Résultat labo',
    'medical-scan': 'Scan médical',
    'doctor-report': 'Rapport médecin',
    'other': 'Autre'
};
const categoryColors = {
    'prescription': 'bg-sapphire/15 text-sapphire',
    'lab-report': 'bg-powder/30 text-navy',
    'medical-scan': 'bg-call/20 text-call',
    'doctor-report': 'bg-emergency/15 text-emergency',
    'other': 'bg-navy/10 text-navy'
};
function formatFileSize(bytes) {
    if (bytes === 0)
        return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
function getMimeTypeIcon(mimeType) {
    if (mimeType.startsWith('image/')) {
        return '🖼️';
    }
    if (mimeType === 'application/pdf') {
        return '📄';
    }
    return '📎';
}
export function DocumentList({ documents, onDelete, labels }) {
    const categoryLabel = labels?.categories;
    if (documents.length === 0) {
        return (_jsxs("div", { className: "rounded-3xl border border-sapphire/20 bg-powder/15 p-8 text-center", children: [_jsx(File, { className: "mx-auto h-12 w-12 text-navy/40" }), _jsx("p", { className: "mt-3 text-sm font-medium text-navy/70", children: labels?.emptyTitle ?? 'Aucun document uploadé' }), _jsx("p", { className: "mt-1 text-xs text-navy/60", children: labels?.emptyHint ?? 'Commencez par télécharger vos premiers documents médicaux.' })] }));
    }
    return (_jsx("div", { className: "space-y-3", children: documents.map((doc) => (_jsx("div", { className: "rounded-3xl border border-sapphire/20 bg-powder/20 p-4 transition hover:bg-powder/30", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "text-2xl", children: getMimeTypeIcon(doc.mimeType) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [_jsx("h3", { className: "font-medium text-navy truncate", children: doc.fileName }), _jsx("span", { className: `rounded-full px-2.5 py-1 text-xs font-semibold ${categoryColors[doc.category]}`, children: categoryLabel?.[doc.category] ?? categoryLabels[doc.category] })] }), _jsxs("p", { className: "mt-2 text-xs text-navy/65", children: [formatDate(doc.uploadedAt), " \u2022 ", formatFileSize(doc.fileSize)] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [doc.url ? (_jsx("a", { href: doc.url, target: "_blank", rel: "noreferrer", title: labels?.viewTitle ?? 'Voir le document', className: "rounded-full border border-sapphire/30 bg-sapphire/15 p-2.5 text-sapphire transition hover:bg-sapphire/25", children: _jsx(Eye, { className: "h-4 w-4" }) })) : (_jsx("button", { type: "button", disabled: true, title: labels?.viewTitle ?? 'Voir le document', className: "rounded-full border border-slate-200 bg-slate-100 p-2.5 text-slate-400", children: _jsx(Eye, { className: "h-4 w-4" }) })), doc.url ? (_jsx("a", { href: doc.url, download: doc.fileName, title: labels?.downloadTitle ?? 'Télécharger', className: "rounded-full border border-call/30 bg-call/15 p-2.5 text-call transition hover:bg-call/25", children: _jsx(Download, { className: "h-4 w-4" }) })) : (_jsx("button", { type: "button", disabled: true, title: labels?.downloadTitle ?? 'Télécharger', className: "rounded-full border border-slate-200 bg-slate-100 p-2.5 text-slate-400", children: _jsx(Download, { className: "h-4 w-4" }) })), _jsx("button", { type: "button", onClick: () => onDelete?.(doc.id), title: labels?.deleteTitle ?? 'Supprimer', className: "rounded-full border border-emergency/30 bg-emergency/15 p-2.5 text-emergency transition hover:bg-emergency/25", children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] }) }, doc.id))) }));
}
