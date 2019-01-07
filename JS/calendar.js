//class Rendez vous
//creation et gestion de la class rendez vous
class Meeting {

        //constructeur
    constructor(daySelected, titre, descriptions) {

        //titre du rendez-vous
        this.titre = titre;

        //Description du rendez-vous
        this.description = descriptions;

        this.meeting = document.getElementById("meetings");

        if (!this.meeting) throw "Meeting - Cette élément est indisponible";

        //on crée le div qui contiendra la class rendez-vous
        let divRendezVous = document.createElement('div');
        divRendezVous.classList.add("divRendezVous");
        divRendezVous.setAttribute("id", "divRendezVous");
        this.meeting.appendChild(divRendezVous);

        // On crée la div qui contiendra l'entête de notre rendez-vous
        let enteteRendezVous = document.createElement('div');
        enteteRendezVous.classList.add('enteteRendezVous');
        enteteRendezVous.setAttribute("id", "enteteRendezVous");
        enteteRendezVous.textContent = "Rendez Vous";
        divRendezVous.appendChild(enteteRendezVous);

        //creation de la div qui contiendera le rendez-vous
        this.contentMetting = document.createElement('div');
        this.contentMetting.classList.add('contentMeeting');
        divRendezVous.appendChild(this.contentMetting);

        //creation de la div qui contiendera le label nom
        let contentLabelNom = document.createElement('div');
        contentLabelNom.classList.add('contentLabelNom');
        this.contentMetting.appendChild(contentLabelNom);


        //creation de la div qui contiendera le button de soumission
        let contentButton = document.createElement('div');
        contentButton.classList.add('contentButton');
        divRendezVous.appendChild(contentButton);

        // ajouter le label du titre
        let namelabel = document.createTextNode("TITRE");
        contentLabelNom.appendChild(namelabel);

        // ajouter le titre du rendez-vous
        let name = document.createElement('input');
        name.classList.add("meeting_name");
        name.setAttribute("type", "text");
        name.setAttribute("placeholder", "Rendez vous");
        name.setAttribute("name", "Nom");
        name.value = this.titre;
        name.setAttribute("id", 'meeting_name');
        this.contentMetting.appendChild(name);

        //ajouter error titre si on oublie de remplir le champ titre
        let errorContentTitre = document.createElement('span');
        errorContentTitre.classList.add("errorContentTitre");
        errorContentTitre.setAttribute("id", "errorContentTitre");
        errorContentTitre.textContent = "Erreur, Veuillez renseigner ce champ";
        this.contentMetting.appendChild(errorContentTitre);


        //creation de la div qui contiendera le label description
        let contentLabelDescription = document.createElement('div');
        contentLabelDescription.classList.add('contentLabelDescription');
        this.contentMetting.appendChild(contentLabelDescription);

        //  ajouter le label de la description
        var desc = document.createTextNode("DESCRIPTION");
        contentLabelDescription.appendChild(desc);

        // ajouter la description du rendez-vous
        let description = document.createElement('textarea');
        description.classList.add("description");
        description.setAttribute("id", "description");
        description.setAttribute("type", "text");
        description.setAttribute("rows", "5");
        description.value = this.description;
        description.setAttribute("name", "decription");
        description.setAttribute("placeholder", "Message...");
        this.contentMetting.appendChild(description);

        //ajouter error description si on oublie de remplir le champ de description
        let errorContentDesc = document.createElement('span');
        errorContentDesc.classList.add("errorContentDesc");
        errorContentDesc.setAttribute("id", "errorContentDesc");
        errorContentDesc.textContent = "Erreur, Veuillez renseigner la description du rendez vous";
        this.contentMetting.appendChild(errorContentDesc);

        // Bouton "Sumission"
        let subButton = document.createElement('button');
        subButton.classList.add("sub_button");
        subButton.setAttribute("id", "subButton");
        subButton.setAttribute("value", "Soumettre");
        subButton.setAttribute('data-action', '1');
        subButton.textContent = 'Soumettre';
        contentButton.appendChild(subButton);

        //boutton suppression
        let supButton = document.createElement('button');
        supButton.classList.add("sup_button");
        supButton.setAttribute("id", "supButton");
        supButton.setAttribute("value", "supp");
        supButton.setAttribute('data-action', '1');
        supButton.textContent = 'supp';
        contentButton.appendChild(supButton);

       

        //Si le rendez vous existe afficher, rendez les rendez vous en mode affichage
        //desactivation les inpput et le button de soumissions
        if (this.description != "" && this.titre != "") {
           
            
            description.classList.remove("description");
            name.classList.remove("meeting_name");
            name.setAttribute("disabled", "true");

            description.setAttribute("disabled", "true");
            name.classList.add("desactiveInput");
            description.classList.add("desactiveInput");
            subButton.setAttribute("disabled", "true");
            subButton.classList.add("btnDesactive");

            //pour la suppression d'un rendez-vous
            supButton.addEventListener('click', function() {
               localStorage.removeItem(daySelected, JSON.stringify(this));
               location.reload();
        
                console.log("Vous m'avez cliqué !");
        
            });

        } else {
            //si le rendez n'existe pas, creation du l'IHM

            document.getElementById("subButton").classList.remove('desactiveInput');
            document.getElementById("subButton").classList.add('sub_button');


            let nbRendezVous = document.querySelectorAll(".divRendezVous");
            for (let i = 0; i < nbRendezVous.length; i++) {
                nbRendezVous[i].querySelector(".sub_button").addEventListener('click', (e) => {
                    var rendezVousContenair = e.target.parentElement.parentElement;


                    let inputTitle = rendezVousContenair.querySelector('.meeting_name').value;
                    let inputDescription = rendezVousContenair.querySelector('.description').value;
                    let isValidName = false;
                    let isValidDescription = false;

                    // verifie si les champ sonT renseignés
                    if (!inputTitle || (inputDescription && !inputTitle)) {
                        rendezVousContenair.querySelector('.errorContentTitre').style.display = "block";
                        rendezVousContenair.querySelector('.meeting_name').style.boxShadow = " 0 0 3px #CC0000";
                        isValidName = false;
                        
                    } else {
                        rendezVousContenair.querySelector('.errorContentTitre').style.display = "none";
                        rendezVousContenair.querySelector('.meeting_name').style.boxShadow = "none";
                        isValidName = true;
                    }
                    if (!inputDescription || (inputTitle && !inputDescription)) {
                        rendezVousContenair.querySelector('.errorContentDesc').style.display = "block";
                        rendezVousContenair.querySelector('.description').style.boxShadow = " 0 0 3px #CC0000";
                        isValidDescription = false;
                    } else {
                        rendezVousContenair.querySelector('.errorContentDesc').style.display = "none";
                        rendezVousContenair.querySelector('.description').style.boxShadow = "none";

                        isValidDescription = true;
                    }


                    // verifie si localStorage est définie et les champs sont bien renseignés
                    if (typeof (Storage) !== "undefined" && isValidName && isValidDescription) {
                        this.titre = inputTitle;
                        this.description = inputDescription;

                        try {
                            if (localStorage.getItem(daySelected) == null) {
                                
                            


                                //sauvegarde les données du rendez vous en local
                                localStorage.setItem(daySelected, JSON.stringify(this));
                            }

                            //refrech la page d'acceuil    
                           location.reload();

                        } catch (e) {
                            console.log(e);
                        
                        }

                    }
                });
            }
        }
    }
}

//Classe Calendrier
//creation du calendrier
class Calendar {

    constructor(domTarget) {

        try {
            this.domElement = document.querySelector(domTarget);

            // Renvoit une erreur si l'élément n'éxiste pas
            if (!this.domElement) throw "Calendar - L'élément spécifié est introuvable";
        } catch (e) {
            document.getElementById('stateCalendar').innerHTML = "Error: " + e.message + ".";

        }


        // Liste des mois de l'année 
        this.monthList = new Array('janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aôut', 'septembre', 'octobre', 'novembre', 'décembre');


        // Liste des jours de la semaine
        this.dayList = new Array('lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche');


        // Date actuelle
        this.today = new Date();
        this.today.setHours(0, 0, 0, 0);

        // Mois actuel
        this.currentMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);

        // On créé le div qui contiendra l'entête de notre calendrier
        let entete = document.createElement('div');
        entete.classList.add('entete');
        this.domElement.appendChild(entete);

        // On créé le div qui contiendra les jours de notre calendrier
        this.content = document.createElement('div');
        this.domElement.appendChild(this.content);

        // On créé le div qui contiendra les jours feriés de notre calendrier
        let contentSpec = document.createElement('div');
        contentSpec.classList.add("contentSpec");
        contentSpec.setAttribute("id", "contentSpec");
        contentSpec.textContent = ""
        this.domElement.appendChild(contentSpec);

        // Bouton "précédent"
        let previousButton = document.createElement('button');
        previousButton.setAttribute('data-action', '-1');
        previousButton.textContent = '<';
        entete.appendChild(previousButton);

        // Div qui contiendra le mois/année affiché
        this.monthDiv = document.createElement('div');
        this.monthDiv.classList.add('month');
        entete.appendChild(this.monthDiv);

        // Bouton "suivant"
        let nextButton = document.createElement('button');
        nextButton.setAttribute('data-action', '1');
        nextButton.textContent = '>';
        entete.appendChild(nextButton);

        // Action des boutons "précédent" et "suivant"
        this.domElement.querySelectorAll('button').forEach(element => {
            element.addEventListener('click', () => {
                // On multiplie par 1 les valeurs pour forcer leur convertion en "int"
                this.currentMonth.setMonth(this.currentMonth.getMonth() * 1 + element.getAttribute('data-action') * 1);
                this.loadMonth(this.currentMonth);
            });
        });

        // On charge le mois actuel 
        this.loadMonth(this.currentMonth);
        var daySelectedAuto = this.today.getDate() + "/" + (this.today.getMonth() + 1) + "/" + this.today.getFullYear();
        this.meeting(daySelectedAuto);

    }


    loadMonth(date) {
        //marqueur journée feriée
        function JoursFeries(dateferies) {
            var joursFerie = "aucun";
            //liste des jours feries avec le mois dans l'année
            var arrayJoursferies = new Array("1/1", "1/5", "8/5", "14/7", "15/8", "1/11", "11/11", "25/12");
            for (var i = 0; i < arrayJoursferies.length; i++) {
                if (dateferies == arrayJoursferies[i] && i == 0) {
                    joursFerie = "Jour de l'AN";
                } else if (dateferies == arrayJoursferies[i] && i == 1) {
                    joursFerie = "Fête de travail";
                } else if (dateferies == arrayJoursferies[i] && i == 2) {
                    joursFerie = "Fête de la victoire";
                } else if (dateferies == arrayJoursferies[i] && i == 3) {
                    joursFerie = "Fête nationale";
                } else if (dateferies == arrayJoursferies[i] && i == 4) {
                    joursFerie = "Assompton";
                } else if (dateferies == arrayJoursferies[i] && i == 5) {
                    joursFerie = "Toussaint";
                } else if (dateferies == arrayJoursferies[i] && i == 6) {
                    joursFerie = "Armistice";
                } else if (dateferies == arrayJoursferies[i] && i == 7) {
                    joursFerie = "NOÊL";
                
                }
              
            }
            return joursFerie;
        }

        // On vide notre calendrier
        this.content.textContent = '';


        // On ajoute le mois/année affiché
        this.monthDiv.textContent = this.monthList[date.getMonth()].toUpperCase() + ' ' + date.getFullYear();

        // Création des cellules contenant le jour de la semaine
        for (let i = 0; i < this.dayList.length; i++) {
            let cell = document.createElement('span');
            cell.classList.add('cell');
            cell.classList.add('day');
            cell.textContent = this.dayList[i].substring(0, 3).toUpperCase();
            if (cell.textContent === 'SAM' || cell.textContent === 'DIM') {
                cell.style.color = "#b4d8ee";
            } else
                cell.style.color = "none";
            this.content.appendChild(cell);
        }

        // Nombre de jour dans le mois affiché
        let monthLength = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        // Création des cellules vides si nécessaire
        var nbCellEmpty = date.getDay();

        if (date.getDay() === 0) {
            nbCellEmpty = 7;
        }

        for (let i = 1; i <= (nbCellEmpty - 1); i++) {
            let cel = document.createElement('span');
            cel.classList.add('cell');
            cel.classList.add('empty');
            this.content.appendChild(cel);

        }


        // Création des cellules contenant les jours du mois affiché
        for (let i = 1; i <= monthLength + 1; i++) {
            var newDate = new Date(date.getFullYear(), date.getMonth(), i);

            var dayMark = document.createElement('span');
            var nbRendezVous = 0;
            var cheekJourFeries = 0;
            dayMark.classList.add("dayMark");
            dayMark.setAttribute("id", "dayMark");
            dayMark.setAttribute("value", -1);
            let cel = document.createElement('button');
            cel.classList.add('cell');
            if (i == (monthLength + 1)) {
                cel = document.createElement('span');
                cel.classList.add('empty');
                cel.textContent = "";
                cel.setAttribute("value", 0);
            } else {
                cel.textContent = i;
                cel.value = i;
                cel.setAttribute("value", i);
                cheekJourFeries = i + "/" + (this.currentMonth.getMonth() + 1);

            }
            var celToday = this.today.getDate() + "/" + this.today.getMonth();
            var celSelect = newDate.getDate() + "/" + newDate.getMonth();
            //style css des weekend
            if (newDate.getDay() == 0 || newDate.getDay() == 6) {
                if (((newDate.getDay() - 1) != this.today.getDay()) && celToday != celSelect) {
                    cel.style.color = "red";
                    cel.style.background = "#183133";
                }
            }
            var markMeeting = localStorage.getItem(i + "/" + (this.currentMonth.getMonth() + 1) + "/" + this.currentMonth.getFullYear() + "-" + 1);
          
            //ajoute  le marqueur pour le jour fernier
            if (JoursFeries(cheekJourFeries) != "aucun") {
                dayMark.textContent = ".";
              this.content.appendChild(cel).appendChild(dayMark);
            }// ajoute le marqueur pour le jour de rendez  vous
             else if (markMeeting){
                dayMark.classList.add("dayMark1");
                dayMark.textContent = ".";
                this.content.appendChild(cel).appendChild(dayMark);
            }else 
                this.content.appendChild(cel);

            // Timestamp de la cellule
            let timestamp = new Date(date.getFullYear(), date.getMonth(), i).getTime();

            // Ajoute une classe spéciale pour aujourd'hui
            if (timestamp === this.today.getTime()) {
                cel.classList.add('today');

                //affiche l'etat du jour J
                document.getElementById("contentSpec").innerHTML = JoursFeries(timestamp);
            }
        }

        // Action du boutton de chaque date 
        this.content.querySelectorAll('button').forEach(element => {
            element.addEventListener('click', (e) => {

                //recupere la valeur du button selectione
                let targetCheek = e.target.value == null ? e.target.parentElement.value : e.target.value;

                //ajout du mois current a la date selectionée
                let jourSelectione = targetCheek + "/" + (this.currentMonth.getMonth() + 1);

                //afficher sur le dom l'évenement spécifique à cette date
                document.getElementById("contentSpec").innerHTML = JoursFeries(jourSelectione);

                //ajouter l'année courante à la date selectionée
                jourSelectione += "/" + this.currentMonth.getFullYear();



                //Mettre a jour les rendez vous sur les IHM
                let myNode = document.getElementById("meetings");
                if (myNode.hasChildNodes) {
                    while (myNode.firstChild) {
                        myNode.removeChild(myNode.firstChild);
                    }
                }

                //charge le module rendez vous en fonction de la date selectionée
                this.meeting(jourSelectione);

            });
        });


    }



    meeting(daySelectedAuto) {
        //localStorage.clear();
        console.log("date d'entrée: " + daySelectedAuto);


        const nbMeetings = 1;

        //initialiser l'ID du rendez vous
        daySelectedAuto += "-" + nbMeetings;

        console.log("date d'entrée + rendez vous: " + daySelectedAuto);

        //initaliser compteur des rendez vous
        let CountRendezVous = 1;

        //Aafficher le rendez vous à la base rendez vous
        if (typeof (Storage) !== "undefined") {
            while (CountRendezVous > 0 && CountRendezVous < 20) {

                let result = localStorage.getItem(daySelectedAuto);
            
                let saveMeeting = JSON.parse(result);
                if (saveMeeting == null) {
                    console.log("valeur clé: " + daySelectedAuto);
                    let createMeeting = new Meeting(daySelectedAuto, "", "");
                    CountRendezVous = 0;
                    break;
                } else {
                    let mettingSaved = new Meeting(daySelectedAuto, saveMeeting.titre, saveMeeting.description);
                    console.log("deja enrgistrée : " + daySelectedAuto, "", "");
               
                }

                let idMeetings = daySelectedAuto.split('-');
                let dateID = idMeetings[0];


                idMeetings = idMeetings[1] != null ? idMeetings[1] : -1;

                console.log("date recupéré  : " + dateID);
                console.log("nb rendez vous  : " + idMeetings);
                
                

                daySelectedAuto = dateID + "-" + (parseInt(idMeetings) + 1);
                CountRendezVous++;
            }
        }
    }


}


const calendar = new Calendar('#calendar');
