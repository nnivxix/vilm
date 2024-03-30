export default function PopupYoutubeTrailer({ video }: { video: string }) {
	return (
		<Dialog>
			<DialogTrigger className="px-2 py-2 w-auto col-span-2 lg:col-span-1 text-center rounded-md bg-red-700 cursor-pointer">
				Watch Trailer
			</DialogTrigger>
			<DialogContent className="bg-transparent p-0 border-none">
				<iframe
					width={610}
					height={365}
					className="w-full"
					src={`https://www.youtube.com/embed/${video}`}
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen={true}
				/>
			</DialogContent>
		</Dialog>
	);
}
