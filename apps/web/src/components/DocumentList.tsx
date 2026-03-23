import { Download, Eye, Trash2, File } from 'lucide-react';
import type { MedicalDocument, DocumentCategory } from '../types/demo';
import { formatDate } from '../utils/format';

interface DocumentListProps {
    documents: MedicalDocument[];
    onDelete?: (docId: string) => void;
}

const categoryLabels: Record<DocumentCategory, string> = {
    'prescription': 'Ordonnance',
    'lab-report': 'Résultat labo',
    'medical-scan': 'Scan médical',
    'doctor-report': 'Rapport médecin',
    'other': 'Autre'
};

const categoryColors: Record<DocumentCategory, string> = {
    'prescription': 'bg-sapphire/15 text-sapphire',
    'lab-report': 'bg-powder/30 text-navy',
    'medical-scan': 'bg-call/20 text-call',
    'doctor-report': 'bg-emergency/15 text-emergency',
    'other': 'bg-navy/10 text-navy'
};

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function getMimeTypeIcon(mimeType: string): React.ReactNode {
    if (mimeType.startsWith('image/')) {
        return '🖼️';
    }
    if (mimeType === 'application/pdf') {
        return '📄';
    }
    return '📎';
}

export function DocumentList({ documents, onDelete }: DocumentListProps) {
    if (documents.length === 0) {
        return (
            <div className="rounded-3xl border border-sapphire/20 bg-powder/15 p-8 text-center">
                <File className="mx-auto h-12 w-12 text-navy/40" />
                <p className="mt-3 text-sm font-medium text-navy/70">Aucun document uploadé</p>
                <p className="mt-1 text-xs text-navy/60">Commencez par télécharger vos premières documents médicaux.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {documents.map((doc) => (
                <div
                    key={doc.id}
                    className="rounded-3xl border border-sapphire/20 bg-powder/20 p-4 transition hover:bg-powder/30"
                >
                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="text-2xl">{getMimeTypeIcon(doc.mimeType)}</div>

                        {/* Document Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="font-medium text-navy truncate">{doc.fileName}</h3>
                                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${categoryColors[doc.category]}`}>
                                    {categoryLabels[doc.category]}
                                </span>
                            </div>
                            <p className="mt-2 text-xs text-navy/65">
                                {formatDate(doc.uploadedAt)} • {formatFileSize(doc.fileSize)}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                title="Voir le document"
                                className="rounded-full border border-sapphire/30 bg-sapphire/15 p-2.5 text-sapphire transition hover:bg-sapphire/25"
                            >
                                <Eye className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                title="Télécharger"
                                className="rounded-full border border-call/30 bg-call/15 p-2.5 text-call transition hover:bg-call/25"
                            >
                                <Download className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => onDelete?.(doc.id)}
                                title="Supprimer"
                                className="rounded-full border border-emergency/30 bg-emergency/15 p-2.5 text-emergency transition hover:bg-emergency/25"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
