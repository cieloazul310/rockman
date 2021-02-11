import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ProgramItem from './ProgramItem';
import { useAllPrograms } from '../utils/graphql-hooks';

interface ProgramsByYearProps {
  year: number;
  programs: ReturnType<typeof useAllPrograms>;
}

function ProgramsByYear({ year, programs }: ProgramsByYearProps) {
  const initialOpen = typeof window === 'object' ? sessionStorage.getItem(`${year}open`) : null;
  const [open, setOpen] = React.useState<boolean>(initialOpen ? (JSON.parse(initialOpen) as boolean) : false);
  const _handleClick = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    if (window && typeof window === 'object') {
      sessionStorage.setItem(`${year}open`, JSON.stringify(open));
    }
  }, [year, open]);

  return (
    <>
      <ListItem button onClick={_handleClick}>
        <ListItemText primary={`${year}年`} />
        <Chip label={programs.length} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {programs.map((program, index) => (
            <ProgramItem key={program.id} program={program} />
          ))}
        </List>
      </Collapse>
    </>
  );
}

function Programs() {
  const programs = useAllPrograms();
  const years = React.useMemo(() => {
    const firstYear = 2018;
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - firstYear + 1 }, (_, i) => firstYear + i).map((year) => (
      <ProgramsByYear key={year} year={year} programs={programs.filter((program) => program.year === year)} />
    ));
  }, [programs]);

  return <List>{years}</List>;
}

export default Programs;
