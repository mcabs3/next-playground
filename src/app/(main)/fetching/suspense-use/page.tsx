import { RenderSupportList } from "@/app/_components/render-support";
import { Frame } from "@/components/frame";

export default function Page() {
	return (
		<main>
			<RenderSupportList ssr />
			<h2>Using Suspense and React.use</h2>

			<Frame src="/demos/fetching/suspense-use" />

			<p className="mt-8">
				Using the <code>React.use</code> hook in a client component allows the
				promise to be created and initiated (a.k.a prefetching), serialized on
				the server and then streamed to the client for consumption. Using{" "}
				<code>Suspense</code> allows the fallback UI to show until the inner
				child component finishes deserializing the promise and its response,
				swapping the fallback for the rendered UI.
			</p>
			<blockquote data-level="success">
				<span>Pros:</span>
				<ul className="list-disc pl-4">
					<li>
						This pattern allows for initiating the promises earlier in the
						render tree to allow a prefetching pattern.
					</li>
					<li>
						The same <code>&lt;DataComponent /&gt;</code> component for both of
						the promises since the fetching the data is decoupled from the
						component.
					</li>
				</ul>
			</blockquote>
		</main>
	);
}
