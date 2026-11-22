/**
 * PagePlaceholder.jsx
 * ------------------------------------------------------------------
 * Temporary body for pages we have not built yet. It shows the page
 * title and the use cases (from the Module 04 use case diagram) that
 * the page will cover, so we can see the plan on screen.
 * Each placeholder is replaced by the real screen in a later step.
 * ------------------------------------------------------------------
 */
import { cafeTheme } from '../../constants/cafeTheme';

export default function PagePlaceholder({ title, description, useCases = [] }) {
  return (
    <section>
      <h1 className={cafeTheme.title}>{title}</h1>
      <p className={`${cafeTheme.muted} mt-1 max-w-prose`}>{description}</p>

      <div className={`${cafeTheme.card} mt-8 max-w-xl p-6`}>
        <h2 className="text-sm font-semibold text-white">This page will cover</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#a0a0a0]">
          {useCases.map((useCase) => (
            <li key={useCase}>{useCase}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
