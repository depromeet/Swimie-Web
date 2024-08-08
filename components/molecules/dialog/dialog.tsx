import { Button, Dim } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex, grid } from '@/styled-system/patterns';

type Button = {
  text: string;
  onClick: () => void;
};
export type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  buttons?: {
    confirm?: Button;
    cancel?: Button;
  };
  isDim?: boolean;
};

export const Dialog = ({
  isOpen,
  onClose,
  title,
  description,
  buttons = {},
  isDim = true,
}: DialogProps) => {
  if (!isOpen) return null;
  return (
    <>
      <div className={containerStyle}>
        <div className={contentStyle}>
          <div className={content.textStyle}>
            <h1 className={text.titleStyle}>{title}</h1>
            {description && (
              <p className={text.descriptionStyle}>{description}</p>
            )}
          </div>

          {Boolean(Object.keys(buttons).length) && (
            <div className={content.buttonStyle}>
              {buttons.cancel && (
                <Button
                  onClick={buttons.cancel.onClick}
                  label={buttons.cancel.text}
                  size="large"
                  buttonType="secondary"
                  variant="outlined"
                />
              )}
              {buttons.confirm && (
                <Button
                  onClick={buttons.confirm.onClick}
                  label={buttons.confirm.text}
                  size="large"
                />
              )}
            </div>
          )}
        </div>
      </div>
      {isOpen && isDim && <Dim onClick={onClose} />}
    </>
  );
};

const containerStyle = css({
  position: 'fixed',
  top: '50%',
  left: '50%',
  translate: 'auto',
  translateX: '-1/2',
  translateY: '-1/2',
  padding: '24px',
  zIndex: 1000,
  backgroundColor: 'white',
  borderRadius: '12px',
  w: '304px',
  // TEMP: 임시 효과
  animation: 'dimFadeIn 0.3s',
});

const contentStyle = flex({
  direction: 'column',
  gap: '24px',
});

const content = {
  textStyle: flex({
    direction: 'column',
    gap: '4px',
  }),

  buttonStyle: grid({
    gap: '12px',
    gridTemplateColumns: 2,
  }),
};

const text = {
  titleStyle: css({
    textStyle: 'heading4',
    fontWeight: 'bold',
    color: 'text.normal',
  }),

  descriptionStyle: css({
    textStyle: 'body2.normal',
    fontWeight: 'medium',
    color: 'text.alternative',
  }),
};
