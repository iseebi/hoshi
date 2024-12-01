import styled from '@emotion/styled';

const TranslationCellFrame = styled.div<{ disabledColor?: boolean }>`
  color: ${({ disabledColor }): string =>
    disabledColor
      ? 'var(--app-disable-content-color)'
      : 'var(--spectrum-body-text-color,var(--spectrum-alias-text-color))'};
  padding: 0 6px 0 6px;
`;

export default TranslationCellFrame;
