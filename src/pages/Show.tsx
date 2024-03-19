import { useParams } from "react-router-dom";

export default function Show() {
	const params = useParams();
	return (
		<div>
			<pre>{params.id}</pre>
		</div>
	);
}
