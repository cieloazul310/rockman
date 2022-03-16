import * as React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

type TextSpanProps = {
  label?: React.ReactNode | null;
} & Exclude<TypographyProps, 'children'>;

function TextSpan({ label, variant, ...props }: TextSpanProps) {
  if (!label) return null;
  return (
    <Typography mr={0.5} display="inline-block" component="span" {...props} variant={variant ?? 'inherit'}>
      {label}
    </Typography>
  );
}

TextSpan.defaultProps = {
  label: undefined,
};

export default TextSpan;
