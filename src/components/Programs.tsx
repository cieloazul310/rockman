import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ProgramItem from './ProgramItem';
import type { ProgramListFragment } from '../../types';

type ProgramYearsGroup = {
  fieldValue: string;
  totalCount: number;
  nodes: ProgramListFragment[];
};

function ProgramsByYear({ data }: { data: ProgramYearsGroup }) {
  const { fieldValue, totalCount, nodes } = data;
  const initialOpen = typeof window === 'object' ? sessionStorage.getItem(`${fieldValue}open`) : null;
  const [open, setOpen] = React.useState<boolean>(initialOpen ? Boolean(JSON.parse(initialOpen)) : false);
  const handleClick = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    if (window && typeof window === 'object') {
      sessionStorage.setItem(`${fieldValue}open`, JSON.stringify(open));
    }
  }, [fieldValue, open]);

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={`${fieldValue}年`} />
        <Typography variant="button" component="span">
          {totalCount}回
        </Typography>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {nodes.map((node) => (
            <ProgramItem key={node.id} program={node} />
          ))}
        </List>
      </Collapse>
    </>
  );
}

type ProgramsProps = {
  data: ProgramYearsGroup[];
};

function Programs({ data }: ProgramsProps) {
  return (
    <List>
      {data.map((group) => (
        <ProgramsByYear key={group.fieldValue} data={group} />
      ))}
    </List>
  );
}

export default Programs;
