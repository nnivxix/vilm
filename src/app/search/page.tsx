import { SearchForm } from "@/components/SearchForm";
import { Suspense } from "react";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ searchParams }: Props) {
  const title = searchParams.title;
  const type = () => {
    const paramType = searchParams.type;

    if (paramType === "tv") return "Tv Shows";
    if (paramType === "movie") return "Movies";
    return "";
  };

  if (title) {
    return {
      title: `Vilm - Search ${type()} for "${title}" `,
    };
  }
  return {
    title: "Vilm - Search",
  };
}
export default async function Page() {
  return (
    <div className="max-w-6xl mx-auto mt-6 px-5">
      <Suspense>
        <SearchForm />
      </Suspense>
    </div>
  );
}
