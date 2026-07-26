import { useI18n } from "../../i18n/I18nContext";
import { forecastData, categoryData } from "../../lib/mock-data";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 12,
  fontSize: 12,
};

export default function AnalyticsPage() {
  const { t, locale } = useI18n();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("sidebar.analytics")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {locale === "pt"
            ? "Insights sobre seu dinheiro"
            : "Insights about your money"}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card-elevated p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold">
            {locale === "pt" ? "Receita vs Despesa" : "Income vs Expenses"}
          </h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastData}>
                <CartesianGrid
                  stroke="hsl(var(--border))"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="m"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  dataKey="income"
                  fill="hsl(var(--success))"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="expenses"
                  fill="hsl(var(--destructive))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated p-6">
          <h3 className="text-sm font-semibold">
            {locale === "pt" ? "Categorias" : "Category breakdown"}
          </h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {categoryData.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1.5 text-xs">
            {categoryData.map((c) => (
              <li key={c.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ background: c.color }}
                  />
                  {c.name}
                </span>
                <span className="text-muted-foreground">${c.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-elevated p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold">
            {locale === "pt" ? "Evolução mensal" : "Monthly evolution"}
          </h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="ana" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="hsl(var(--border))"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="m"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  dataKey="balance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                  fill="url(#ana)"
                  isAnimationActive
                  animationDuration={1400}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated p-6">
          <h3 className="text-sm font-semibold">
            {locale === "pt" ? "Poupança (%)" : "Savings rate (%)"}
          </h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={forecastData.map((d) => ({
                  ...d,
                  rate: Math.round(((d.income - d.expenses) / d.income) * 100),
                }))}
              >
                <CartesianGrid
                  stroke="hsl(var(--border))"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="m"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="hsl(var(--success))"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  isAnimationActive
                  animationDuration={1400}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
