import type React from "react";
import type { RenderEditCellProps } from "react-data-grid";
import type { TranslationRow } from "../../../modules/versions";
import TranslationCellInput from "./TranslationCellInput";

type Props = RenderEditCellProps<TranslationRow>;

const autoFocusAndSelect = (input: HTMLInputElement | null): void => {
  input?.focus();
  input?.select();
};

// eslint-disable-next-line import/prefer-default-export
const renderTranslationEditCell = (language: string): React.FC<Props> =>
  function TranslationEditCell({ row, onRowChange, onClose }: Props) {
    return (
      <TranslationCellInput
        ref={autoFocusAndSelect}
        value={row.currentPhrase?.translations[language] ?? row.historyPhrase?.translations[language] ?? ""}
        onChange={(ev): void => {
          if (!row.currentPhrase) {
            return;
          }
          const translations = { ...row.currentPhrase.translations, [language]: ev.target.value };
          onRowChange({ ...row, currentPhrase: { ...row.currentPhrase, translations } });
        }}
        onBlur={(): void => onClose(true, false)}
      />
    );
  };

export default renderTranslationEditCell;
