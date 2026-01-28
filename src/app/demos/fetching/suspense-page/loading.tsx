import { LoadingSkeleton } from "@/app/_components/loading-skeleton";
import Main from "../../_components/main";

export default function Loading() {
	return (
		<Main>
			<LoadingSkeleton rows={8}>
				<h1 className="text-2xl">loading.tsx</h1>
				Using <code>loading.tsx</code>. No page content is displaying
			</LoadingSkeleton>
		</Main>
	);
}
