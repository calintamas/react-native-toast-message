/* eslint-env jest */

import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import colors from '../../colors';
import { icons } from '../../assets';
import Base from '../base';

describe('test Base component', () => {
  it('renders default Views', () => {
    const { queryByTestId } = render(<Base />);
    const rootView = queryByTestId('rootView');
    const leadingIcon = queryByTestId('leadingIcon');
    const trailingIcon = queryByTestId('trailingIcon');
    const text1 = queryByTestId('text1');
    const text2 = queryByTestId('text2');

    expect(rootView).toBeTruthy();
    expect(rootView).toHaveStyle({
      height: 60,
      width: '90%',
      borderLeftWidth: 5,
      borderLeftColor: colors.alto
    });
    expect(text1).toBeFalsy();
    expect(text2).toBeFalsy();
    expect(leadingIcon).toBeFalsy();
    expect(trailingIcon).toBeTruthy();
    expect(trailingIcon.children[0].props.source).toBe(icons.close);
  });

  it('renders custom leadingIcon and trailingIcon', () => {
    const mockIcon = { uri: 'iconSource' };

    const { queryByTestId } = render(
      <Base leadingIcon={mockIcon} trailingIcon={mockIcon} />
    );
    const leadingIcon = queryByTestId('leadingIcon');
    const trailingIcon = queryByTestId('trailingIcon');

    expect(leadingIcon.children[0].props.source).toBe(mockIcon);
    expect(trailingIcon.children[0].props.source).toBe(mockIcon);
  });

  it('renders text1 and text2', () => {
    const t1 = 'foo';
    const t2 = 'bar';
    const { queryByTestId } = render(<Base text1={t1} text2={t2} />);
    const text1 = queryByTestId('text1');
    const text2 = queryByTestId('text2');

    expect(text1.children[0]).toBe(t1);
    expect(text2.children[0]).toBe(t2);
  });

  it('fires onPress', () => {
    const onPress = jest.fn();
    const { queryByTestId } = render(<Base onPress={onPress} />);
    const rootView = queryByTestId('rootView');

    fireEvent.press(rootView);

    expect(onPress).toHaveBeenCalled();
  });

  it('fires onLeadingIconPress and onTrailingIconPress', () => {
    const onLeadingIconPress = jest.fn();
    const onTrailingIconPress = jest.fn();
    const mockIcon = { uri: 'mock' };

    const { queryByTestId } = render(
      <Base
        leadingIcon={mockIcon}
        trailingIcon={mockIcon}
        onLeadingIconPress={onLeadingIconPress}
        onTrailingIconPress={onTrailingIconPress}
      />
    );
    const leadingIcon = queryByTestId('leadingIcon');
    const trailingIcon = queryByTestId('trailingIcon');

    fireEvent.press(leadingIcon);
    expect(onLeadingIconPress).toHaveBeenCalledTimes(1);
    expect(onTrailingIconPress).toHaveBeenCalledTimes(0);

    fireEvent.press(trailingIcon);
    expect(onLeadingIconPress).toHaveBeenCalledTimes(1);
    expect(onTrailingIconPress).toHaveBeenCalledTimes(1);
  });

  it('sets custom style on root View', () => {
    const mockStyle = {
      height: 20
    };
    const { queryByTestId } = render(<Base style={mockStyle} />);
    const rootView = queryByTestId('rootView');

    expect(rootView).toHaveStyle(mockStyle);
  });

  it('sets custom style on leading icon container', () => {
    const mockStyle = {
      width: 40
    };
    const { queryByTestId } = render(
      <Base
        leadingIcon={{ uri: 'mock' }}
        leadingIconContainerStyle={mockStyle}
      />
    );
    const leadingIcon = queryByTestId('leadingIcon');

    expect(leadingIcon).toHaveStyle(mockStyle);
  });

  it('sets custom style on trailing icon container', () => {
    const mockStyle = {
      width: 40
    };
    const { queryByTestId } = render(
      <Base trailingIconContainerStyle={mockStyle} />
    );
    const trailingIcon = queryByTestId('trailingIcon');

    expect(trailingIcon).toHaveStyle(mockStyle);
  });

  it('sets custom style on leading icon', () => {
    const mockStyle = {
      width: 25,
      height: 25
    };
    const { queryByTestId } = render(
      <Base leadingIcon={{ uri: 'mock' }} leadingIconStyle={mockStyle} />
    );
    const leadingIcon = queryByTestId('leadingIcon');

    expect(leadingIcon.children[0]).toHaveStyle(mockStyle);
  });

  it('sets custom style on trailing icon', () => {
    const mockStyle = {
      width: 25,
      height: 25
    };
    const { queryByTestId } = render(
      <Base trailingIcon={{ uri: 'mock' }} trailingIconStyle={mockStyle} />
    );
    const trailingIcon = queryByTestId('trailingIcon');

    expect(trailingIcon.children[0]).toHaveStyle(mockStyle);
  });

  it('has default content container style', () => {
    const { queryByTestId } = render(<Base />);
    const contentContainer = queryByTestId('contentContainer');

    expect(contentContainer).toHaveStyle({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start'
    });
  });

  it('sets custom content container style', () => {
    const mockStyle = {
      backgroundColor: 'tomato'
    };
    const { queryByTestId } = render(
      <Base contentContainerStyle={mockStyle} />
    );
    const contentContainer = queryByTestId('contentContainer');

    expect(contentContainer).toHaveStyle(mockStyle);
  });

  it('sets custom text1 and text2 style', () => {
    const mockStyle1 = {
      fontSize: 10
    };
    const mockStyle2 = {
      fontSize: 8
    };
    const { queryByTestId } = render(
      <Base
        text1='Foo'
        text2='Bar'
        text1Style={mockStyle1}
        text2Style={mockStyle2}
      />
    );
    const text1 = queryByTestId('text1');
    const text2 = queryByTestId('text2');

    expect(text1).toHaveStyle(mockStyle1);
    expect(text2).toHaveStyle(mockStyle2);
  });

  it('renders default number of lines', () => {
    const { queryByTestId } = render(<Base text1='Foo' text2='Bar' />);
    const text1 = queryByTestId('text1');
    const text2 = queryByTestId('text2');

    expect(text1.props.numberOfLines).toBe(1);
    expect(text2.props.numberOfLines).toBe(2);
  });

  it('sets custom number of lines', () => {
    const { queryByTestId } = render(
      <Base
        text1='Foo'
        text2='Bar'
        text1NumberOfLines={2}
        text2NumberOfLines={3}
      />
    );
    const text1 = queryByTestId('text1');
    const text2 = queryByTestId('text2');

    expect(text1.props.numberOfLines).toBe(2);
    expect(text2.props.numberOfLines).toBe(3);
  });
});
