import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ExpenseCard = ({
  title,
  value
}: {
  title: string,
  value: string
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-purple-600">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₹ {value}</div>
      </CardContent>
    </Card>
  )
}

export default ExpenseCard