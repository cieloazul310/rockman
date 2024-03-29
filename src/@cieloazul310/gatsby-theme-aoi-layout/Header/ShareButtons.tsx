import * as React from "react";
import Box from "@mui/material/Box";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useSocialShare } from "@cieloazul310/gatsby-theme-aoi";

type ShareButtonsProps = {
  className?: string;
  title?: string;
} & Partial<Pick<IconButtonProps, "color">>;

function ShareButtons({
  className,
  title,
  color = "default",
}: ShareButtonsProps) {
  const twitterUrl = useSocialShare("twitter", title);
  const fbUrl = useSocialShare("facebook");
  return (
    <Box className={className}>
      <Tooltip title="Twitterでシェア">
        <IconButton
          color={color}
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          size="large"
        >
          <TwitterIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Facebookでシェア">
        <IconButton
          color={color}
          href={fbUrl}
          target="_blank"
          rel="noopener noreferrer"
          size="large"
        >
          <FacebookIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

ShareButtons.defaultProps = {
  className: undefined,
  title: undefined,
};

export default ShareButtons;
