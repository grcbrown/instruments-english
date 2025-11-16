const jsPsych = initJsPsych({
    show_progress_bar: true,
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
    stimulus: "<p>Hai completato le prove sperimentali. Ora ti verr\u00E0 presentato un breve questionario. La compilazione del questionario \u00E8 facoltativa. Se ti senti a tuo agio nel farlo, ti preghiamo di rispondere alla seguenti domande.</p>",
    choices: ["Avanti"]
};

timeline.push(transition);

const questionnaire = {
  type: jsPsychSurvey,
  theme: "modern",
  survey_json: {
    showQuestionNumbers: "off",
    widthMode: "responsive",
    completeText: "Completa",
    elements: [
      {
        type: "html",
        html: "<p>Rispondi alle seguenti domande:</p>"
      },
      {
        type: "boolean",
        name: "understood",
        title: "Hai letto e capito le istruzioni?",
        labelTrue: "S\u00EC",
        labelFalse: "No",
        renderAs: "radio"
      },
      {
        type: "text",
        name: "age",
        title: "Et\u00E0:",
        inputType: "number"
      },
      {
        type: "radiogroup",
        name: "gender",
        title: "Genere:",
        choices: ["Maschile", "Femminile", "Non binario", "Preferisco non specificare"],
        showOtherItem: true,
        otherText: "Altro (specificare)"
      },
      {
        type: "comment",
        name: "ethnicity",
        title: "Come descriverebbe la tua razza e/o etnia?"
      },
      {
        type: "comment",
        name: "languages",
        title: "Quali lingue parli?"
      },
      {
        type: "comment",
        name: "topic",
        title: "Di cosa pensi che tratti questo studio?"
      },
      {
        type: "radiogroup",
        name: "enjoy",
        title: 'Ti \u00E8 piaciuto lo studio?',
        choices: [
          "Uno studio peggiore della media",
          "Uno studio medio",
          "Uno studio migliore della media"
        ]
      },
      {
        type: "radiogroup",
        name: "payment",
        title: "Pensi che il pagamento fosse equo?",
        choices: [
          "Il pagamento \u00E8 stato equo",
          "Il pagamento \u00E8 stato troppo basso"
        ]
      },
      {
        type: "comment",
        name: "comments",
        title: "Hai ulteriori commenti su questo studio?"
      }
    ]
  }
};

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