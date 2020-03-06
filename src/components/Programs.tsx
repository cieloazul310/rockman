import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemLink from './ListItemLink';
import { Program, ProgramsMenuQuery } from '../../graphql-types';

interface ProgramsByYearProps {
  year: number;
  programs: Pick<Program, 'id' | 'fields' | 'week' | 'title' | 'date'>[];
}

function ProgramsByYear({ year, programs }: ProgramsByYearProps) {
  const [open, setOpen] = React.useState(false);
  const _handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={_handleClick}>
        <ListItemText primary={`${year}年`} />
        <Chip label={programs.length} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {programs.map((program) => (
            <ListItemLink
              dense
              button
              key={program.id}
              to={program.fields.slug}
            >
              <ListItemText
                primary={`${program.week}. ${program.title}`}
                secondary={program.date}
              />
            </ListItemLink>
          ))}
        </List>
      </Collapse>
    </>
  );
}

function Programs() {
  const data = useStaticQuery<ProgramsMenuQuery>(graphql`
    query ProgramsMenu {
      allProgram(sort: { fields: week, order: ASC }) {
        edges {
          node {
            id
            title
            week
            date(formatString: "YYYY-MM-DD")
            year
            fields {
              slug
            }
          }
        }
      }
    }
  `).allProgram.edges;

  return (
    <List subheader={<ListSubheader>放送回</ListSubheader>}>
      <ProgramsByYear
        year={2018}
        programs={data.filter(d => d.node.year === 2018).map(d => d.node)}
      />
      <ProgramsByYear
        year={2019}
        programs={data.filter(d => d.node.year === 2019).map(d => d.node)}
      />
      <ProgramsByYear
        year={2020}
        programs={data.filter(d => d.node.year === 2020).map(d => d.node)}
      />
    </List>
  );
}

export default Programs;
