

export const getMimeType = (ext: string): string => {
    const map: Record<string, string> = {
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        pdf: 'application/pdf',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        mp4: 'video/mp4',
    };
    return map[ext.toLowerCase()] || 'application/*';
};

export const getFileIcon = (ext: string): { name: string; color: string } => {
    const extLower = ext.toLowerCase();
    const iconMap: Record<string, { name: string; color: string }> = {
        pdf: { name: 'file-pdf-box', color: '#D32F2F' },
        docx: { name: 'file-word-box', color: '#2962FF' },
        pptx: { name: 'file-powerpoint-box', color: '#F57C00' },
        xlsx: { name: 'file-excel-box', color: '#388E3C' },
        mp4: { name: 'file-video', color: '#7B1FA2' },
        mp3: { name: 'file-music', color: '#009688' },
        jpg: { name: 'image', color: '#555' },
        jpeg: { name: 'image', color: '#555' },
        png: { name: 'image', color: '#555' },
    };
    return iconMap[extLower] || { name: 'file', color: '#555' };
};
