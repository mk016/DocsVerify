"use client";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Search, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ethers } from "ethers";
import type { Document } from "@/components/Dashboard/page";
import { useDocuments } from '@/contexts/DocumentContext';

export default function VerifyPage() {
  const { documents, addFileToDocument } = useDocuments();
  const [file, setFile] = useState<File | null>(null);
  const [existingHash, setExistingHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedHash, setGeneratedHash] = useState<string>("");
  const { toast } = useToast();

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setGeneratedHash(""); // Reset hash when new file is dropped
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

  const createNewHash = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please upload a file",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const hash = await generateHash(file);
      setGeneratedHash(hash);

      const newDocument: Document = {
        id: Math.random().toString(),
        hash: hash,
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        status: 'unverified',
        files: [{
          name: file.name,
          size: `${Math.round(file.size / 1024)}KB`,
          uploadedAt: new Date().toISOString()
        }]
      };
      
      addDocument(newDocument);
      toast({
        title: "Success",
        description: "New hash generated and saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate hash",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToExistingHash = async () => {
    if (!file || !existingHash) {
      toast({
        title: "Error",
        description: "Please provide both file and hash",
        variant: "destructive",
      });
      return;
    }

    const existingDoc = documents.find(doc => doc.hash === existingHash);
    if (!existingDoc) {
      toast({
        title: "Error",
        description: "Hash not found in system",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const newFile = {
        name: file.name,
        size: `${Math.round(file.size / 1024)}KB`,
        uploadedAt: new Date().toISOString()
      };

      addFileToDocument(existingHash, newFile);
      toast({
        title: "Success",
        description: "File added to existing hash",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add file",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setFile(null);
      setExistingHash("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload Document</h1>
        
        <Tabs defaultValue="new">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="new">Create New Hash</TabsTrigger>
            <TabsTrigger value="existing">Add to Existing Hash</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <Label>Upload Document</Label>
                  <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${isDragActive ? "border-primary" : "border-border"}
                    ${file ? "bg-muted" : ""}`}>
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

                {generatedHash && (
                  <div className="p-4 bg-muted rounded-lg">
                    <Label>Generated Hash:</Label>
                    <div className="font-mono text-sm break-all">{generatedHash}</div>
                  </div>
                )}

                <Button
                  onClick={createNewHash}
                  disabled={loading || !file}
                  className="w-full"
                >
                  {loading ? "Generating..." : "Generate New Hash"}
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="existing">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <Label>Existing Hash</Label>
                  <Input
                    value={existingHash}
                    onChange={(e) => setExistingHash(e.target.value)}
                    placeholder="Enter existing hash"
                    className="font-mono"
                  />
                </div>

                <div>
                  <Label>Upload Additional Document</Label>
                  <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${isDragActive ? "border-primary" : "border-border"}
                    ${file ? "bg-muted" : ""}`}>
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
                  onClick={addToExistingHash}
                  disabled={loading || !file || !existingHash}
                  className="w-full"
                >
                  {loading ? "Adding..." : "Add to Existing Hash"}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}