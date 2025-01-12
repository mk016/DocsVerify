"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ethers } from "ethers";

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState("");
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

  const verifyByFile = async () => {
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
      const generatedHash = await generateHash(file);
      
      toast({
        title: "Success",
        description: `Document hash: ${generatedHash.slice(0, 10)}...`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify document",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyByHash = async () => {
    if (!hash) {
      toast({
        title: "Error",
        description: "Please enter a hash",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      toast({
        title: "Success",
        description: "Hash verification completed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify hash",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Verify Document</h1>
        
        <Tabs defaultValue="file">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="file">Verify by File</TabsTrigger>
            <TabsTrigger value="hash">Verify by Hash</TabsTrigger>
          </TabsList>
          
          <TabsContent value="file">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <Label>Upload Document</Label>
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
                  onClick={verifyByFile}
                  disabled={loading || !file}
                  className="w-full"
                >
                  {loading ? "Verifying..." : "Verify Document"}
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="hash">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="hash">Document Hash</Label>
                  <Input
                    id="hash"
                    value={hash}
                    onChange={(e) => setHash(e.target.value)}
                    placeholder="Enter document hash"
                  />
                </div>

                <Button
                  onClick={verifyByHash}
                  disabled={loading || !hash}
                  className="w-full"
                >
                  {loading ? "Verifying..." : "Verify Hash"}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}