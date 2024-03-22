import type { Provider } from "@/utils/get-providers";
import imageUrl from "@/utils/image-url";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

interface WatchProviderProps {
	providers: Provider[];
	type: string;
}
export default function WatchProvider({ providers, type }: WatchProviderProps) {
	return (
		<Carousel className="lg:col-span-full col-span-full max-w-5xl mx-auto ">
			<h1 className="col-span-full text-3xl py-4 font-semibold">{type} on:</h1>

			<CarouselContent>
				{providers?.map((provider: Provider) => (
					<CarouselItem
						key={provider.provider_id}
						className="basis-1/2 lg:basis-1/6"
					>
						<h1>{provider.provider_name}</h1>
						<img
							src={imageUrl({
								path: provider.logo_path,
								type: "logo",
								size: "w500",
							})}
							alt={provider.provider_name}
							className="rounded-[40px]"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious variant={"ghost"} className="hidden lg:inline-flex " />
			<CarouselNext variant={"ghost"} className="hidden lg:inline-flex " />
		</Carousel>
	);
}
