'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Document } from '@/components/Dashboard/page';

interface DocumentContextType {
  documents: Document[];
  addDocument: (doc: Document) => void;
  updateDocument: (hash: string, updates: Partial<Document>) => void;
  addFileToDocument: (hash: string, file: { name: string; size: string; uploadedAt: string }) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>([]);

  // Load documents from localStorage on mount
  useEffect(() => {
    const savedDocs = localStorage.getItem('documents');
    if (savedDocs) {
      try {
        const parsedDocs = JSON.parse(savedDocs);
        const validDocs = parsedDocs.map((doc: any) => ({
          ...doc,
          status: doc.status === 'verified' ? 'verified' : 'unverified'
        })) as Document[];
        setDocuments(validDocs);
      } catch (error) {
        console.error('Error loading documents:', error);
      }
    }
  }, []);

  // Save documents to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('documents', JSON.stringify(documents));
  }, [documents]);

  const addDocument = (doc: Document) => {
    setDocuments(prev => [...prev, doc]);
  };

  const updateDocument = (hash: string, updates: Partial<Document>) => {
    setDocuments(prev => prev.map(doc => 
      doc.hash === hash ? { ...doc, ...updates } : doc
    ));
  };

  const addFileToDocument = (hash: string, file: { name: string; size: string; uploadedAt: string }) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.hash === hash) {
        return {
          ...doc,
          files: [...doc.files, file],
          status: 'verified'
        };
      }
      return doc;
    }));
  };

  return (
    <DocumentContext.Provider value={{ documents, addDocument, updateDocument, addFileToDocument }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
} 