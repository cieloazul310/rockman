import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemLink from '../components/ListItemLink';
import { Yaml, WeekMenuQuery } from '../../graphql-types';

interface WeeksByYearProps {
  year: number;
  weeks: Partial<Yaml>[];
}

function WeeksByYear({ year, weeks }: WeeksByYearProps) {
  const [open, setOpen] = React.useState(false);
  const _handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={_handleClick}>
        <ListItemText primary={`${year}年`} />
        <Badge badgeContent={weeks.length} color="secondary">
          {open ? <ExpandLess /> : <ExpandMore />}
        </Badge>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {weeks.map((week, index) => (
            <ListItemLink dense button key={week.id} to={week.fields.slug}>
              <ListItemText
                primary={`${week.week}. ${week.title}`}
                secondary={week.date}
              />
            </ListItemLink>
          ))}
        </List>
      </Collapse>
    </>
  );
}

function Weeks() {
  const data = useStaticQuery<WeekMenuQuery>(graphql`
    query WeekMenu {
      allYaml(sort: { fields: week, order: ASC }) {
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
  `).allYaml.edges;

  return (
    <List subheader={<ListSubheader>放送回</ListSubheader>}>
      <WeeksByYear
        year={2018}
        weeks={data.filter(d => d.node.year === 2018).map(d => d.node)}
      />
      <WeeksByYear
        year={2019}
        weeks={data.filter(d => d.node.year === 2019).map(d => d.node)}
      />
      <WeeksByYear
        year={2020}
        weeks={data.filter(d => d.node.year === 2020).map(d => d.node)}
      />
    </List>
  );
}

export default Weeks;
