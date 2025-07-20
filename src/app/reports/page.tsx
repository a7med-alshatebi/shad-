"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Plus, Search, X } from "lucide-react";

interface Report {
  id: number;
  name: string;
  description: string;
  type: string;
  status: string;
  date: string;
  size: string;
}

interface NewReport {
  name: string;
  description: string;
  type: string;
}

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [reports, setReports] = useState([
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
  ]);

  // Filter reports based on search and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || report.type.toLowerCase().includes(typeFilter.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleGenerateReport = (reportData: NewReport) => {
    const newReport: Report = {
      id: reports.length + 1,
      ...reportData,
      status: "processing",
      date: new Date().toISOString().split('T')[0],
      size: "Generating..."
    };
    setReports([newReport, ...reports]);
    setShowGenerateModal(false);
    
    // Simulate report generation
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === newReport.id 
          ? { ...r, status: "completed", size: "1.5 MB" }
          : r
      ));
    }, 3000);
  };

  const handleDownload = (report: Report) => {
    // Simulate download
    const blob = new Blob([`Report: ${report.name}\nGenerated: ${report.date}`], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.name.replace(/\s+/g, '_')}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleRetry = (reportId: number) => {
    setReports(prev => prev.map(r => 
      r.id === reportId 
        ? { ...r, status: "processing" }
        : r
    ));
    
    // Simulate retry
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === reportId 
          ? { ...r, status: "completed", size: "2.1 MB" }
          : r
      ));
    }, 2000);
  };

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
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowGenerateModal(true)}
        >
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

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="user">User Analytics</option>
              <option value="financial">Financial</option>
              <option value="security">Security</option>
              <option value="performance">Performance</option>
              <option value="activity">Activity</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          
          {/* Active Filters */}
          {(typeFilter !== "all" || statusFilter !== "all" || searchTerm) && (
            <div className="flex items-center space-x-2 mt-4">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Search: {searchTerm}</span>
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                </Badge>
              )}
              {typeFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Type: {typeFilter}</span>
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setTypeFilter("all")} />
                </Badge>
              )}
              {statusFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Status: {statusFilter}</span>
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setStatusFilter("all")} />
                </Badge>
              )}
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredReports.length} of {reports.length} reports
        </p>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => (
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(report)}
                    >
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRetry(report.id)}
                    >
                      Retry
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {filteredReports.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No reports found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <GenerateReportModal 
          onClose={() => setShowGenerateModal(false)}
          onGenerate={handleGenerateReport}
        />
      )}
    </div>
  );
}

// Generate Report Modal Component
function GenerateReportModal({ onClose, onGenerate }: { onClose: () => void, onGenerate: (report: NewReport) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "User Analytics",
    timeRange: "last30days"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.description) {
      onGenerate(formData);
      setFormData({ name: "", description: "", type: "User Analytics", timeRange: "last30days" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Generate New Report</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Report Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter report name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter report description"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Report Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="User Analytics">User Analytics</option>
              <option value="Financial">Financial</option>
              <option value="Security">Security</option>
              <option value="Performance">Performance</option>
              <option value="Activity">Activity</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Time Range</label>
            <select
              value={formData.timeRange}
              onChange={(e) => setFormData({...formData, timeRange: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
              <option value="lastyear">Last Year</option>
            </select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Generate Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
