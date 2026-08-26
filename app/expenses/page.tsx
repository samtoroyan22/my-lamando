import ExpenseTable from "@/components/expenses/expense-table";
import ExpensesPageHeader from "@/components/expenses/expenses-page-header";
import ExpenseStats from "@/components/expenses/expenses-stats";

const Expenses = () => {
  return (
    <main className="space-y-8">
      <ExpensesPageHeader />

      <ExpenseTable />

      <ExpenseStats />
    </main>
  );
};

export default Expenses;
