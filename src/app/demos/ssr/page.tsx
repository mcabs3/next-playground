import Main from "../_components/main";
import { RSC } from "../fetching/_components/rsc";

export default function Page() {
	return (
		<Main>
			Timestamp: {new Date().toISOString()}
			<RSC />
		</Main>
	);
}
