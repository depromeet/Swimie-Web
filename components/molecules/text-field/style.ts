import { css } from '@/styled-system/css';

export const inputWrapperStyles = css({
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginTop: '2px',
});

export const inputStyles = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '4px 0px',
  borderBottom: '2px solid',
  marginBottom: '3px',
  outline: 'none',
  textStyle: 'heading3',
  fontWeight: '500',
  borderBottomColor: 'line.alternative',
};

export const absoluteStyles = css({
  position: 'absolute',
  right: 0,
  textStyle: 'heading4',
  fontWeight: '500',
});

export const subTextStyles = css({
  color: 'text.alternative',
  textStyle: 'label1.normal',
  fontWeight: '500',
});
