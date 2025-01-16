'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, History, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface Document {
  id: string;
  hash: string;
  fileName: string;
  uploadDate: string;
  status: 'verified' | 'unverified';
  files: {
    name: string;
    size: string;
    uploadedAt: string;
  }[];
}

interface DashboardProps {
  documents: Document[];
}
const [showHistory, setShowHistory] = React.useState(false);
const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set());
const [selectedDoc, setSelectedDoc] = React.useState<Document | null>(null);
const { toast } = useToast();

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Hash copied to clipboard",
      duration: 2000,
    });
  } catch (err) {
    toast({
      title: "Error",
      description: "Failed to copy hash",
      variant: "destructive",
    });
  }
};

const handleViewDetails = (doc: Document) => {
  setSelectedDoc(doc);
};

const toggleRow = (id: string) => {
  const newExpandedRows = new Set(expandedRows);
  if (expandedRows.has(id)) {
    newExpandedRows.delete(id);
  } else {
    newExpandedRows.add(id);
  }
  setExpandedRows(newExpandedRows);
};

return (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold">Document Dashboard</h2>
      <Button 
        variant="outline" 
        onClick={() => setShowHistory(!showHistory)}
        className="flex items-center gap-2"
      >
        <History className="h-4 w-4" />
        {showHistory ? 'Hide History' : 'Show History'}
      </Button>
    </div>

    <Card className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8"></TableHead>
            <TableHead>Hash</TableHead>
            <TableHead>Document Name</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Associated Files</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <React.Fragment key={doc.id}>
              <TableRow>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-8 w-8"
                    onClick={() => toggleRow(doc.id)}
                  >
                    {expandedRows.has(doc.id) ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </Button>
                </TableCell>
                <TableCell className="font-mono text-sm break-all group relative">
                  <div className="flex items-center gap-2">
                    <span>{doc.hash.slice(0, 10)}...{doc.hash.slice(-8)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(doc.hash)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{doc.fileName}</TableCell>
                <TableCell>{doc.uploadDate}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    doc.status === 'verified' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                  }`}>
                    {doc.status}
                  </span>
                </TableCell>
                <TableCell>{doc.files.length} files</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewDetails(doc)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
              {expandedRows.has(doc.id) && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="pl-8 py-2 space-y-2">
                      {doc.files.map((file, index) => (
                        <div key={index} className="flex items-center gap-4 text-sm bg-muted/50 p-2 rounded">
                          <FileText className="h-4 w-4" />
                          <span className="flex-1">{file.name}</span>
                          <span className="text-muted-foreground">{file.size}</span>
                          <span className="text-muted-foreground">{new Date(file.uploadedAt).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </Card>

    {showHistory && (
      <Card className="p-4 mt-4">
        <h3 className="text-xl font-semibold mb-4">Document History</h3>
        {/* Add your history table or list here */}
      </Card>
    )}

    {/* Document Details Dialog */}
    {selectedDoc && (
      <Card className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Document Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedDoc(null)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Hash</p>
                <p className="font-mono text-sm break-all">{selectedDoc.hash}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">File Name</p>
                <p>{selectedDoc.fileName}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Upload Date</p>
                <p>{new Date(selectedDoc.uploadDate).toLocaleString()}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Status</p>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  selectedDoc.status === 'verified' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedDoc.status}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Associated Files</p>
                <div className="space-y-2">
                  {selectedDoc.files.map((file, index) => (
                    <div key={index} className="flex items-center gap-4 text-sm bg-muted p-2 rounded">
                      <FileText className="h-4 w-4" />
                      <span className="flex-1">{file.name}</span>
                      <span className="text-muted-foreground">{file.size}</span>
                      <span className="text-muted-foreground">
                        {new Date(file.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    )}
  </div>
);
