"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Scan, Building, Image as ImageIcon } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

export default function NewScanHistory(): JSX.Element {
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      toast({
        title: "Logo Selected",
        description: file.name,
      });
    }
  };

  const handleScan = () => {
    if (!companyName || !companyUrl) {
      toast({
        title: "Missing Information",
        description: "Please provide both company name and URL.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Form Submitted",
      description: `Company: ${companyName}, URL: ${companyUrl}`,
    });

    // Reset form
    setCompanyName("");
    setCompanyUrl("");
    setLogoFile(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl" data-testid="text-form-title">
          <Building className="h-6 w-6" />
          New Compliance Scan
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Company name + URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              data-testid="input-company-name"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-url">Website URL</Label>
            <Input
              id="company-url"
              data-testid="input-company-url"
              placeholder="https://example.com"
              type="url"
              value={companyUrl}
              onChange={(e) => setCompanyUrl(e.target.value)}
            />
          </div>
        </div>

        {/* Logo upload with preview */}
        <div className="space-y-2">
          <Label htmlFor="logo-upload">Company Logo (Optional)</Label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="logo-upload"
              className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-muted"
            >
              <ImageIcon className="w-4 h-4" />
              <span>{logoFile ? "Change Logo" : "Upload Logo"}</span>
            </label>
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            {logoFile && (
              <span className="text-sm text-muted-foreground">
                {logoFile.name}
              </span>
            )}
          </div>
        </div>

        {/* Submit button */}
        <Button
  onClick={handleScan}
  disabled={!companyName || !companyUrl}
  variant="default"
  className="w-full md:w-auto"
  data-testid="button-start-scan"
>
  <Scan className="w-4 h-4 mr-2" />
  Start Compliance Scan
</Button>

      </CardContent>
    </Card>
  );
}
