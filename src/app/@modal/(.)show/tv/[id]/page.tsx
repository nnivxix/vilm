"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface ModalProps {
  params: {
    id: string;
  };
}

export default function TvModal({ params }: ModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    router.back();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">TV Show Details</h2>
          {/* TV show details will be loaded here */}
          <p>Loading TV show with ID: {params.id}</p>
          {/* You can import and use your existing TV detail component here */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
