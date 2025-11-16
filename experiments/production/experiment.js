const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    on_finish: function(data) {
        proliferate.submit({"trials": data.trials});
    }
});

let timeline = []; //Empty timeline to which we will add trials

//IRB - SKIP FOR PILOT// 
//const irb = {
//    type: jsPsychHtmlButtonResponse,
//    stimulus: "ADD IRB TEXT", 
//    choices: ['Avanti']
//};

//timeline.push(irb);

//INSTRUCTIONS// 
const instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "INSTRUCTIONS HERE", 
    choices: ['Avanti']
};

timeline.push(instructions);

//TRIALS//
let trial_array = create_tv_array(trial_objects);
const trials = {
    timeline: [
        {
            type: jsPsychCloze,
            text: jsPsych.timelineVariable('text'),
            allow_blanks: false,
            button_text: 'Avanti',
            data: {
                text: jsPsych.timelineVariable('text'),
                id: jsPsych.timelineVariable('id'),
                subj: jsPsych.timelineVariable('subj')
            },
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + trial_array.length));
            }
        }
    ],
    timeline_variables: trial_objects,
    randomize_order: true
};

timeline.push(trials);

//SURVEY// 
const transition = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "Hai completato le prove sperimentali. Ora ti verrà presentato un breve questionario. La compilazione del questionario è facoltativa. Se ti senti a tuo agio nel farlo, ti preghiamo di rispondere alla seguenti domande.",
    choices: ["Avanti"]
};

timeline.push(transition);

const questionnaire = {
    type: jsPsychSurvey,
    survey_json: {
        elements:
        [
            {
                type: 'html', 
                title: "Rispondete alle seguenti domande:"
            },
            {
                type: 'boolean',
                title: "Hai letto e capito le istruzioni?",
                name: 'understood',
                labelTrue: 'Sì', 
                labelFalse: 'No'
            },
            {
                type: 'comment',
                title: "Età:",
                name: 'age',
                inputType: "number"
            },
            {
                type: 'radiogroup', 
                title: "Genere:",
                name: 'gender',
                choices: ["Maschile", "Femminile", "Non binario", "Preferisco non specificare"],
                showOtherItem: true,
                otherText: "Altro (specificare)",
                showSelectAllItem: false,
                showNoneItem: false
            },
            {
                type: 'comment',
                title: "Come descriveresti la tua razza e/o etnia?",
                name: 'ethnicity'
            },
            {
                type: 'comment',
                title: "Quali lingue parli?",
                name: 'languages'
            },
            {
                type: 'comment',
                title: "Di cosa pensi che tratti questo studio?",
                name: 'topic'
            },
            {
                type: 'radiogroup',
                title: "Ti è piaciuto lo studio?",
                name: 'enjoy',
                choices: ['Uno studio peggiore della media', 'Uno studio medio', "Uno studio migliore della media"]
            },
            {
                type: 'radiogroup',
                title: "Pensi che il pagamento fosse equo?",
                name: 'payment',
                choices: ['Il pagamento è stato equo', 'Il pagamento è stato troppo basso']
            },
            {
                type: 'comment',
                title: "Hai ulteriori commenti sullo studio?",
                name: 'comments'
            }
        ]
    }
}

timeline.push(questionnaire);

//THANKS//
const thanks = {
    type: jsPsychHtmlButtonResponse,
    choices: ['Invia'],
    stimulus: "Grazie per il tempo che ci hai dedicato! Per terminare lo studio, clicca su 'Invia' e attendi fino a quando non verrai reindirizzato a Prolific."
};

timeline.push(thanks);

//RUN//
jsPsych.run(timeline);