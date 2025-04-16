import * as React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";

interface CustomAlertProps {
  message: string;
}

export default function CustomAlert({ message }: CustomAlertProps) {
  const [open, setOpen] = React.useState(true);

  if (!open) return null;

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        <X 
          className="h-4 w-4 cursor-pointer" 
          onClick={() => setOpen(false)}
        />
      </AlertDescription>
    </Alert>
  );
}