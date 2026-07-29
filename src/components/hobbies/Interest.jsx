import Image from "next/image";
import HOBBIES from "@/data/hobbiesData";

const Interest = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 grid gap-6 rounded-[2rem] border border-[var(--surface-border)] bg-[var(--surface-bg)] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#268bd2]">
            Beyond circuits
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
            The interests that keep me curious.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
            Engineering is a large part of my life, but creative work, travel,
            games, movies, and community involvement shape how I observe and
            solve problems.
          </p>
        </div>
        <p className="text-sm font-medium text-[var(--text-secondary)]">
          Los Angeles, California
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {HOBBIES.map((hobby) => (
          <article
            key={hobby.id}
            className={`group overflow-hidden rounded-[1.75rem] border border-[var(--surface-border)] bg-[var(--surface-bg)] shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg ${
              hobby.featured ? "sm:col-span-2 lg:col-span-2" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden ${
                hobby.featured ? "aspect-[16/8]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={hobby.image}
                alt={hobby.imageAlt}
                fill
                sizes={
                  hobby.featured
                    ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                {hobby.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {hobby.description}
              </p>
              {hobby.links ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {hobby.links.map((link) =>
                    link.href ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-[#268bd2] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#2aa198] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span
                        key={link.label}
                        className="rounded-full border border-[var(--surface-border)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
                      >
                        {link.label}
                      </span>
                    )
                  )}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Interest;
