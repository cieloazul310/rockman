import * as React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
}: ListItemLinkProps): JSX.Element {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

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

ListItemLink.defaultProps = {
  secondaryText: undefined,
  inset: false,
  avatar: undefined,
  secondaryAction: undefined,
  textClasses: undefined,
};

export default ListItemLink;
