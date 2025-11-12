import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <Dialog>
        <DialogContent>{id}</DialogContent>
      </Dialog>
    </div>
  );
}
