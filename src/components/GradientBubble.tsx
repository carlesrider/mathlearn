export default function GradientBubble() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-candyPink/30 blur-3xl" />
      <div className="absolute right-10 top-32 h-64 w-64 rounded-full bg-skySplash/40 blur-3xl" />
      <div className="absolute -bottom-10 left-20 h-60 w-60 rounded-full bg-minty/50 blur-3xl" />
    </div>
  );
}
