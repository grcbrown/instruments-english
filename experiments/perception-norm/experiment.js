const jsPsych = initJsPsych({
    show_progress_bar: true,
    on_finish: function() {
        jsPsych.data.displayData('csv');
    }
});

let timeline = []; //Empty timeline to which we will add trials

//INSTRUCTIONS// 
const instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "Hello! Thank you so much for helping me out. I'm going to show you a series of statements about different beings (people, objects, etc.), and you will have to indicate on a scale how much you agree with each statement. <br><br> The purpose of this task is to aid in the experimental design process for one of my research projects. I won't be sharing your responses with anyone! <br><br> To start the rating task, click 'Continue'.<br><br>", 
    choices: ['Continue']
};

timeline.push(instructions);

//TRIALS//
// ====== Likert scale options ======
const likertOptions = [
  "Strongly Disagree",
  "Disagree",
  "Somewhat Disagree",
  "Neither Agree nor Disagree",
  "Somewhat Agree",
  "Agree",
  "Strongly Agree"
];

// ====== Nested timeline for survey-likert ======
let trial_array = create_tv_array(trial_objects);
const likertTrials = {
  timeline: [
    {
      type: jsPsychSurveyLikert,
      questions: [
        {
          prompt: jsPsych.timelineVariable('sentient'),
          labels: likertOptions,
          required: true,
          name: "sentient"
        },
        {
          prompt: jsPsych.timelineVariable('autonomous'),
          labels: likertOptions,
          required: true,
          name: "autonomous"
        }
      ],
      data: {
        id: jsPsych.timelineVariable('id')
      }
    }
  ],
  timeline_variables: trial_objects,
  randomize_order: true
};



// ====== Add to main timeline ======
//timeline.push(likertTrials);

function shuffleArray(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ===== SHUFFLE TRIAL ORDER =====
const shuffled_trials = shuffleArray(trial_objects);

// ===== ADD ONE SURVEY-LIKERT TRIAL PER OBJECT =====
shuffled_trials.forEach(obj => {
  timeline.push({
    type: jsPsychSurveyLikert,
    questions: [
      { prompt: obj.sentient,    labels: likertOptions, required: true, name: "sentient" },
      { prompt: obj.autonomous,  labels: likertOptions, required: true, name: "autonomous" }
    ],
    data: { id: obj.id }
  });
});

//SURVEY// 
const transition = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p>You've completed the rating trials. On the next page, you'll see a short questionnaire. This questionnaire is optional, but your feedback would be greatly appreciated!</p>",
    choices: ["Continue"]
};

timeline.push(transition);

const questionnaire = {
  type: jsPsychSurvey,
  theme: "modern",
  survey_json: {
    showQuestionNumbers: "off",
    widthMode: "responsive",
    completeText: "Complete",
    elements: [
      {
        type: "comment",
        name: "clarity",
        title: "In the rating task, I used the terms 'autonomous' and 'sentient'. Did you find these words easy to understand?",
      },
      {
        type: "comment",
        name: "suggestions",
        title: "If you did not find the terms 'autonomous or 'sentient' easily understandable, what terms would be more appropriate, in your opinion?",
      },
      {
        type: "comment",
        name: "comments",
        title: "Do you have any other comments about the task?"
      }
    ]
  }
};

timeline.push(questionnaire);

//DATA COLLECTION
// capture info from Prolific
var subject_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
var study_id = jsPsych.data.getURLVariable('STUDY_ID');
var session_id = jsPsych.data.getURLVariable('SESSION_ID');

jsPsych.data.addProperties({
    subject_id: subject_id,
    study_id: study_id,
    session_id: session_id
});

const p_id = jsPsych.randomization.randomID(10);
const filename = `${p_id}.csv`;


const save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "sw2DChC3LgHb",
    filename: filename,
    data_string: ()=>jsPsych.data.get().csv()
};

timeline.push(save_data);

//THANKS//
var thanks = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p>You've finished the study. Thank you for your help!</p>`,
  choices: "NO_KEYS"
}

timeline.push(thanks);

//RUN//
jsPsych.run(timeline);