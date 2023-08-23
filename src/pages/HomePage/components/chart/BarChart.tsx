import { Card, Title, BarChart } from "@tremor/react";

interface BarProps {
  name: string;
  Price: number;
}

const dataFormatter = (number: number) => {
  return "vnd " + Intl.NumberFormat("vn").format(number).toString();
};

const Bar = ({ data }: { data: BarProps[] }) => (
  <Card className="max-width">
    <Title>Tổng doanh thu theo sản phẩm</Title>
    <BarChart
      className="mt-6"
      data={data}
      index="name"
      categories={["Price"]}
      colors={["green"]}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
    />
  </Card>
);

export default Bar;
