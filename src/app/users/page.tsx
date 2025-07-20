"use client";

import { useState } from "react";
import { UserTable } from "@/components/dashboard/user-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  X,
  Users,
  UserPlus,
  UserX,
  Activity
} from "lucide-react";

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "active",
    lastActive: "2 minutes ago",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    status: "active",
    lastActive: "1 hour ago",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Manager",
    status: "inactive",
    lastActive: "3 days ago",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "User",
    status: "blocked",
    lastActive: "1 week ago",
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    role: "User",
    status: "active",
    lastActive: "5 minutes ago",
    avatar: "/api/placeholder/32/32"
  }
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [users, setUsers] = useState(mockUsers);

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  // Stats calculations
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    new: users.filter(u => u.status === "active").length, // Mock calculation
    blocked: users.filter(u => u.status === "blocked").length
  };

  const handleAddUser = (newUser: any) => {
    const user = {
      id: users.length + 1,
      ...newUser,
      lastActive: "Just now",
      avatar: "/api/placeholder/32/32"
    };
    setUsers([...users, user]);
    setShowAddUserModal(false);
  };

  const handleExport = () => {
    const csvContent = [
      ["Name", "Email", "Role", "Status", "Last Active"],
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.role,
        user.status,
        user.lastActive
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setRoleFilter("all");
    setShowFilterModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor user accounts and activities.
          </p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowAddUserModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total.toLocaleString()}</div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active.toLocaleString()}</div>
            <p className="text-xs text-green-600">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <UserPlus className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.new}</div>
            <p className="text-xs text-green-600">+15% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Users</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blocked}</div>
            <p className="text-xs text-red-600">+2 from yesterday</p>
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
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button 
              variant="outline"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button 
              variant="outline"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          
          {/* Active Filters */}
          {(statusFilter !== "all" || roleFilter !== "all" || searchTerm) && (
            <div className="flex items-center space-x-2 mt-4">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Search: {searchTerm}</span>
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setSearchTerm("")}
                  />
                </Badge>
              )}
              {statusFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Status: {statusFilter}</span>
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setStatusFilter("all")}
                  />
                </Badge>
              )}
              {roleFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Role: {roleFilter}</span>
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setRoleFilter("all")}
                  />
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear all
              </Button>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredUsers.length} of {users.length} users
        </p>
      </div>

      {/* Users Table */}
      <EnhancedUserTable users={filteredUsers} onUserUpdate={setUsers} />

      {/* Add User Modal */}
      {showAddUserModal && (
        <AddUserModal 
          onClose={() => setShowAddUserModal(false)}
          onAdd={handleAddUser}
        />
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModal
          statusFilter={statusFilter}
          roleFilter={roleFilter}
          onStatusChange={setStatusFilter}
          onRoleChange={setRoleFilter}
          onClose={() => setShowFilterModal(false)}
          onClear={clearFilters}
        />
      )}
    </div>
  );
}

// Enhanced User Table Component
function EnhancedUserTable({ users, onUserUpdate }: { users: any[], onUserUpdate: (users: any[]) => void }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">User</th>
                <th className="text-left py-3 px-4 font-medium">Role</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Last Active</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {user.name.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {user.lastActive}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found matching your criteria.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Add User Modal Component
function AddUserModal({ onClose, onAdd }: { onClose: () => void, onAdd: (user: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "active"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onAdd(formData);
      setFormData({ name: "", email: "", role: "User", status: "active" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add New User</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Add User
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Filter Modal Component
function FilterModal({ 
  statusFilter, 
  roleFilter, 
  onStatusChange, 
  onRoleChange, 
  onClose, 
  onClear 
}: {
  statusFilter: string,
  roleFilter: string,
  onStatusChange: (status: string) => void,
  onRoleChange: (role: string) => void,
  onClose: () => void,
  onClear: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filter Users</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              value={roleFilter}
              onChange={(e) => onRoleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClear} className="flex-1">
              Clear All
            </Button>
            <Button onClick={onClose} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
