/** One square per random seed; filled where the robot fell. */
export default function Seeds({ seeds, color = "bg-ember", size = "size-3.5" }: { seeds: boolean[]; color?: string; size?: string }) {
  return (
    <div className="flex gap-1">
      {seeds.map((f, i) => (
        <i key={i} style={{ animationDelay: `${i * 70}ms` }}
          className={`rise block ${size} ${f ? color : "border border-white/15"}`} />
      ))}
    </div>
  );
}
