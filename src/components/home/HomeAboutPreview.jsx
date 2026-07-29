import Image from "next/image";
import Link from "next/link";

const focusAreas = [
  {
    label: "Current",
    title: "MNIST CNN NPU tape-out",
    detail: "RTL-to-GDS implementation and verification in a TSMC 180 nm flow.",
  },
  {
    label: "Architecture",
    title: "Processors and accelerators",
    detail: "Out-of-order CPUs, gem5 studies, cache policies, and near-data processing.",
  },
  {
    label: "Research",
    title: "EDA and intelligent hardware",
    detail: "Machine learning for circuit design, verification, and hardware acceleration.",
  },
];

const HomeAboutPreview = () => {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
      <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[2rem] border border-[var(--surface-border)] bg-[var(--surface-bg)] shadow-sm">
        <Image
          src="/images/selfies.jpg"
          alt="Sam Chen at UCLA"
          fill
          sizes="(max-width: 1024px) 384px, 34vw"
          className="object-cover"
        />
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#268bd2]">
          Engineer and researcher
        </p>
        <h3 className="mt-3 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
          Building efficient computing systems from circuits to architecture.
        </h3>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--text-secondary)]">
          I am an M.S. ECE student at UCLA focused on IC design, computer
          architecture, EDA, and hardware acceleration. My work connects
          implementation details with system-level performance, from tape-out
          flows and FPGA prototypes to gem5-based architecture research.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {focusAreas.map((area) => (
            <article
              key={area.title}
              className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-bg)] p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#268bd2]">
                {area.label}
              </p>
              <h4 className="mt-2 font-semibold text-[var(--text-primary)]">
                {area.title}
              </h4>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {area.detail}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="rounded-full bg-[#268bd2] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2aa198] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2"
          >
            Full background
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-[var(--surface-border)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[#2aa198] hover:text-[#2aa198] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2"
          >
            Explore my work
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutPreview;
