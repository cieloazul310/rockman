import * as React from 'react';
import Container, { ContainerProps } from '@material-ui/core/Container';

type Props = {
  // tab state value
  value: number;
  // this tab's index
  index: number;
  children: React.ReactNode;
  visible?: boolean;
} & ContainerProps;

function TabPane({ index, value, children, ...props }: Props) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index && value !== index + 1 && value !== index - 1}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      <Container {...props}>
        <div>{value === index || value === index - 1 || value === index + 1 ? children : null}</div>
      </Container>
    </div>
  );
}

export default TabPane;
