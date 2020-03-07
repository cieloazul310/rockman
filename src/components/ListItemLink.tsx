import * as React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';

type ListItemLinkProps<TState> = GatsbyLinkProps<TState> & ListItemProps;

function ListItemLink<TState>(props: ListItemLinkProps<TState>) {
  const { to, children } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, GatsbyLinkProps<TState>>((itemProps, ref) => (
        <GatsbyLink<TState> to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem component={renderLink} {...props}>
      {children}
    </ListItem>
  );
}

export default ListItemLink;
