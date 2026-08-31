import ExpenseTable from "@/components/expenses/expense-table";
import ExpensesPageHeader from "@/components/expenses/expenses-page-header";
import ExpenseStats from "@/components/expenses/expenses-stats";

const Expenses = () => {
  return (
    <main className="space-y-8">
      <ExpensesPageHeader />
      <ExpenseStats />
      <ExpenseTable />
    </main>
  );
};

export default Expenses;
