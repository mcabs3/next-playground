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
          Welcome, this project is a collection of Next.js concepts and examples
        </p>
      </TitledSection>
    </main>
  );
}
