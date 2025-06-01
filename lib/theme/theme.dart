import 'package:flutter/material.dart';

ThemeData generateTheme({required String theme, required Color color}) {
  return ThemeData(
    fontFamily: 'Poppins',
    colorScheme: ColorScheme.fromSeed(
      seedColor: color,
      brightness: theme == "dark" ? Brightness.dark : Brightness.light,
    ),
    brightness: theme == "dark" ? Brightness.dark : Brightness.light,
  );
}
