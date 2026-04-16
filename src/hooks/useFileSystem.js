import { useContext } from 'react';
import { FileSystemContext } from '../context/FileSystemContext';

export function useFileSystem() {
    const context = useContext(FileSystemContext);

    if (!context) {
        throw new Error('useFileSystem debe usarse dentro de FileSystemProvider');
    }

    return context;
}
