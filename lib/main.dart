import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:poke_budgy/pages/home.dart';
import 'package:poke_budgy/states/state.dart';
import 'package:poke_budgy/theme/theme.dart';

void main() {
  runApp(ProviderScope(child: MyApp()));
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
      theme: generateTheme(
        theme: ref.watch(appState).settings.theme,
        color: ref.watch(appState).settings.baseColor,
      ),
      debugShowCheckedModeBanner: false,
      home: HomePage(),
    );
  }
}
