import TitledSection from "./_components/titled-section";

export default function Home() {
  return (
    <main className="pt-20 pb-10 px-8">
      <h1>Next Concepts</h1>
      <blockquote>
        This page fetches no content and can be built as static
      </blockquote>
      <TitledSection title="app/page.tsx">
        <p>
          This is a Next.js demo application created to showcase common patterns
          with the features available in Next.js
        </p>
      </TitledSection>
    </main>
  );
}
