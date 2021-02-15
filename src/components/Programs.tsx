import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ProgramItem from './ProgramItem';
import { ProgramPageQuery } from '../../graphql-types';

type ProgramYearsGroup = Pick<ProgramPageQuery['allProgram']['group'][number], 'totalCount' | 'edges'> & {
  fieldValue: NonNullable<ProgramPageQuery['allProgram']['group'][number]['fieldValue']>;
};

function ProgramsByYear({ data }: { data: ProgramYearsGroup }) {
  const { fieldValue, totalCount, edges } = data;
  const initialOpen = typeof window === 'object' ? sessionStorage.getItem(`${fieldValue}open`) : null;
  const [open, setOpen] = React.useState<boolean>(initialOpen ? Boolean(JSON.parse(initialOpen)) : false);
  const _handleClick = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    if (window && typeof window === 'object') {
      sessionStorage.setItem(`${fieldValue}open`, JSON.stringify(open));
    }
  }, [fieldValue, open]);

  return (
    <>
      <ListItem button onClick={_handleClick}>
        <ListItemText primary={`${fieldValue}年`} />
        <Typography variant="button" component="span">
          {totalCount}回
        </Typography>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {edges.map(({ node }) => (
            <ProgramItem key={node.id} program={node} />
          ))}
        </List>
      </Collapse>
    </>
  );
}

interface Props {
  data: ProgramPageQuery['allProgram']['group'];
}

function Programs({ data }: Props) {
  const items = React.useMemo(() => data.filter((group): group is ProgramYearsGroup => Boolean(group.fieldValue)), [data]);

  return (
    <List>
      {items.map((group) => (
        <ProgramsByYear key={group.fieldValue} data={group} />
      ))}
    </List>
  );
}

export default Programs;
