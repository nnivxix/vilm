import type { ProviderInfo } from "@/types/providers";

interface WatchProviderProps {
	providers: ProviderInfo[];
	type: string;
}
export default function WatchProvider({ providers, type }: WatchProviderProps) {
	return (
		<div className="lg:col-span-full col-span-full max-w-6xl mx-auto px-5 ">
			<h1 className="col-span-full text-3xl py-4 font-semibold">{type} on:</h1>

			<div className="flex flex-wrap gap-2">
				{providers?.map((provider: ProviderInfo) => (
					<Badge key={provider.provider_id} className="cursor-pointer text-lg">
						{provider.provider_name}
					</Badge>
				))}
			</div>
		</div>
	);
}
