
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ScanReport } from '../../lib/dummy-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreVertical, Trash2, ExternalLink } from 'lucide-react';
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

  if (scans.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <p className="text-muted-foreground">No scans conducted yet.</p>
          <p className="text-muted-foreground">Run a new scan to see the history here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className='p-3'>
        <h1 className="px-3 text-2xl font-bold tracking-tight">Scan History</h1>
        <Table  >
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Products Scanned</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scans.map((scan) => (
              <TableRow key={scan.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Image
                      src={scan.companyLogoUrl}
                      alt={`${scan.companyName} logo`}
                      width={40}
                      height={40}
                      className="rounded-full"
                      data-ai-hint={scan.companyLogoHint}
                    />
                    <div>
                      <div className="font-medium">{scan.companyName}</div>
                      <a
                        href={`https://${scan.companyUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                      >
                        {scan.companyUrl} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{scan.productsScannedCount}</TableCell>
                <TableCell>{new Date(scan.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/${scan.id}`}>View Details</Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setScanToDelete(scan)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <AlertDialog open={!!scanToDelete} onOpenChange={(open) => !open && setScanToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the scan report for{' '}
              <span className="font-semibold">{scanToDelete?.companyName}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
