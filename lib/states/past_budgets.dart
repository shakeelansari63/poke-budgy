import 'package:flutter/material.dart';
import 'package:poke_budgy/models/budgets.dart';
import 'package:collection/collection.dart';

class PastBudgets extends ChangeNotifier {
  List<Budget> budgets;

  PastBudgets({required this.budgets});

  void addBudget(Budget budget) {
    budgets.add(budget);
    notifyListeners();
  }

  void deleteBudget(String budgetId) {
    Budget? budgetToDelete = budgets.firstWhereOrNull(
      (bud) => bud.id == budgetId,
    );

    if (budgetToDelete != null) {
      budgets.remove(budgetToDelete);
      notifyListeners();
    }
  }
}
