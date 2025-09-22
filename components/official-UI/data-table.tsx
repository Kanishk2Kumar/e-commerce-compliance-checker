"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ScanReport } from '../../lib/dummy-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreVertical, Trash2, ExternalLink, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
  import { Progress } from '@/components/ui/progress';

interface ScanHistoryTableProps {
  initialScans: ScanReport[];
}

export function ScanHistoryTable({ initialScans }: ScanHistoryTableProps) {
  const [scans, setScans] = useState<ScanReport[]>(initialScans);
  const [scanToDelete, setScanToDelete] = useState<ScanReport | null>(null);
  const { toast } = useToast();

  const handleDelete = () => {
    if (scanToDelete) {
      setScans(scans.filter(scan => scan.id !== scanToDelete.id));
      toast({
        title: 'Scan Deleted',
        description: `The scan for ${scanToDelete.companyName} has been deleted.`,
      });
      setScanToDelete(null);
    }
  };

  // Calculate non-compliance percentage
  const calculateNonCompliancePercentage = (scan: ScanReport) => {
    if (scan.productsScannedCount === 0) return 0;
    return (scan.nonCompliantProductsCount / scan.productsScannedCount) * 100;
  };

  // Get compliance status badge
  const getComplianceBadge = (percentage: number) => {
    if (percentage === 0) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Compliant
        </Badge>
      );
    } else if (percentage <= 10) {
      return (
        <Badge variant="default" className="bg-amber-100 text-amber-800 border-amber-200">
          <TrendingUp className="w-3 h-3 mr-1" />
          Minor Issues
        </Badge>
      );
    } else {
      return (
        <Badge variant="default" className="bg-red-100 text-red-800 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Needs Attention
        </Badge>
      );
    }
  };

  if (scans.length === 0) {
    return (
      <Card className="text-center py-12 border-0 shadow-lg">
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No scans conducted yet</h3>
              <p className="text-muted-foreground mt-1">Run a new scan to see the history here.</p>
            </div>
            <Button className="mt-4">Run First Scan</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-0 shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Scan History</h1>
              <p className="text-muted-foreground mt-1">Overview of all compliance scans conducted</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              New Scan
            </Button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold">Company</TableHead>
                <TableHead className="font-semibold text-center">Total Products Scanned</TableHead>
                <TableHead className="font-semibold text-center">Non-Compliant Products</TableHead>
                <TableHead className="font-semibold text-center">Non-Compliance %</TableHead>
                <TableHead className="font-semibold text-center">Status</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scans.map((scan) => {
                const nonCompliancePercentage = calculateNonCompliancePercentage(scan);
                
                return (
                  <TableRow key={scan.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Image
                            src={scan.companyLogoUrl}
                            alt={`${scan.companyName} logo`}
                            width={48}
                            height={48}
                            className="rounded-lg border"
                            data-ai-hint={scan.companyLogoHint}
                          />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <div className="font-semibold text-base">{scan.companyName}</div>
                          <a
                            href={`https://${scan.companyUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                          >
                            {scan.companyUrl} <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-lg">{scan.productsScannedCount}</span>
                        <span className="text-xs text-muted-foreground">Products</span>
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        <span className={`font-semibold text-lg ${
                          scan.nonCompliantProductsCount > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {scan.nonCompliantProductsCount}
                        </span>
                        <span className="text-xs text-muted-foreground">Issues Found</span>
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <span className={`font-semibold ${
                            nonCompliancePercentage > 10 ? 'text-red-600' : 
                            nonCompliancePercentage > 0 ? 'text-amber-600' : 'text-green-600'
                          }`}>
                            {nonCompliancePercentage.toFixed(1)}%
                          </span>
                        </div>
                        <Progress 
                          value={nonCompliancePercentage} 
                          className={`w-16 h-2 ${
                            nonCompliancePercentage > 10 ? 'bg-red-200' : 
                            nonCompliancePercentage > 0 ? 'bg-amber-200' : 'bg-green-200'
                          }`}
                        />
                      </div>
                    </TableCell>
                    
                    <TableCell className="text-center">
                      {getComplianceBadge(nonCompliancePercentage)}
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{new Date(scan.date).toLocaleDateString()}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(scan.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                          <Link href={`/${scan.id}`}>
                            {/* <TrendingUp className="w-4 h-4 mr-2" /> */}
                            View Details
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem asChild>
                              <Link href={`/${scan.id}`} className="flex items-center cursor-pointer">
                                <TrendingUp className="mr-2 h-4 w-4" />
                                <span>View Full Report</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/${scan.id}/export`} className="flex items-center cursor-pointer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                <span>Export Results</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onSelect={() => setScanToDelete(scan)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete Scan</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination would go here */}
        <div className="border-t px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {scans.length} of {scans.length} scans
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <AlertDialog open={!!scanToDelete} onOpenChange={(open) => !open && setScanToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Scan Report</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the scan report for{' '}
              <span className="font-semibold">{scanToDelete?.companyName}</span> conducted on{' '}
              <span className="font-semibold">
                {scanToDelete ? new Date(scanToDelete.date).toLocaleDateString() : ''}
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
            >
              Delete Report
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// You'll need to add this import and component
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

// Also, update your ScanReport interface to include nonCompliantProductsCount
// Add this to your ScanReport type definition:
/*
interface ScanReport {
  id: string;
  companyName: string;
  companyUrl: string;
  companyLogoUrl: string;
  companyLogoHint: string;
  productsScannedCount: number;
  nonCompliantProductsCount: number; // Add this
  date: string;
}
*/