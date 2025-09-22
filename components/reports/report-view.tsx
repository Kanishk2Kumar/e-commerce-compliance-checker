"use client";

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ScanReport, Product } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Package, ExternalLink, TrendingUp, AlertTriangle, CheckCircle, Search, Link, ArrowUpRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface ReportViewProps {
  report: ScanReport;
}

// Generate chart data based on the actual report data
const generateChartData = (report: ScanReport, chartType: string) => {
  const complianceStats = {
    compliant: report.products.filter(p => p.status === 'Compliant').length,
    warning: report.products.filter(p => p.status === 'Warning').length,
    nonCompliant: report.products.filter(p => p.status === 'Non-compliant').length,
  };

  if (chartType === 'pie') {
    return [
      { name: 'Compliant', value: complianceStats.compliant, color: '#10b981' },
      { name: 'With Warnings', value: complianceStats.warning, color: '#f59e0b' },
      { name: 'Non-Compliant', value: complianceStats.nonCompliant, color: '#ef4444' },
    ];
  }

  if (chartType === 'bar') {
    return [
      { 
        category: 'Compliance Status', 
        Compliant: complianceStats.compliant, 
        'With Warnings': complianceStats.warning, 
        'Non-Compliant': complianceStats.nonCompliant 
      }
    ];
  }

  // Default: area chart with historical trend (using the report data as current point)
  const baseData = [
    { date: '2024-06-01', compliant: Math.round(complianceStats.compliant * 0.7), nonCompliant: Math.round(complianceStats.nonCompliant * 1.3), warning: Math.round(complianceStats.warning * 1.2) },
    { date: '2024-06-15', compliant: Math.round(complianceStats.compliant * 0.8), nonCompliant: Math.round(complianceStats.nonCompliant * 1.1), warning: Math.round(complianceStats.warning * 1.1) },
    { date: '2024-06-30', compliant: Math.round(complianceStats.compliant * 0.9), nonCompliant: Math.round(complianceStats.nonCompliant * 1.0), warning: Math.round(complianceStats.warning * 1.0) },
    { date: '2024-07-15', compliant: Math.round(complianceStats.compliant * 0.95), nonCompliant: Math.round(complianceStats.nonCompliant * 0.9), warning: Math.round(complianceStats.warning * 0.9) },
    { date: report.date.split('T')[0], compliant: complianceStats.compliant, nonCompliant: complianceStats.nonCompliant, warning: complianceStats.warning },
  ];

  return baseData;
};

// Function to handle redirect to product page
const handleProductClick = (product: Product) => {
  if (product.productUrl) {
    window.open(product.productUrl, '_blank');
  } else {
    console.log('No product URL available for:', product.name);
  }
};

const COLORS = {
  compliant: '#10b981',
  warning: '#f59e0b',
  nonCompliant: '#ef4444'
};

// Function to find similar products based on product name or category
const findSimilarProducts = (product: Product, allProducts: Product[], maxResults: number = 3) => {
  const currentProductName = product.name.toLowerCase();
  const currentCategory = product.category?.toLowerCase() || '';
  
  return allProducts
    .filter(p => p.id !== product.id && p.status === 'Compliant') // Only show compliant similar products
    .sort((a, b) => {
      // Prioritize products with similar names
      const aNameSimilarity = a.name.toLowerCase().includes(currentProductName) || 
                             currentProductName.includes(a.name.toLowerCase()) ? 1 : 0;
      const bNameSimilarity = b.name.toLowerCase().includes(currentProductName) || 
                             currentProductName.includes(b.name.toLowerCase()) ? 1 : 0;
      
      // Then prioritize same category
      const aCategoryMatch = a.category?.toLowerCase() === currentCategory ? 1 : 0;
      const bCategoryMatch = b.category?.toLowerCase() === currentCategory ? 1 : 0;
      
      return (bNameSimilarity + bCategoryMatch) - (aNameSimilarity + aCategoryMatch);
    })
    .slice(0, maxResults);
};

export default function ReportView({ report }: ReportViewProps) {
  const [timeRange, setTimeRange] = useState('90d');
  const [chartType, setChartType] = useState<'area' | 'bar' | 'pie'>('area');
  const chartData = generateChartData(report, chartType);

  const complianceStats = useMemo(() => {
    const total = report.products.length;
    const compliant = report.products.filter(p => p.status === 'Compliant').length;
    const nonCompliant = report.products.filter(p => p.status === 'Non-compliant').length;
    const warning = report.products.filter(p => p.status === 'Warning').length;
    return { total, compliant, nonCompliant, warning };
  }, [report.products]);

  // Filter only non-compliant products
  const nonCompliantProducts = useMemo(() => {
    return report.products.filter(product => product.status === 'Non-compliant');
  }, [report.products]);

  const compliancePercentage = useMemo(() => {
    return ((complianceStats.compliant / complianceStats.total) * 100).toFixed(1);
  }, [complianceStats]);

  const nonCompliancePercentage = useMemo(() => {
    return ((complianceStats.nonCompliant / complianceStats.total) * 100).toFixed(1);
  }, [complianceStats]);

  const warningPercentage = useMemo(() => {
    return ((complianceStats.warning / complianceStats.total) * 100).toFixed(1);
  }, [complianceStats]);

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry: any, index: number) => (
  <Cell key={`cell-${index}`} fill={entry.color} />
))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Compliant" fill="#10b981" name="Compliant" />
              <Bar dataKey="With Warnings" fill="#f59e0b" name="With Warnings" />
              <Bar dataKey="Non-Compliant" fill="#ef4444" name="Non-Compliant" />
            </BarChart>
          </ResponsiveContainer>
        );

      default: // area chart
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCompliant" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.compliant} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={COLORS.compliant} stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorNonCompliant" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.nonCompliant} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={COLORS.nonCompliant} stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorWarning" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.warning} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={COLORS.warning} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              />
              <Area 
                type="monotone" 
                dataKey="compliant" 
                stackId="1"
                stroke={COLORS.compliant}
                fill="url(#colorCompliant)" 
                name="Compliant"
              />
              <Area 
                type="monotone" 
                dataKey="warning" 
                stackId="1"
                stroke={COLORS.warning}
                fill="url(#colorWarning)" 
                name="With Warnings"
              />
              <Area 
                type="monotone" 
                dataKey="nonCompliant" 
                stackId="1"
                stroke={COLORS.nonCompliant}
                fill="url(#colorNonCompliant)" 
                name="Non-Compliant"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
    }
  };

  // Function to handle redirect to similar product
  const handleSimilarProductClick = (product: Product) => {
    // In a real application, this would redirect to the product page
    // For now, we'll log it and show an alert
    console.log('Redirecting to product:', product);
    alert(`Redirecting to ${product.name} product page\nURL: ${product.productUrl || '#'}`);
    
    // If you have actual product URLs, you can use:
    // window.open(product.productUrl, '_blank');
  };

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
                  {report.companyUrl} <ExternalLink className="w-4 w-4" />
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
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Overall Compliance</CardDescription>
            <CardTitle className="text-4xl text-green-600">{compliancePercentage}%</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>{complianceStats.compliant} compliant products</span>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Compliant</CardDescription>
            <CardTitle className="text-4xl text-green-600">{complianceStats.compliant}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <CheckCircle className="h-3 w-3" />
              <span>{compliancePercentage}% of total</span>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>With Warnings</CardDescription>
            <CardTitle className="text-4xl text-yellow-500">{complianceStats.warning}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <AlertTriangle className="h-3 w-3" />
              <span>{warningPercentage}% of total</span>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Non-Compliant</CardDescription>
            <CardTitle className="text-4xl text-red-600">{complianceStats.nonCompliant}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <AlertTriangle className="h-3 w-3" />
              <span>{nonCompliancePercentage}% of total</span>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Compliance Visualization */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Compliance Analysis</CardTitle>
              <CardDescription>
                Product compliance visualization for {report.companyName}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <ToggleGroup
                type="single"
                value={chartType}
                onValueChange={(value) => value && setChartType(value as 'area' | 'bar' | 'pie')}
                variant="outline"
                className="hidden sm:flex"
              >
                <ToggleGroupItem value="area">Trend</ToggleGroupItem>
                <ToggleGroupItem value="bar">Bar</ToggleGroupItem>
                <ToggleGroupItem value="pie">Pie</ToggleGroupItem>
              </ToggleGroup>
              <Select value={chartType} onValueChange={(value: 'area' | 'bar' | 'pie') => setChartType(value)}>
                <SelectTrigger className="w-28 sm:hidden">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="area">Trend Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                </SelectContent>
              </Select>
              
              {chartType === 'area' && (
                <ToggleGroup
                  type="single"
                  value={timeRange}
                  onValueChange={setTimeRange}
                  variant="outline"
                  className="hidden sm:flex"
                >
                  <ToggleGroupItem value="90d">3M</ToggleGroupItem>
                  <ToggleGroupItem value="30d">1M</ToggleGroupItem>
                  <ToggleGroupItem value="7d">7D</ToggleGroupItem>
                </ToggleGroup>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            {renderChart()}
          </div>
          
          {/* Summary Statistics */}
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{complianceStats.compliant}</div>
              <div className="text-sm text-green-800">Compliant</div>
              <div className="text-xs text-green-600">{compliancePercentage}%</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{complianceStats.warning}</div>
              <div className="text-sm text-yellow-800">Warnings</div>
              <div className="text-xs text-yellow-600">{warningPercentage}%</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{complianceStats.nonCompliant}</div>
              <div className="text-sm text-red-800">Non-Compliant</div>
              <div className="text-xs text-red-600">{nonCompliancePercentage}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scan Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Scan Summary</CardTitle>
          <CardDescription>
            AI-generated analysis of the compliance scan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Compliance Overview</h4>
                <p className="text-blue-800 text-sm whitespace-pre-line">{report.scanData}</p>
                <div className="mt-3 text-xs text-blue-600">
                  Scan completed on {new Date(report.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Non-Compliant Products Table */}
      <Card className="bg-white border-gray-200">
  <CardHeader>
    <CardTitle className="text-gray-900">Non-Compliant Products</CardTitle>
    <CardDescription className="text-gray-600">
      {nonCompliantProducts.length} products requiring attention. Click on product links to view details.
    </CardDescription>
  </CardHeader>
  <CardContent>
    {nonCompliantProducts.length > 0 ? (
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-50 border-gray-200">
            <TableHead className="w-[120px] text-gray-700">Image</TableHead>
            <TableHead className="text-gray-700">Product Name</TableHead>
            <TableHead className="text-gray-700">Category</TableHead>
            <TableHead className="text-gray-700">Product Link</TableHead>
            <TableHead className="text-right text-gray-700">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nonCompliantProducts.map((product) => (
            <TableRow key={product.id} className="hover:bg-gray-50 border-gray-200">
              <TableCell>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium text-gray-900">
                <div className="flex flex-col">
                  <span>{product.name}</span>
                  {product.category && (
                    <span className="text-sm text-muted-foreground">{product.category}</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {product.category || 'N/A'}
              </TableCell>
              <TableCell>
                {product.productUrl ? (
                  <button
                    onClick={() => handleProductClick(product)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors group"
                  >
                    <Link className="h-4 w-4" />
                    <span className="group-hover:underline">View Product</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                ) : (
                  <span className="text-muted-foreground text-sm">No link available</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <StatusBadge status={product.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : (
      <div className="text-center py-8">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900">No Non-Compliant Products</h3>
        <p className="text-muted-foreground">All products are compliant. Great job!</p>
      </div>
    )}
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