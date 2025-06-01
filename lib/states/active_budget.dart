import 'package:flutter/material.dart';
import 'package:nanoid/nanoid.dart';
import 'package:poke_budgy/models/budgets.dart';
import 'package:collection/collection.dart';

class ActiveBudget extends ChangeNotifier {
  Budget? budget;

  ActiveBudget({required this.budget});

  void addIncome(Income income) {
    income.id = nanoid();
    budget?.incomes.add(income);
    notifyListeners();
  }

  void addExpenseCategory(ExpenseCategory expenseCategory) {
    expenseCategory.id = nanoid();
    budget?.expenseCategories.add(expenseCategory);
    notifyListeners();
  }

  void addExpense(String categoryId, Expense expense) {
    ExpenseCategory? expenseCategory = budget?.expenseCategories
        .firstWhereOrNull((cat) => cat.id == categoryId);

    expense.id = nanoid();
    expenseCategory?.expenses.add(expense);
    notifyListeners();
  }

  void updateIncome(Income income) {
    Income? incomeToUpdate = budget?.incomes.firstWhereOrNull(
      (inc) => inc.id == income.id,
    );

    incomeToUpdate?.amount = income.amount;
    incomeToUpdate?.incomeDate = income.incomeDate;
    incomeToUpdate?.source = income.source;
    notifyListeners();
  }

  void updateExpenseCategory(ExpenseCategory expenseCategory) {
    ExpenseCategory? ecToUpdate = budget?.expenseCategories.firstWhereOrNull(
      (ec) => ec.id == expenseCategory.id,
    );

    ecToUpdate?.amount = expenseCategory.amount;
    ecToUpdate?.category = expenseCategory.category;
    notifyListeners();
  }

  void updateExpense(String categoryId, Expense expense) {
    ExpenseCategory? expenseCategory = budget?.expenseCategories
        .firstWhereOrNull((cat) => cat.id == categoryId);

    Expense? expToUpdate = expenseCategory?.expenses.firstWhereOrNull(
      (exp) => exp.id == expense.id,
    );

    expToUpdate?.expenseFor = expense.expenseFor;
    expToUpdate?.amount = expense.amount;
    expToUpdate?.expenseDate = expense.expenseDate;
    notifyListeners();
  }

  void deleteIncome(String incomeId) {
    Income? incomeToDelete = budget?.incomes.firstWhereOrNull(
      (inc) => inc.id == incomeId,
    );

    if (incomeToDelete != null) {
      budget?.incomes.remove(incomeToDelete);
      notifyListeners();
    }
  }

  void deleteExpenseCategory(String expenseCategoryId) {
    ExpenseCategory? expenseCategoryToDelete = budget?.expenseCategories
        .firstWhereOrNull((ec) => ec.id == expenseCategoryId);

    if (expenseCategoryToDelete != null) {
      budget?.expenseCategories.remove(expenseCategoryToDelete);
      notifyListeners();
    }
  }

  void deleteExpense(String categoryId, String expenseId) {
    ExpenseCategory? expenseCategory = budget?.expenseCategories
        .firstWhereOrNull((cat) => cat.id == categoryId);

    Expense? expToDelete = expenseCategory?.expenses.firstWhereOrNull(
      (exp) => exp.id == expenseId,
    );

    if (expToDelete != null) {
      expenseCategory?.expenses.remove(expToDelete);
      notifyListeners();
    }
  }
}
