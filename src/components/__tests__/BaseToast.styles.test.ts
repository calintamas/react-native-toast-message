/* eslint-env jest */

type BaseStyle = {
  boxShadow?: string;
  elevation?: number;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
};

const loadBaseStyle = (platform: 'ios' | 'web') => {
  jest.resetModules();
  jest.doMock('react-native', () => ({
    Platform: {
      select: (options: Record<string, unknown>) =>
        options[platform] ?? options.default
    },
    StyleSheet: {
      create: (styles: Record<string, unknown>) => styles
    }
  }));

  let baseStyle: BaseStyle | undefined;
  jest.isolateModules(() => {
    const module = jest.requireActual('../BaseToast.styles') as {
      styles: { base: BaseStyle };
    };
    baseStyle = module.styles.base;
  });
  return baseStyle as BaseStyle;
};

afterEach(() => {
  jest.dontMock('react-native');
  jest.resetModules();
});

it('uses boxShadow without deprecated shadow props on web', () => {
  const baseStyle = loadBaseStyle('web');

  expect(baseStyle).toMatchObject({
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.1)',
    elevation: 2
  });
  expect(baseStyle).not.toHaveProperty('shadowOffset');
  expect(baseStyle).not.toHaveProperty('shadowOpacity');
  expect(baseStyle).not.toHaveProperty('shadowRadius');
});

it('keeps native shadow props on iOS', () => {
  const baseStyle = loadBaseStyle('ios');

  expect(baseStyle).toMatchObject({
    elevation: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6
  });
  expect(baseStyle).not.toHaveProperty('boxShadow');
});
