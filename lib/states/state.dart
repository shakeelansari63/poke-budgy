import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:poke_budgy/states/active_budget.dart';
import 'package:poke_budgy/states/past_budgets.dart';
import 'package:poke_budgy/states/settings.dart';

class AppState extends ChangeNotifier {
  SettingsState settings;
  ActiveBudget activeBudget;
  PastBudgets pastBudgets;

  AppState({
    required this.settings,
    required this.activeBudget,
    required this.pastBudgets,
  });
}

final appState = ChangeNotifierProvider<AppState>((ref) {
  return AppState(
    settings: SettingsState(
      currency: "INR",
      theme: "dark",
      baseColor: Color(0xFF4F378B),
    ),
    activeBudget: ActiveBudget(budget: null),
    pastBudgets: PastBudgets(budgets: []),
  );
});
