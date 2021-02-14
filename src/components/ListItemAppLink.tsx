import * as React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText, { ListItemTextProps } from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppLink from 'gatsby-theme-aoi/src/components/AppLink';

type ListItemLinkProps<T = Record<string, unknown>> = Omit<ListItemProps, 'ref'> &
  Pick<MuiLinkProps, 'color'> & {
    to: string;
    primaryText: string;
    secondaryText?: string;
    inset?: boolean;
    avatar?: JSX.Element;
    secondaryAction?: JSX.Element;
    textClasses?: ListItemTextProps['classes'];
  } & Omit<GatsbyLinkProps<T>, 'ref' | 'button'>;

function ListItemLink({
  color = 'inherit',
  button = false,
  inset = false,
  to,
  primaryText,
  secondaryText,
  avatar,
  secondaryAction,
  textClasses,
  ...props
}: ListItemLinkProps) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  return isMobile || button ? (
    <ListItem component={GatsbyLink} to={to} button {...props}>
      {avatar ? <ListItemAvatar>{avatar}</ListItemAvatar> : null}
      <ListItemText classes={textClasses} primary={primaryText} secondary={secondaryText} inset={inset} />
      {secondaryAction ? <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction> : null}
    </ListItem>
  ) : (
    <ListItem {...props}>
      {avatar ? <ListItemAvatar>{avatar}</ListItemAvatar> : null}
      <ListItemText
        classes={textClasses}
        inset={inset}
        primary={
          <AppLink to={to} color={color}>
            {primaryText}
          </AppLink>
        }
        secondary={secondaryText || null}
      />
      {secondaryAction ? <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction> : null}
    </ListItem>
  );
}
export default ListItemLink;
