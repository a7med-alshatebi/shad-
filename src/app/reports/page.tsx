import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Filter, Plus } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      name: "Monthly User Report",
      description: "Comprehensive user activity and engagement metrics",
      type: "User Analytics",
      status: "completed",
      date: "2025-01-15",
      size: "2.4 MB"
    },
    {
      id: 2,
      name: "Revenue Analysis Q4",
      description: "Quarterly revenue breakdown and financial insights",
      type: "Financial",
      status: "processing",
      date: "2025-01-14",
      size: "1.8 MB"
    },
    {
      id: 3,
      name: "Security Audit Report",
      description: "System security assessment and recommendations",
      type: "Security",
      status: "completed",
      date: "2025-01-12",
      size: "3.2 MB"
    },
    {
      id: 4,
      name: "Performance Metrics",
      description: "Application performance and optimization report",
      type: "Performance",
      status: "failed",
      date: "2025-01-10",
      size: "0 MB"
    },
    {
      id: 5,
      name: "Weekly Activity Summary",
      description: "Weekly user engagement and activity overview",
      type: "Activity",
      status: "completed",
      date: "2025-01-08",
      size: "1.2 MB"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'User Analytics':
        return 'bg-blue-100 text-blue-800';
      case 'Financial':
        return 'bg-green-100 text-green-800';
      case 'Security':
        return 'bg-red-100 text-red-800';
      case 'Performance':
        return 'bg-purple-100 text-purple-800';
      case 'Activity':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-2">
            Generate, view, and download various business reports.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-green-600">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98</div>
            <p className="text-xs text-gray-600">77% success rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <FileText className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-gray-600">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Size</CardTitle>
            <Download className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8 GB</div>
            <p className="text-xs text-gray-600">All reports combined</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Type
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Status
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{report.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{report.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getTypeColor(report.type)}>{report.type}</Badge>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{report.date}</p>
                    <p className="text-sm text-gray-500">{report.size}</p>
                  </div>
                  {report.status === 'completed' && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  )}
                  {report.status === 'processing' && (
                    <Button variant="outline" size="sm" disabled>
                      Processing...
                    </Button>
                  )}
                  {report.status === 'failed' && (
                    <Button variant="outline" size="sm">
                      Retry
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
