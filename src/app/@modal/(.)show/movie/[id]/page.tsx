"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import MovieDetailModal from "@/components/MovieDetailModal";
import type { MovieResponse } from "@/types/response";

interface ModalProps {
  params: {
    id: string;
  };
}

export default function MovieModal({ params }: ModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [movie, setMovie] = useState<MovieResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // You'll need to implement this API call based on your existing pattern
        // For now, this is a placeholder
        const response = await fetch(`/api/movie/${params.id}`);
        if (response.ok) {
          const movieData = await response.json();
          setMovie(movieData);
        }
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [params.id]);

  const handleClose = () => {
    setOpen(false);
    router.back();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="p-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading...</p>
            </div>
          ) : movie ? (
            <MovieDetailModal movie={movie} />
          ) : (
            <p>Movie not found</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
