"use client";

import React, { createContext, useContext, useState } from 'react';

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: number) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "info",
      title: "New user registration",
      message: "John Doe has created a new account and is awaiting approval.",
      time: "2 minutes ago",
      read: false,
      priority: "normal"
    },
    {
      id: 2,
      type: "warning",
      title: "System maintenance scheduled",
      message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST.",
      time: "1 hour ago",
      read: false,
      priority: "high"
    },
    {
      id: 3,
      type: "success",
      title: "Monthly report generated",
      message: "Your monthly analytics report is ready for download.",
      time: "3 hours ago",
      read: true,
      priority: "normal"
    },
    {
      id: 4,
      type: "error",
      title: "Failed login attempts detected",
      message: "Multiple failed login attempts detected from IP 192.168.1.100.",
      time: "6 hours ago",
      read: false,
      priority: "critical"
    },
    {
      id: 5,
      type: "success",
      title: "Backup completed successfully",
      message: "Daily backup completed at 3:00 AM. All data secured.",
      time: "12 hours ago",
      read: true,
      priority: "normal"
    },
    {
      id: 6,
      type: "info",
      title: "New feature available",
      message: "Check out the new analytics dashboard with enhanced reporting features.",
      time: "1 day ago",
      read: false,
      priority: "low"
    },
    {
      id: 7,
      type: "warning",
      title: "Storage space warning",
      message: "Your storage is 85% full. Consider upgrading your plan.",
      time: "2 days ago",
      read: true,
      priority: "high"
    },
    {
      id: 8,
      type: "success",
      title: "Payment processed",
      message: "Your monthly subscription payment has been processed successfully.",
      time: "3 days ago",
      read: true,
      priority: "normal"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const addNotification = (newNotification: Omit<Notification, 'id'>) => {
    const id = Math.max(...notifications.map(n => n.id), 0) + 1;
    setNotifications(prev => [{ ...newNotification, id }, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      addNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
