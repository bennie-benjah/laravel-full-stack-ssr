// components/ui/toast.tsx
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'delete' | 'error' | 'warning' | 'info';
  onClose: () => void;
  className?: string;
  duration?: number;
}

export function Toast({
  message,
  type = 'success',
  onClose,
  className = '',
  duration = 5000
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-green-500 text-white',
    delete: 'bg-red-500 text-white', // Red background for delete notifications
    error: 'bg-red-600 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white',
  };

  const icons = {
    success: '✅',
    delete: '🗑️', // Trash icon for delete
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div className={`flex items-center p-4 rounded-md shadow-lg ${typeStyles[type]} ${className}`}>
      <span className="mr-2">{icons[type]}</span>
      <span className="flex-grow">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}
