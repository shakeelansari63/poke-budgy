import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:poke_budgy/states/settings.dart';

class AppState extends ChangeNotifier {
  SettingsState settings;

  AppState({required this.settings});
}

final appState = ChangeNotifierProvider<AppState>((ref) {
  return AppState(
    settings: SettingsState(
      currency: "INR",
      theme: "dark",
      baseColor: Color(0xFF4F378B),
    ),
  );
});
