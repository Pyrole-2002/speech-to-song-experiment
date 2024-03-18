import Link from "next/link";
import ParticipantDataContext from "./context/ParticipantDataContext";

export default function Home() {
	return (
		<main>
			<h1>
				Welcome to Speech to Song Experiment (Change this later)
			</h1>
			<Link href="/login">Login</Link>
		</main>
	);
}
