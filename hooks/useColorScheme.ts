import { useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme as _useColorScheme, Appearance } from 'react-native';

// This hook will return the system's color scheme (light/dark) and update it when the system changes.
export default function useColorScheme(): NonNullable<ColorSchemeName> {
  const [colorScheme, setColorScheme] = useState<NonNullable<ColorSchemeName>>(
    _useColorScheme() as NonNullable<ColorSchemeName>
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }: { colorScheme: ColorSchemeName }) => {
      setColorScheme(colorScheme as NonNullable<ColorSchemeName>);
    });

    return () => subscription.remove();
  }, []);

  return colorScheme;
}