import * as React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';

interface ListItemLinkProps<TState> extends ListItemProps {
  to: string;
  state?: TState;
}

function ListItemLink<TState>(props: ListItemLinkProps<TState>) {
  const { to, children } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<GatsbyLinkProps<TState>, 'to'>>(
        (itemProps, ref) => <GatsbyLink to={to} ref={ref} {...itemProps} />
      ),
    [to]
  );

  return (
    <ListItem component={renderLink} {...props}>
      {children}
    </ListItem>
  );
}

export default ListItemLink;
