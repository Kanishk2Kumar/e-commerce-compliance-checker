"use client";

import React, { JSX, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Link2, ListStart, ListEnd, Scan } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

export default function NewScan(): JSX.Element {
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [startRange, setStartRange] = useState("");
  const [endRange, setEndRange] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleScan = async () => {
    if (!companyName || !companyUrl || !startRange || !endRange) {
      toast({
        title: "Missing Information",
        description: "Please provide all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:9000/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: companyName,
          url: companyUrl,
          start: parseInt(startRange, 10),
          end: parseInt(endRange, 10),
        }),
      });

      const data = await res.json();

      toast({
        title: "Scan Dispatched",
        description: `Company: ${companyName}, Range: ${startRange}-${endRange}`,
      });

      // Reset form
      setCompanyName("");
      setCompanyUrl("");
      setStartRange("");
      setEndRange("");
    } catch (error: any) {
      toast({
        title: "Error Dispatching Scan",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle
          className="flex items-center gap-2 text-xl"
          data-testid="text-form-title"
        >
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

        {/* Start & End Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="start-range">Start Range</Label>
            <div className="flex items-center gap-2">
              <ListStart className="w-4 h-4 text-muted-foreground" />
              <Input
                id="start-range"
                type="number"
                placeholder="1"
                value={startRange}
                onChange={(e) => setStartRange(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-range">End Range</Label>
            <div className="flex items-center gap-2">
              <ListEnd className="w-4 h-4 text-muted-foreground" />
              <Input
                id="end-range"
                type="number"
                placeholder="100"
                value={endRange}
                onChange={(e) => setEndRange(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Submit button */}
        <Button
          onClick={handleScan}
          disabled={loading}
          variant="default"
          className="w-full md:w-auto"
          data-testid="button-start-scan"
        >
          <Scan className="w-4 h-4 mr-2" />
          {loading ? "Dispatching..." : "Start Compliance Scan"}
        </Button>
      </CardContent>
    </Card>
  );
}
