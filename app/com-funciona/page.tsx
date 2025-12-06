import { texts } from '@/src/constants/texts';
import GradientBubble from '@/src/components/GradientBubble';

export default function HowItWorksPage() {
  return (
    <div className="relative overflow-hidden">
      <GradientBubble />
      <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 pb-16 pt-8 sm:px-10">
        <div className="card p-6 sm:p-10">
          <h1 className="text-3xl font-extrabold text-sky-900 sm:text-4xl">{texts.howItWorks.title}</h1>
          <ol className="mt-6 space-y-3 text-lg text-gray-700">
            {texts.howItWorks.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-1 rounded-full bg-sunny px-3 py-1 font-bold text-gray-800">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
