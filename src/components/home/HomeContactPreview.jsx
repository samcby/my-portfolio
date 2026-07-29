import Link from "next/link";

const HomeContactPreview = () => {
  return (
    <section className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--surface-border)] bg-[var(--surface-bg)]">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#268bd2]">
            Research, internships, and collaboration
          </p>
          <h3 className="mt-3 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
            Have an interesting hardware problem?
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
            I am happy to discuss IC design, computer architecture, EDA,
            hardware acceleration, research opportunities, and engineering
            internships.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[#268bd2] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#2aa198] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2"
          >
            Send a message
          </Link>
          <a
            href="mailto:samchenbingyu@gmail.com"
            className="inline-flex items-center justify-center rounded-full border border-[var(--surface-border)] px-6 py-3 font-semibold text-[var(--text-primary)] transition-colors hover:border-[#2aa198] hover:text-[#2aa198] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2"
          >
            Email directly
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeContactPreview;
