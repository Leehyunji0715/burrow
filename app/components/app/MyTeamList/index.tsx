import { Accordion } from 'radix-ui';
import type { ReactNode, Ref } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { NavLink } from 'react-router';
import { Team } from '~/model/team';

import { Separator } from '~/components/';

import { ListContainer } from '../ListContainer';
import { TeamAvatar } from '../TeamAvatar';
import * as styles from './style.css';

export const MyTeamList = () => {
  return (
    <ListContainer>
      <ListContainer.Header>팀</ListContainer.Header>
      <Separator />
      <Accordion.Root type='multiple' className={styles.accordionRoot}>
        {myTeams.map((team) => (
          <Accordion.Item key={team.id} className={styles.accordionItem} value={team.id}>
            <AccordionTrigger name={team.name}>
              <span title={team.name} className={styles.teamNameSpan}>
                {team.name}
              </span>
            </AccordionTrigger>
            <NavLink
              to={`${team.id}/dashboard`}
              className={({ isActive }) => (isActive ? styles.activeNavLinkContent : '')}
            >
              <AccordionContent>Dashboard</AccordionContent>
            </NavLink>
            <NavLink
              to={`${team.id}/files`}
              className={({ isActive }) => (isActive ? styles.activeNavLinkContent : '')}
            >
              <AccordionContent>Files</AccordionContent>
            </NavLink>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </ListContainer>
  );
};

// React 19 부터 ref 를 일반 prop 으로 받는다 (forwardRef 불필요)
const AccordionTrigger = ({
  name,
  children,
  ref,
}: {
  name: string;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}) => (
  <Accordion.Header className={styles.accordionHeader}>
    <Accordion.Trigger className={styles.accordionTrigger} ref={ref}>
      <FaChevronRight className={styles.accorionChevron} aria-hidden />
      <TeamAvatar src='' fallback={name} />
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
);

const AccordionContent = ({
  children,
  ref,
}: {
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}) => (
  <Accordion.Content className={styles.accordionContent} ref={ref}>
    <div className={styles.accordionContentText}>{children}</div>
  </Accordion.Content>
);

const myTeams: Team[] = [
  { id: '1', name: 'Team1' },
  { id: '2', name: 'Team2' },
];
