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
// ====== Likert scale options ======
const likertOptions = [
  "Totalmente in disaccordo",
  "Abbastanza in disaccordo",
  "Un po' in disaccordo",
  "N\u00E9 d'accordo n\u00E9 in disaccordo",
  "Un po' d'accordo",
  "Abbastanza d'accordo",
  "Assolutamente d'accordo"
];

// ====== Nested timeline for survey-likert ======
let trial_array = create_tv_array(trial_objects);
const likertTrials = {
  timeline: [
    {
      type: jsPsychSurveyLikert,
      preamble: jsPsych.timelineVariable('text'),
      questions: [
        {
          prompt: "Questa frase \u00E8 naturale.",
          labels: likertOptions,
          required: true
        },
        {
          prompt: jsPsych.timelineVariable('mobile'),
          labels: likertOptions,
          required: true
        },
        {
          prompt: jsPsych.timelineVariable('volition'),
          labels: likertOptions,
          required: true
        },
        {
          prompt: jsPsych.timelineVariable('sentient'),
          labels: likertOptions,
          required: true
        },
        {
          prompt: jsPsych.timelineVariable('instigation'),
          labels: likertOptions,
          required: true
        },
        {
          prompt: jsPsych.timelineVariable('qualpersist'),
          labels: likertOptions,
          required: true
        }
      ],
      data: {
        id: jsPsych.timelineVariable('id'),
        subj: jsPsych.timelineVariable('subj')
      }
    }
  ],
  timeline_variables: trial_objects,
  randomize_order: true
};

// ====== Add to main timeline ======
timeline.push(likertTrials);

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