import type { Genre } from '@/types/media'

interface GenresProps {
  genres: Genre[]
}

export default function Genres({ genres }: GenresProps) {
  return (
    <div className="lg:col-span-full col-span-full max-w-6xl mx-auto px-5 ">
      <h1 className="col-span-full text-3xl py-4 font-semibold">Genres :</h1>

      <div className="flex flex-wrap gap-2">
        {genres?.map((genre: Genre) => (
          <Badge key={genre.id} variant='secondary' className="cursor-pointer text-lg">
            {genre.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}
