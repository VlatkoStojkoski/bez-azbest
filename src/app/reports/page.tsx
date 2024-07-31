import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import { MapView } from "@/components/map-view";
import { Button } from "@/components/ui/button";
import { getUsersReports } from "@/lib/api/reports";

export default async function ViewReportsPage({ searchParams }: {
	searchParams?: Record<string, string | string[] | undefined>;
}) {
	const currUser = await currentUser();
	if (!currUser) {
		return redirect('/sign-in');
	}

	const reportsRes = await getUsersReports(currUser.id);

	const selectedReportId = searchParams?.id as string | undefined;

	return (
		<>
			<MapView
				className="w-full h-full"
				reports={
					reportsRes.success === true ? reportsRes.data : []
				}
				selectedReportId={selectedReportId}
				deleteReportBtn
			/>
			<Button variant='secondary' className='fixed bottom-6 left-1/2 -translate-x-1/2 z-40 text-xl px-6 py-2 h-auto border-2 border-white' asChild>
				<Link href="/reports/new">
					Пријави
				</Link>
			</Button>
		</>
	);
}
