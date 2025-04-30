export function DataDisplay({ title, data }: { title?: string; data: any }) {
  return (
    <div>
      {!!title && <h3>{title}</h3>}
      <pre className="my-0">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
