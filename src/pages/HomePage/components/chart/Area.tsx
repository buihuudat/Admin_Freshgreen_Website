import { Card, Title, AreaChart } from "@tremor/react";

const dataFormatter = (number: number) => {
  return "vnd " + Intl.NumberFormat("vn").format(number).toString();
};

interface AreaProps {
  date: string;
  Access: number | false;
  Done: number | false;
  Refure: number | false;
}

interface SpendProps {
  name: string;
  value: number;
}

const Area = ({ data, spend }: { data: AreaProps[]; spend: SpendProps }) => {
  return (
    <Card>
      <Title>
        Thống kê {spend.name} {spend.value}
      </Title>
      <AreaChart
        className="h-72 mt-4"
        data={data}
        index="date"
        categories={["Done", "Access", "Refure"]}
        colors={["green", "blue", "red"]}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
};

export default Area;
