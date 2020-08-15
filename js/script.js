// Testing and Development Script for the Link Project.

let _1 = {
    name: 'Friday Fights Tournament',
    game: 'CS:GO',
    time: new Date(2020, 7, 14),
    more_info: `/tournaments?n=${this.game}`,
    cost: 'Free',
    platform: 'PC',
    prize_pool: 'Discord Nitro',
    id: 'cyw8e94yr87'
};

let _2 = {
    name: 'Highly-Competitive Pool',
    game: 'Valorant',
    time: new Date(2020, 7, 16, 18),
    more_info: `/tournaments?n=${this.game}`,
    cost: '$2/Per Person',
    platform: 'PC',
    prize_pool: '$200+',
    id: 'adw8e94rr87'
};

let _3 = {
    name: 'Less-Competitive Pool',
    game: 'Valorant',
    time: new Date(2020, 7, 18, 20),
    more_info: `/tournaments?n=${this.game}`,
    cost: '$1/Per Person',
    platform: 'PC',
    prize_pool: '$50+',
    id: 'ckeee94yr87'
};

let _4 = {
    name: 'Friday Fights Tournament',
    game: 'Rainbow Six Siege',
    time: new Date(2020, 7, 21, 17),
    more_info: `/tournaments?n=${this.game}`,
    cost: 'Free',
    platform: 'PC',
    prize_pool: 'Discord Nitro',
    id: 'ckw8e24em57'
};

let team = {
    name: 'The betrayors',
    member_count: 5,
    members: [{name: 'Edank', information: []}, {name: 'Edank', information: []}, {name: 'Edank', information: []}, {name: 'Edank', information: []}],
    wins: 2,
    tournaments: ['adw8e94rr87', 'cyw8e94yr87', 'ckw8e24em57']
}

createTournament(_1);
createTournament(_2);
createTournament(_3);
createTournament(_4);

tm().login();
tm('#tournaments').displayTournaments();
tm('#teams').displayTeams();
