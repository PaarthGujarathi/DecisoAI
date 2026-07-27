import {
  DollarSign,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";

const stats = [
  {
    title: "Revenue",
    value: "₹1.24M",
    icon: DollarSign,
    color: "text-emerald-600",
  },
  {
    title: "Growth",
    value: "+18.2%",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    title: "Customers",
    value: "4,872",
    icon: Users,
    color: "text-violet-600",
  },
  {
    title: "AI Insights",
    value: "128",
    icon: Activity,
    color: "text-orange-600",
  },
];

function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-2xl bg-slate-100 p-4 ${stat.color}`}>
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Placeholder Panels */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-semibold">
            Business Performance
          </h2>

          <div className="mt-8 flex h-80 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
            Charts will be added here using Apache ECharts
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">
            AI Recommendations
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-blue-50 p-4">
              Increase inventory for Product A
            </div>

            <div className="rounded-xl bg-emerald-50 p-4">
              Sales are projected to grow next month
            </div>

            <div className="rounded-xl bg-violet-50 p-4">
              Marketing ROI is improving steadily
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;