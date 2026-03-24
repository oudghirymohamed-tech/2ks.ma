import { Upload, FileText } from 'lucide-react';
import { useRef, useState } from 'react';
import type { DocumentCategory } from '../types/demo';

interface DocumentUploadProps {
    onUpload?: (file: File, category: DocumentCategory) => void;
    labels?: {
        category: string;
        dropActive: string;
        dropIdle: string;
        typesHint: string;
        browseButton: string;
        categories?: Partial<Record<DocumentCategory, string>>;
    };
}

const categoryOptions: { value: DocumentCategory; label: string }[] = [
    { value: 'prescription', label: 'Ordonnance' },
    { value: 'lab-report', label: 'Résultat labo' },
    { value: 'medical-scan', label: 'Scan médical' },
    { value: 'doctor-report', label: 'Rapport médecin' },
    { value: 'other', label: 'Autre' }
];

const supportedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];

export function DocumentUpload({ onUpload, labels }: DocumentUploadProps) {
    const [isDragActive, setIsDragActive] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('other');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const categoryLabel = labels?.categories;

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(e.type === 'dragenter' || e.type === 'dragover');
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };

    const handleFile = (file: File) => {
        const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
        if (supportedTypes.includes(fileExt)) {
            onUpload?.(file, selectedCategory);
            setSelectedCategory('other');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-4">
            {/* Category Selector */}
            <label className="block">
                <span className="mb-2 block text-sm font-medium text-navy/85">{labels?.category ?? 'Catégorie'}</span>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as DocumentCategory)}
                    className="w-full rounded-2xl border border-sapphire/25 bg-powder/30 px-4 py-2.5 text-sm outline-none transition focus:border-sapphire"
                >
                    {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {categoryLabel?.[option.value] ?? option.label}
                        </option>
                    ))}
                </select>
            </label>

            {/* Drag and Drop Area */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`rounded-3xl border-2 border-dashed transition p-8 text-center ${isDragActive
                    ? 'border-sapphire bg-sapphire/15'
                    : 'border-sapphire/30 bg-powder/20 hover:bg-powder/30'
                    }`}
            >
                <div className="flex flex-col items-center gap-3">
                    <div className="rounded-2xl bg-sapphire/20 p-3">
                        <Upload className="h-6 w-6 text-sapphire" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-navy">
                            {isDragActive
                                ? (labels?.dropActive ?? 'Déposer le fichier ici')
                                : (labels?.dropIdle ?? 'Déposer un fichier ou cliquer pour parcourir')}
                        </p>
                        <p className="mt-1 text-xs text-navy/65">{labels?.typesHint ?? 'PDF, JPG, PNG (max 10 MB)'}</p>
                    </div>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                />
            </div>

            {/* Upload Button */}
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-2xl bg-sapphire px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0C43A0]"
            >
                <FileText className="inline-block h-4 w-4 mr-2" />
                {labels?.browseButton ?? 'Parcourir et sélectionner un fichier'}
            </button>
        </div>
    );
}
