import { Card } from "../components/ui/Card";

export function Dashboard() {
  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-sm text-gray-500">Saldo Atual</h2>
        <p className="text-2xl font-semibold text-primary-700">
          R$ 4.200,00
        </p>
      </Card>

      <Card>
        <h2 className="text-sm text-gray-500">Gastos do mês</h2>
        <p className="text-2xl font-semibold text-danger">
          R$ 1.800,00
        </p>
      </Card>

      <Card>
        <h2 className="text-sm text-gray-500">Sobra por dia</h2>
        <p className="text-2xl font-semibold text-success">
          R$ 140,00
        </p>
      </Card>
    </div>
  );
}