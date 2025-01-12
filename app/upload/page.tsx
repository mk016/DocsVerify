"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ethers } from "ethers";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const generateHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const hash = ethers.keccak256(bytes);
    return hash;
  };

  const handleUpload = async () => {
    if (!file || !documentName) {
      toast({
        title: "Error",
        description: "Please provide both a document name and file",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const hash = await generateHash(file);
      
      toast({
        title: "Success",
        description: `Document hash generated: ${hash.slice(0, 10)}...`,
      });
      
      setFile(null);
      setDocumentName("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process document",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload Document</h1>
        
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="documentName">Document Name</Label>
              <Input
                id="documentName"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Enter document name"
              />
            </div>

            <div>
              <Label>Document File</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                  ${isDragActive ? "border-primary" : "border-border"}
                  ${file ? "bg-muted" : ""}`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 mb-4 text-muted-foreground" />
                {file ? (
                  <p>{file.name}</p>
                ) : isDragActive ? (
                  <p>Drop the file here</p>
                ) : (
                  <p>Drag and drop a file here, or click to select</p>
                )}
              </div>
            </div>

            <Button
              onClick={handleUpload}
              disabled={loading || !file || !documentName}
              className="w-full"
            >
              {loading ? "Processing..." : "Upload Document"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}