import styled from "@emotion/styled";

const TranslationCellInput = styled.input`
  appearance: none;

  box-sizing: border-box;
  inline-size: 100%;
  block-size: 100%;
  padding-block: 0;
  padding-inline: 6px;
  border: 2px solid var(--spectrum-textfield-border-color-key-focus, var(--spectrum-alias-border-color-focus));
  vertical-align: top;
  color: var(--spectrum-body-text-color);
  background-color: var(--rdg-background-color);

  font-family: inherit;
  font-size: var(--rdg-font-size);

  &:focus {
    border-color: var(--spectrum-textfield-border-color-key-focus);
    outline: none;
  }
`;

export default TranslationCellInput;
