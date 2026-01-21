import { cn } from "@/lib/utils";

export function Table({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<table className={cn("table-auto", className)} {...props}>
			{children}
		</table>
	);
}

export function TableBody({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<tbody className={cn(className)} {...props}>
			{children}
		</tbody>
	);
}

export function TableHeader({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<thead className={cn("text-left", className)} {...props}>
			{children}
		</thead>
	);
}

export function TableRow({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<tr className={cn(className)} {...props}>
			{children}
		</tr>
	);
}

export function TableCell({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<td className={cn("p-2", className)} {...props}>
			{children}
		</td>
	);
}

export function TableHead({
	children,
	className,
	...props
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<th className={cn("p-2", className)} {...props}>
			{children}
		</th>
	);
}
