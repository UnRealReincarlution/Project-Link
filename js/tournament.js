/* 
 *    BEN WHITE 2020 © TOURNAMENT MANAGER (tm) FOR PROJECT LINK
 *              https://github.com/UnRealReincarlution
 */

let tournaments = [];
let teams = [];

class Tournament {
    constructor(...args) {
        this.teams = args[1];

        args = args[0];

        this.name = args.name;
        this.url = `https://challonge.com/${args.url}`;
        this.id = args.id;

        this.information = args;
    }

    logSelf() {
        console.log(this.information);
    }
}

class Team {
  constructor(...args) {
    this.name = args[0].name;
    this.information = args[0];
  }
}

class User {
    constructor(username = 'tbd', email = 'tbd', ...args) {
        this.username = username;
        this.email = email;
        this.information = args;
    }

    signup() {
        let user = {
            username: document.getElementById('signup_username').value,
            email: document.getElementById('signup_email').value,
            password: document.getElementById('signup_password').value
        }
    
        localStorage.setItem('jaw9jd09q28eadwa', JSON.stringify(user));
        window.location = '../index.html';

        this.username = user.username;
        this.email = user.email;
        this.information = user.password;
    
        console.log(user);
    }

    login() {
        if(localStorage.getItem('jaw9jd09q28eadwa') !== ""){
            // Login Information - Grab from Mongo or Firebase upon implementation.
            let login_token = JSON.parse(localStorage.getItem('jaw9jd09q28eadwa')); 
            console.log("Logging In");

            if(document.getElementById("home_page")){
                document.getElementById('welcome_message').innerHTML = `Welcome ${login_token.username}`;
                document.getElementById('welcome_sub').innerHTML = `Have a look around, signup for tournaments and have a good time!`;
                document.getElementById('signup_href_main').classList.add('hidden');
            }

            document.getElementById('user_logged_out').classList.add('hidden');
            document.getElementById('users_name').innerHTML = login_token.username;
        }else{
            document.getElementById('user_logged_in').classList.add('hidden');
            document.getElementById('welcome_message').innerHTML = `Welcome Challenger`;
        }
    }
}

const renderTournaments = (element_id) => {
    let return_value = document.createElement('div');

    tournaments.forEach((element, index) => {
        let refrence_date = new Date();

        if (refrence_date < element.time) {
            refrence_date.setDate(refrence_date.getDate() + 1);
        }

        let this_date = new Date(element.information.start_at)

        let msec = this_date - refrence_date;
        let hh =  Math.floor(msec / 1000 / 60 / 60);
        let unit = 'Hours';

        if(hh < 1) return;
        else if (hh == 1) unit = 'Hour'
        else if (hh > 48) {
            hh = Math.floor(hh / 24);
            unit = 'Days'
        }

        

        //console.log(element);

        let element_for_editing = document.createElement('div');
            element_for_editing.setAttribute('onclick', `maximiseWindow("${element.id}", ${index})`);
            //element_for_editing.addEventListener('click', element.more_info);
            element_for_editing.setAttribute('tournament-id', index);
            element_for_editing.classList.add('tournament');

        let textify = document.createElement('div');

        let title = document.createElement('h4');
            title.innerHTML = element.name;
            textify.append(title);

        let desc = document.createElement("p");
            desc.innerHTML = element.information.description;

            desc.style.textAlign = 'left';
            desc.style.margin = '0';

            desc.classList.add("tournament_desc");
            desc.style.textOverflow = 'elipsis';

            textify.append(desc);
             element_for_editing.append(textify);
        
        let game = document.createElement('h6');
            game.innerHTML = element.information.game_name;
            element_for_editing.append(game);
        
        let identification = document.createElement('h6');
            identification.innerHTML = element.information.id;
            element_for_editing.append(identification);

        let date = document.createElement('h5');
            date.innerHTML = `Starts in ${hh} ${unit}`;
            element_for_editing.append(date);

        let button = document.createElement('div');
            button.classList.add('animation_button');
            button.setAttribute('onclick', `openURL("${element.url}")`);

            let registered = document.createElement('button');
                registered.innerHTML = `Register`;
                button.append(registered);
            
            let register_anim = document.createElement('span');
                register_anim.classList.add('offset_button');
                button.append(register_anim);
            
            let registered_text = document.createElement('p');
                registered_text.innerHTML = "Register";
                registered_text.classList.add('offset_text');
                button.append(registered_text);

            element_for_editing.append(button);

        return_value.append(element_for_editing); 
    });

    return return_value;
}

const createTournament = (...tournamentArguments) => {
    tournaments.push(new Tournament(tournamentArguments[0], tournamentArguments[1]));

    localStorage.setItem("T_CACHE", JSON.stringify(tournaments));
}

const openURL = (url) => {
    window.open(url);
}

const renderTeams = () => {
  let return_value = document.createElement('div');

  //console.log(teams)

    teams.forEach((element, index) => {
        element = element.information;

        let refrence_date = new Date();

        if (refrence_date < element.time) {
            refrence_date.setDate(refrence_date.getDate() + 1);
        }

        let msec = element.time - refrence_date;
        let hh =  Math.floor(msec / 1000 / 60 / 60);
        let unit = 'Hours';

        if(hh < 1) return;
        else if (hh == 1) unit = 'Hour'
        else if (hh > 48) {
            hh = Math.floor(hh / 24);
            unit = 'Days'
        }

        //console.log(element);

        let element_for_editing = document.createElement('div');
            //element_for_editing.addEventListener('click', element.more_info);
            element_for_editing.classList.add('tournament');

        let title = document.createElement('h4');
            title.innerHTML = element.name;
            element_for_editing.append(title);
        
        let game = document.createElement('h6');
            game.innerHTML = `${element.member_count} / 5 Members`;
            element_for_editing.append(game);
        
        let fee = document.createElement('h6');
            fee.innerHTML = `${element.wins} Wins`;
            element_for_editing.append(fee);

        let applications = document.createElement('h5');
            applications.innerHTML = (element.member_count < 5) ? 'OPEN' : 'FULL';
            element_for_editing.append(applications);

        if(element.member_count < 5){
            let button = document.createElement('div');
                button.classList.add('animation_button');

                let registered = document.createElement('button');
                    registered.innerHTML = `Apply`;
                    button.append(registered);
                
                let register_anim = document.createElement('span');
                    register_anim.classList.add('offset_button');
                    button.append(register_anim);
                
                let registered_text = document.createElement('p');
                    registered_text.innerHTML = "Apply";
                    registered_text.classList.add('offset_text');
                    button.append(registered_text);

                element_for_editing.append(button);
        }

        return_value.append(element_for_editing); 
    });

    return return_value;
}

const createTeam = (...teamArguments) => {
  teams.push(new Team(teamArguments[0]));
}

const tm = (...args) => {
    if(typeof args[0] == 'string'){
        //console.log(`${args[0]}`);

        if(args[0].startsWith('#')){
            const renderingLoc = document.getElementById(`${args[0].substr(1, args[0].length - 1)}`);
            //console.log(renderingLoc);

            renderingLoc.displayTournaments = (...tournamentArgs) => {
                let new_element = renderTournaments();
                    
                renderingLoc.append(new_element);
            }

            renderingLoc.displayTeams = (...teamsArgs) => {
                let new_element = renderTeams();
                renderingLoc.append(new_element);
            }

            return renderingLoc;
        }
        

        
    }else if(args[0] == undefined){
        return new User();
    }
}

const maximiseWindow = (id, index) => {
    //$(`div[tournament-id='${index}']`).addClass("full_screen");
    window.location.href = `./tournament.html?id=${id}&index=${index}`;
}

const displayMaximisedWindow = () => {
    tournaments = JSON.parse(localStorage.getItem("T_CACHE"));

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const tournament_id = urlParams.get('id');
    const tournament_index = urlParams.get('index');

    //console.log(tournament_id, tournament_index);
    //console.log(tournaments);

    let t_t = tournaments[tournament_index];

    document.getElementById("tournament_header").innerHTML = t_t.name;
    window.document.title = t_t.name;

    console.log(t_t);

    let information_div = document.createElement("div");

    let first_half = document.createElement("div");
        first_half.classList.add("tournament_flex")

    let description = document.createElement("div");
        description.innerHTML = t_t.information.description;
        first_half.appendChild(description);
    
    let teams_count = document.createElement("h4");
        teams_count.innerHTML = (t_t.teams.length < 2) ? `${t_t.teams.length} Team` :  `${t_t.teams.length} Teams`;
        first_half.appendChild(teams_count);

    information_div.appendChild(first_half);

    t_t.teams.forEach((element, index) => {
        let parent_div = document.createElement("div");
            parent_div.classList.add("tournament_team_list_element");

        let icon = document.createElement("img")
            icon.src = element.participant.attached_participatable_portrait_url;
            parent_div.appendChild(icon);

        let name = document.createElement("h2");
            name.innerHTML = element.participant.name;
            parent_div.appendChild(name);

        information_div.appendChild(parent_div);
    });

    $('#tournament_matchups').challonge(t_t.information.url, {subdomain: '', theme: '2', multiplier: '1.0', match_width_multiplier: '1.0', show_final_results: '0', show_standings: '0'});

    document.getElementById("tournament_info").append(information_div);
};

const loadData = () => {
    // Load in Data
    let tournament_response = $.get("https://api.challonge.com/v1/tournaments.json", { api_key: KEY } )
    .done(function() {
        let tourney = JSON.parse(tournament_response.responseText);

        tourney.forEach((element, index) => {
            let rt = JSON.parse(tournament_response.responseText)[index].tournament;
            
            let teams_response = $.get(`https://api.challonge.com/v1/tournaments/${rt.id}/participants.json`, { api_key: KEY } )
            .done(function() {
                console.log(JSON.parse(teams_response.responseText));

                createTournament(rt, JSON.parse(teams_response.responseText));
                tm('#tournaments').displayTournaments();
                tm('#teams').displayTeams();
            });
        });
    });  
}
  
tm().login();