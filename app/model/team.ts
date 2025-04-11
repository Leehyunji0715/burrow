export type Team = {
  id: string;
  name: string;
  image?: string;
};

export const sampleTeams: Team[] = [
  { id: '1', name: 'Team1' },
  { id: '2', name: 'Team2' },
];

export const sampleGetMyTeam = async (id: string) => {
  return await sampleTeams.find((team) => team.id === id);
};
