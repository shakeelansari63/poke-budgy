import 'package:flutter/material.dart';

class SettingsState extends ChangeNotifier {
  String currency;
  String theme;
  Color baseColor;

  SettingsState({
    required this.currency,
    required this.theme,
    required this.baseColor,
  });

  void setCurrency(String currency) {
    this.currency = currency;
    notifyListeners();
  }

  void setThemey(String theme) {
    this.theme = theme;
    notifyListeners();
  }

  void setBaseColor(Color baseColor) {
    this.baseColor = baseColor;
    notifyListeners();
  }
}
