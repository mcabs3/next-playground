import { Skeleton } from "@/components/ui/skeleton";
import Main from "./_components/main";

export default function Page() {
	return (
		<Main>
			{/* Page Header */}
			<div className="flex items-center justify-between">
				<div className="space-y-2">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-4 w-72" />
				</div>
				<Skeleton className="h-10 w-28 rounded-md" />
			</div>

			{/* Stats Cards */}
			<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{["stat-1", "stat-2", "stat-3", "stat-4"].map((id) => (
					<div key={id} className="rounded-lg border p-4">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="mt-2 h-8 w-24" />
						<Skeleton className="mt-2 h-3 w-16" />
					</div>
				))}
			</div>

			{/* Main Content Area */}
			<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
				{/* Left Column - Main Content */}
				<div className="space-y-6 lg:col-span-2">
					{/* Chart Card */}
					<div className="rounded-lg border p-6">
						<div className="flex items-center justify-between">
							<Skeleton className="h-5 w-32" />
							<Skeleton className="h-8 w-24 rounded-md" />
						</div>
						<Skeleton className="mt-6 h-48 w-full rounded" />
					</div>

					{/* Table Card */}
					<div className="rounded-lg border p-6">
						<Skeleton className="h-5 w-40" />
						<div className="mt-4 space-y-3">
							{/* Table Header */}
							<div className="flex gap-4 border-b pb-3">
								<Skeleton className="h-4 w-1/4" />
								<Skeleton className="h-4 w-1/4" />
								<Skeleton className="h-4 w-1/4" />
								<Skeleton className="h-4 w-1/4" />
							</div>
							{/* Table Rows */}
							{["row-1", "row-2", "row-3", "row-4", "row-5"].map((id) => (
								<div key={id} className="flex items-center gap-4 py-2">
									<div className="flex w-1/4 items-center gap-3">
										<Skeleton className="size-8 rounded-full" />
										<Skeleton className="h-4 w-20" />
									</div>
									<Skeleton className="h-4 w-1/4" />
									<Skeleton className="h-4 w-1/4" />
									<Skeleton className="h-6 w-16 rounded-full" />
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right Column - Sidebar */}
				<div className="space-y-6">
					{/* Activity Feed */}
					<div className="rounded-lg border p-6">
						<Skeleton className="h-5 w-28" />
						<div className="mt-4 space-y-4">
							{["activity-1", "activity-2", "activity-3", "activity-4"].map(
								(id) => (
									<div key={id} className="flex gap-3">
										<Skeleton className="size-10 shrink-0 rounded-full" />
										<div className="flex-1 space-y-2">
											<Skeleton className="h-4 w-full" />
											<Skeleton className="h-3 w-2/3" />
										</div>
									</div>
								),
							)}
						</div>
						<Skeleton className="mt-4 h-9 w-full rounded-md" />
					</div>

					{/* Quick Actions */}
					<div className="rounded-lg border p-6">
						<Skeleton className="h-5 w-32" />
						<div className="mt-4 space-y-2">
							{["action-1", "action-2", "action-3"].map((id) => (
								<Skeleton key={id} className="h-10 w-full rounded-md" />
							))}
						</div>
					</div>

					{/* Tags/Categories */}
					<div className="rounded-lg border p-6">
						<Skeleton className="h-5 w-24" />
						<div className="mt-4 flex flex-wrap gap-2">
							<Skeleton className="h-6 w-14 rounded-full" />
							<Skeleton className="h-6 w-20 rounded-full" />
							<Skeleton className="h-6 w-16 rounded-full" />
							<Skeleton className="h-6 w-12 rounded-full" />
							<Skeleton className="h-6 w-18 rounded-full" />
							<Skeleton className="h-6 w-14 rounded-full" />
							<Skeleton className="h-6 w-22 rounded-full" />
							<Skeleton className="h-6 w-16 rounded-full" />
						</div>
					</div>
				</div>
			</div>
		</Main>
	);
}
