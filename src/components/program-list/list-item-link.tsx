/* eslint react/jsx-props-no-spreading: "warn" */
import * as React from "react";
import { Link as GatsbyLink, type GatsbyLinkProps } from "gatsby";
import ListItem, { type ListItemProps } from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import type { LinkProps as MuiLinkProps } from "@mui/material/Link";
import type { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppLink } from "@cieloazul310/gatsby-theme-aoi";

type ListItemLinkProps<T = Record<string, unknown>> = Omit<
  ListItemProps,
  "ref"
> &
  Pick<MuiLinkProps, "color"> & {
    to: string;
    primaryText: string;
    secondaryText?: string;
    button?: boolean;
    inset?: boolean;
    avatar?: JSX.Element;
    secondaryAction?: JSX.Element;
  } & Omit<GatsbyLinkProps<T>, "ref" | "button">;

function ListItemLink({
  color = "inherit",
  button = undefined,
  inset = false,
  to,
  primaryText,
  secondaryText,
  avatar,
  secondaryAction,
  ...props
}: ListItemLinkProps) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.only("xs"),
  );

  return isMobile || button ? (
    <ListItemButton component={GatsbyLink} to={to} {...props}>
      {avatar ? <ListItemAvatar>{avatar}</ListItemAvatar> : null}
      <ListItemText
        primary={primaryText}
        secondary={secondaryText}
        inset={inset}
        sx={{ pl: 2 }}
      />
      {secondaryAction ? (
        <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction>
      ) : null}
    </ListItemButton>
  ) : (
    <ListItem {...props}>
      {avatar ? <ListItemAvatar>{avatar}</ListItemAvatar> : null}
      <ListItemText
        inset={inset}
        primary={
          <AppLink href={to} color={color}>
            {primaryText}
          </AppLink>
        }
        secondary={secondaryText || null}
        sx={{ pl: 2 }}
      />
      {secondaryAction ? (
        <ListItemSecondaryAction>{secondaryAction}</ListItemSecondaryAction>
      ) : null}
    </ListItem>
  );
}

ListItemLink.defaultProps = {
  secondaryText: undefined,
  inset: false,
  avatar: undefined,
  secondaryAction: undefined,
  button: undefined,
};

export default ListItemLink;
