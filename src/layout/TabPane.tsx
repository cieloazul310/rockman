import * as React from 'react';
import Container, { ContainerProps } from '@material-ui/core/Container';

type Props = {
  value: number;
  index: number;
  children: React.ReactNode;
  visible?: boolean;
} & ContainerProps;

function TabPane({ index, value, children, ...props }: Props) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`}>
      <Container {...props}>
        <div>{value === index ? children : null}</div>
      </Container>
    </div>
  );
}

export default TabPane;
