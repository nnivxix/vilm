import type { Genre } from '@/types/media'

interface GenresProps {
  genres: Genre[]
}

export default function Genres({ genres }: GenresProps) {
  return (
    <div className="flex flex-wrap gap-2 col-span-full">
      {genres.map((genre) => (
        <span
          key={genre.id}
          className="p-3 border-2 border-primary rounded-md hover:bg-white/20 cursor-pointer"
        >
          {genre.name}
        </span>
      ))}
    </div>
  )
}
