import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useAllPrograms } from '../utils/graphql-hooks';
import { QueriedProgram } from '../types';

interface ProgramsByYearProps {
  year: number;
  programs: QueriedProgram[];
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
          {programs.map(program => (
            <ListItem
              dense
              button
              key={program.id}
              to={program.fields.slug}
              component={GatsbyLink}
            >
              <ListItemText
                primary={`${program.week}. ${program.title}`}
                secondary={program.date}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}

function Programs() {
  const programs = useAllPrograms();
  const years = React.useMemo(() => {
    return [2018, 2019, 2020].map(year => (
      <ProgramsByYear
        key={year}
        year={year}
        programs={programs.filter(program => program.year === year)}
      />
    ));
  }, [programs]);

  return <List>{years}</List>;
}

export default Programs;
