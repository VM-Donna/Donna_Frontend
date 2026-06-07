export default function HabitsPage() {
  return <Placeholder title="Habits" />;
}

function Placeholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-slate-600">Production surface placeholder.</p>
    </div>
  );
}
