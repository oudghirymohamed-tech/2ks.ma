import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Upload, FileText } from 'lucide-react';
import { useRef, useState } from 'react';
const categoryOptions = [
    { value: 'prescription', label: 'Ordonnance' },
    { value: 'lab-report', label: 'Résultat labo' },
    { value: 'medical-scan', label: 'Scan médical' },
    { value: 'doctor-report', label: 'Rapport médecin' },
    { value: 'other', label: 'Autre' }
];
const supportedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
export function DocumentUpload({ onUpload, labels }) {
    const [isDragActive, setIsDragActive] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('other');
    const fileInputRef = useRef(null);
    const categoryLabel = labels?.categories;
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(e.type === 'dragenter' || e.type === 'dragover');
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };
    const handleFile = (file) => {
        const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
        if (supportedTypes.includes(fileExt)) {
            onUpload?.(file, selectedCategory);
            setSelectedCategory('other');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };
    const handleInputChange = (e) => {
        if (e.target.files?.[0]) {
            handleFile(e.target.files[0]);
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("label", { className: "block", children: [_jsx("span", { className: "mb-2 block text-sm font-medium text-navy/85", children: labels?.category ?? 'Catégorie' }), _jsx("select", { value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), className: "w-full rounded-2xl border border-sapphire/25 bg-powder/30 px-4 py-2.5 text-sm outline-none transition focus:border-sapphire", children: categoryOptions.map((option) => (_jsx("option", { value: option.value, children: categoryLabel?.[option.value] ?? option.label }, option.value))) })] }), _jsxs("div", { onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, className: `rounded-3xl border-2 border-dashed transition p-8 text-center ${isDragActive
                    ? 'border-sapphire bg-sapphire/15'
                    : 'border-sapphire/30 bg-powder/20 hover:bg-powder/30'}`, children: [_jsxs("div", { className: "flex flex-col items-center gap-3", children: [_jsx("div", { className: "rounded-2xl bg-sapphire/20 p-3", children: _jsx(Upload, { className: "h-6 w-6 text-sapphire" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-navy", children: isDragActive
                                            ? (labels?.dropActive ?? 'Déposer le fichier ici')
                                            : (labels?.dropIdle ?? 'Déposer un fichier ou cliquer pour parcourir') }), _jsx("p", { className: "mt-1 text-xs text-navy/65", children: labels?.typesHint ?? 'PDF, JPG, PNG (max 10 MB)' })] })] }), _jsx("input", { ref: fileInputRef, type: "file", onChange: handleInputChange, accept: ".pdf,.jpg,.jpeg,.png", className: "hidden" })] }), _jsxs("button", { type: "button", onClick: () => fileInputRef.current?.click(), className: "w-full rounded-2xl bg-sapphire px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0C43A0]", children: [_jsx(FileText, { className: "inline-block h-4 w-4 mr-2" }), labels?.browseButton ?? 'Parcourir et sélectionner un fichier'] })] }));
}
