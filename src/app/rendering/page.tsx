import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  return (
    <main>
      <p>
        Next.js can support many times of rendering strategies to provide
        flexibility of delivering your content
      </p>
      <Table className="text-sm">
        <TableHeader>
          <TableRow className="before:bg-white/5 before:content-[''] before:absolute before:inset-0 before:rounded-md before:border before:border-white/10 relative">
            <TableHead>SSG</TableHead>
            <TableHead>SSR</TableHead>
            <TableHead>ISR</TableHead>
            <TableHead>PPR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          <TableRow>
            <TableCell>Build Time</TableCell>
            <TableCell>Yes</TableCell>
            <TableCell>No</TableCell>
            <TableCell>Partial</TableCell>
            <TableCell>No</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Data Fetching</TableCell>
            <TableCell>Static</TableCell>
            <TableCell>Server-side</TableCell>
            <TableCell>Incremental</TableCell>
            <TableCell>Client-side</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Request Time</TableCell>
            <TableCell>No</TableCell>
            <TableCell>Yes</TableCell>
            <TableCell>Yes (after initial build)</TableCell>
            <TableCell>Yes</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cookies/Headers</TableCell>
            <TableCell>No</TableCell>
            <TableCell>No</TableCell>
            <TableCell>Yes</TableCell>
            <TableCell>No</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Revalidation</TableCell>
            <TableCell>No</TableCell>
            <TableCell>No</TableCell>
            <TableCell>Yes</TableCell>
            <TableCell>No</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Use Cases</TableCell>
            <TableCell>Blog, Documentation</TableCell>
            <TableCell>Dynamic Content</TableCell>
            <TableCell>Frequently Updated Content</TableCell>
            <TableCell>Highly Interactive Pages</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
