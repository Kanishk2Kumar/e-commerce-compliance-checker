"use client";

import { useMemo } from 'react';
import Image from 'next/image';
import { ScanReport, Product } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Package, ExternalLink } from 'lucide-react';

interface ReportViewProps {
  report: ScanReport;
}

export default function ReportView({ report }: ReportViewProps) {
  const complianceStats = useMemo(() => {
    const total = report.products.length;
    const compliant = report.products.filter(p => p.status === 'Compliant').length;
    const nonCompliant = report.products.filter(p => p.status === 'Non-compliant').length;
    const warning = report.products.filter(p => p.status === 'Warning').length;
    return { total, compliant, nonCompliant, warning };
  }, [report.products]);

  return (
    <div className="space-y-8 p-3">
      {/* Company Info */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={report.companyLogoUrl}
                alt={`${report.companyName} logo`}
                width={56}
                height={56}
                className="rounded-lg"
              />
              <div>
                <CardTitle className="text-2xl">{report.companyName}</CardTitle>
                <a
                  href={`https://` + report.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary flex items-center gap-1"
                >
                  {report.companyUrl} <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="text-sm text-muted-foreground flex flex-col md:items-end gap-1">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Scan Date: {new Date(report.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>{report.productsScannedCount} total products scanned</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Compliance Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Compliant</CardDescription>
            <CardTitle className="text-4xl text-green-600">{complianceStats.compliant}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>With Warnings</CardDescription>
            <CardTitle className="text-4xl text-yellow-500">{complianceStats.warning}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Non-Compliant</CardDescription>
            <CardTitle className="text-4xl text-red-600">{complianceStats.nonCompliant}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Product Table */}
      <Card>
        <CardHeader>
          <CardTitle>Scanned Products Details</CardTitle>
          <CardDescription>
            Detailed compliance status for each of the sample products scanned.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={product.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

const StatusBadge = ({ status }: { status: Product['status'] }) => {
  const className = 
    status === 'Compliant' ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200' : 
    status === 'Non-compliant' ? 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200' : 
    'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200';

  return <Badge variant="outline" className={`capitalize ${className}`}>{status}</Badge>;
};
