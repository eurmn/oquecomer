export type Place = {
  id: number;
  name: string;
  expensive: boolean;
  junk: boolean;
};

export let Places: Place[] = [
  {
    id: 0,
    name: 'Burguer King',
    expensive: false,
    junk: true,
  },
  {
    id: 1,
    name: "Mc Donald's",
    expensive: false,
    junk: true,
  },
  {
    id: 2,
    name: 'China in Box',
    expensive: true,
    junk: false,
  },
  {
    id: 3,
    name: 'Spolleto',
    expensive: false,
    junk: false,
  },
  {
    id: 4,
    name: "Habbib's",
    expensive: false,
    junk: true,
  },
  {
    id: 5,
    name: 'Pizza',
    expensive: true,
    junk: true,
  },
  {
    id: 6,
    name: 'Mexicano',
    expensive: false,
    junk: false,
  },
  {
    id: 7,
    name: 'Sushi',
    expensive: true,
    junk: false,
  },
  {
    id: 8,
    name: 'Subway',
    expensive: false,
    junk: false,
  },
].sort((a, b) => (a.name > b.name ? 1 : -1));
