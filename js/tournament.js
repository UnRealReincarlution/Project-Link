/* 
 *    BEN WHITE 2020 © TOURNAMENT MANAGER (tm) FOR PROJECT LINK
 *              https://github.com/UnRealReincarlution
 */

let tournaments = [];

class Tournament {
    constructor(...args) {
        this.information = args[0];
    }

    logSelf() {
        console.log(this.information);
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
            let login_token = JSON.parse(localStorage.getItem('jaw9jd09q28eadwa'));
            console.log("Logging In");

            document.getElementById('user_logged_out').classList.add('hidden');
            document.getElementById('users_name').innerHTML = login_token.username;
        }else{
            document.getElementById('user_logged_in').classList.add('hidden');
        }
    }
}

const renderTournaments = (element_id) => {
    let return_value = document.createElement('div');

    tournaments.forEach((element, index) => {
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
            game.innerHTML = element.game;
            element_for_editing.append(game);
        
        let fee = document.createElement('h6');
            fee.innerHTML = element.cost;
            element_for_editing.append(fee);

        let date = document.createElement('h5');
            date.innerHTML = `Starts in ${hh} ${unit}`;
            element_for_editing.append(date);

        let button = document.createElement('div');
            button.classList.add('animation_button');

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
    tournaments.push(new Tournament(tournamentArguments[0]));
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
