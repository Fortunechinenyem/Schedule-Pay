const features = [
  {
    title: "Recurring Magic",
    desc: "Set it once, forget forever. Automates like cron jobs.",
    icon: "🔄",
  },
  {
    title: "Contractor Hub",
    desc: "Track all payouts in one dashboard.",
    icon: "👷",
  },
  {
    title: "Bank-Grade Security",
    desc: "Encrypted with Firebase Auth + Firestore.",
    icon: "🔒",
  },
];

export default function FeatureGrid() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-cyan-400/50 transition"
          >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
