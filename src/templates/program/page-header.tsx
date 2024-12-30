import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppLinkButton, Jumbotron } from "@cieloazul310/gatsby-theme-aoi";
import TextSpan from "@/components/text-span";
import type { Program } from "types";

function ProgramPageHeader({
  program,
}: {
  program: Pick<
    Program,
    "week" | "date" | "title" | "categories" | "image" | "subtitle"
  > & {
    playlist: unknown[];
  };
}) {
  return (
    <Jumbotron component="header" maxWidth="md">
      <Box
        display="flex"
        flexGrow={1}
        width={1}
        height={1}
        flexDirection="column"
        justifyContent="center"
      >
        <Stack spacing={2} alignItems={{ xs: "center", md: "start" }}>
          <Box>
            <Typography color="inherit">
              <TextSpan label={`第${program.week}回`} />
              <TextSpan label={program.date} />
              <TextSpan label={`全${program.playlist.length}曲`} />
            </Typography>
            <Typography
              fontWeight="bold"
              component="h1"
              lineHeight={1.2}
              fontSize={{
                xs: "h5.fontSize",
                sm: "h4.fontSize",
                md: "h3.fontSize",
              }}
            >
              {program.title}
            </Typography>
          </Box>
          {program.subtitle ? (
            <Typography>{program.subtitle}</Typography>
          ) : null}
          <Stack direction="row" spacing={1}>
            {program.categories.map((category) => (
              <AppLinkButton
                href="/categories/"
                state={{ category }}
                color="inherit"
                variant="outlined"
                size="small"
                key={category}
              >
                {category}
              </AppLinkButton>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Jumbotron>
  );
}

export default ProgramPageHeader;
