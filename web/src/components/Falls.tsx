/** Four squares for the four runs of a situation: ember where the robot fell, acid where it held.
 *  No rate yet: empty squares (pulsing while that situation is running). */
export default function Falls({ rate, runs = 4, active = false, dim = false }: { rate?: number; runs?: number; active?: boolean; dim?: boolean }) {
  const fell = rate === undefined ? -1 : Math.round(rate * runs);
  return (
    <span className={`flex w-[52px] gap-1 ${active ? "blink" : ""} ${dim ? "opacity-40" : ""}`}
      title={rate === undefined ? undefined : `fell in ${fell} of ${runs} runs`}>
      {Array.from({ length: runs }, (_, i) => (
        <i key={i} style={{ animationDelay: `${i * 60}ms` }}
          className={`block size-2.5 ${fell < 0 ? "border border-white/15" : `rise ${i < fell ? "bg-ember" : "bg-acid"}`}`} />
      ))}
    </span>
  );
}
