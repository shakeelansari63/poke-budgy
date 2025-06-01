class Income {
  String id;
  DateTime incomeDate;
  String source;
  double amount;

  Income({
    required this.id,
    required this.incomeDate,
    required this.amount,
    required this.source,
  });
}

class Expense {
  String id;
  DateTime expenseDate;
  String expenseFor;
  double amount;

  Expense({
    required this.id,
    required this.expenseDate,
    required this.amount,
    required this.expenseFor,
  });
}

class ExpenseCategory {
  String id;
  String category;
  double amount;
  List<Expense> expenses;

  ExpenseCategory({
    required this.id,
    required this.category,
    required this.amount,
    required this.expenses,
  });
}

class Budget {
  String id;
  DateTime startDate;
  DateTime endDate;
  List<Income> incomes;
  List<ExpenseCategory> expenseCategories;

  Budget({
    required this.id,
    required this.startDate,
    required this.endDate,
    required this.incomes,
    required this.expenseCategories,
  });
}
