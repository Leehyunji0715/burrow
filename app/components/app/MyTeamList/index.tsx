import { NavLink } from '@remix-run/react';
import { Accordion } from 'radix-ui';
import { ForwardedRef, ReactNode, forwardRef } from 'react';
import { FaChevronRight } from 'react-icons/fa';
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

const AccordionTrigger = forwardRef(
  (
    { name, children }: { name: string; children: ReactNode },
    forwardedRef: ForwardedRef<HTMLButtonElement>
  ) => (
    <Accordion.Header className={styles.accordionHeader}>
      <Accordion.Trigger className={styles.accordionTrigger} ref={forwardedRef}>
        <FaChevronRight className={styles.accorionChevron} aria-hidden />
        <TeamAvatar src='' fallback={name} />
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = forwardRef(
  ({ children }: { children: ReactNode }, forwardedRef: ForwardedRef<HTMLDivElement>) => (
    <Accordion.Content className={styles.accordionContent} ref={forwardedRef}>
      <div className={styles.accordionContentText}>{children}</div>
    </Accordion.Content>
  )
);

const myTeams: Team[] = [
  { id: '1', name: 'Team1' },
  { id: '2', name: 'Team2' },
];
