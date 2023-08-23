import { Card, Title, DonutChart } from "@tremor/react";

interface PieProps {
  name: string;
  count: number;
}

const valueFormatter = (number: number) => `Số lượng ${number.toString()}`;

const PieChart = ({ data }: { data: PieProps[] }) => (
  <Card className="max-w-lg">
    <Title>Số lượng sản phẩm bán trong ngày</Title>
    <DonutChart
      className="mt-6"
      data={data}
      category="count"
      index="name"
      valueFormatter={valueFormatter}
      colors={[
        "slate",
        "violet",
        "indigo",
        "rose",
        "cyan",
        "amber",
        "emerald",
        "lime",
      ]}
    />
  </Card>
);

export default PieChart;
