import { ForwardedRef, forwardRef, ReactNode } from "react";
import { Accordion } from "radix-ui";
import { Avatar } from "@radix-ui/themes";
import { FaChevronRight } from "react-icons/fa";
import { ListContainer } from '../ListContainer';
import { Separator } from '~/components/';
import * as styles from './style.css';

export const MyTeamList = () => {
    return (
        <ListContainer>
            <ListContainer.Header>팀</ListContainer.Header>
            <Separator/>
            <Accordion.Root type="multiple" className={styles.accordionRoot}>
                {myTeams.map(team => (
                    <Accordion.Item key={team.id} className={styles.accordionItem} value={team.id}>
                        <AccordionTrigger name={team.name}>{team.name}</AccordionTrigger>
                        <AccordionContent>Dashboard</AccordionContent>
                        <AccordionContent>Files</AccordionContent>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </ListContainer>
    );
};

const AccordionTrigger = forwardRef(
	({ name, children }: { name: string, children: ReactNode }, forwardedRef: ForwardedRef<HTMLButtonElement>) => (
		<Accordion.Header className={styles.accordionHeader}>
			<Accordion.Trigger
				className={styles.accordionTrigger}
				ref={forwardedRef}
			>
                <FaChevronRight className={styles.accorionChevron} aria-hidden/>
                <Avatar src='/app/assets/logo.svg' fallback={name} className={styles.accordionTriggerAvater}/>
				{children}
			</Accordion.Trigger>
		</Accordion.Header>
	),
);

const AccordionContent = forwardRef(
	({ children }: { children: ReactNode }, forwardedRef: ForwardedRef<HTMLDivElement>) => (
		<Accordion.Content
			className={styles.accordionContent}
			ref={forwardedRef}
		>
			<div className={styles.accordionContentText}>{children}</div>
		</Accordion.Content>
	),
);

const myTeams = [
    { id: '1', name: 'Team1' },
    { id: '2', name: 'Team2' }
];