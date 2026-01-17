const jsPsych = initJsPsych({
    show_progress_bar: true,
    on_finish: function(data) {
        proliferate.submit({"trials": data.trials});
    }
});

let timeline = []; //Empty timeline to which we will add trials

//IRB - SKIP FOR PILOT// 
const irb = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="font-size: 16px; text-align: center; margin-top: 25px; margin-right: 100px; margin-left: 100px; margin-bottom: 25px;">
            <img src="./image/SUSig_2color_Stree_Left.png" alt="Stanford Logo" style="max-width: 500px; margin-bottom: 20px;">
            <h3>DESCRIPTION</h3>
            <p>You are invited to participate in a research study on language production. Its purpose is to help us understand what factors influence sentence construction. In the study, you will be asked to complete a series of incomplete sentences. Following this, you will have the opportunity to complete an optional demographic survey. Participation in this research is voluntary, and you are free to withdraw your consent at any time.</p>
            <h3>TIME INVOLVEMENT</h3> 
            <p>Your participation will take approximately 10 minutes.</p>
            <h3>PAYMENT</h3> 
            <p>You will be paid at the posted rate.</p>
            <h3>PRIVACY AND CONFIDENTIALITY</h3> 
            <p>The risks associated with this study are minimal. This judgment is based on a large body of experience with the same or similar procedures with people of similar ages, sex, origins, etc. Study data will be stored securely, in compliance with Stanford University standards, minimizing the risk of confidentiality breach. Your individual privacy will be maintained during the research and in all published and written data resulting from the study.</p>
            <h3>CONTACT INFORMATION</h3>
            <p>If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director, Grace Brown, at (616) 498-8188 or grcbrown@stanford.edu. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650) 723-2480 or toll free at 1-866-680-2906, or email at irbnonmed@stanford.edu.</p> 
            <p>Please save or print a copy of this page for your records</p>
            <p>If you agree to participate in this research, please click the 'Continue' button.</p>
        </div>
    `,
    choices: ['Continue'],
    response_ends_trial: true,
    margin_vertical: '10px'
};

//INSTRUCTIONS// 
const instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div class="gen_ins"; style="font-size: 16px; text-align: center; margin-top: 25px; margin-right: 100px; margin-left: 100px; margin-bottom: 25px;">
        <p>During this experiment, you will complete a fill-in-the-blank task. In a given trial, you will see an incomplete sentence, and you will be prompted to type a word to complete the sentence. There will be 34 trials, and this portion of the experiment is expected to take 10 minutes.</p>
        <p>After you complete this task, you will have the opportunity to complete an optional survey.</p>
        <p>This is a pilot. There may be bugs. </p>
        <p>If you understand the instructions and are ready to begin the practice trials, click ‘Continue’.</p>
    </div>
    `, 
    choices: ['Continue'],
    response_ends_trial: true
};

//TRIALS//
let trial_array_1 = create_tv_array(trial_objects_list_1);
const trial_1 = {
    timeline: [
        {
            type: jsPsychCloze,
            text: jsPsych.timelineVariable('text'),
            prompt: '<p>Type one word in the textbox to complete the sentence.</p>',
            allow_blanks: false,
            button_text: 'Continue',
            data: {
                text: jsPsych.timelineVariable('text'),
                id: jsPsych.timelineVariable('id'),
                subj: jsPsych.timelineVariable('subj')
            }
        }
    ],
    timeline_variables: trial_objects_list_1,
    randomize_order: true
};

let trial_array_2 = create_tv_array(trial_objects_list_2);
const trial_2 = {
    timeline: [
        {
            type: jsPsychCloze,
            text: jsPsych.timelineVariable('text'),
            prompt: '<p>Type one word in the textbox to complete the sentence.</p>',
            allow_blanks: false,
            button_text: 'Continue',
            data: {
                text: jsPsych.timelineVariable('text'),
                id: jsPsych.timelineVariable('id'),
                subj: jsPsych.timelineVariable('subj')
            }
        }
    ],
    timeline_variables: trial_objects_list_2,
    randomize_order: true
};

//SURVEY// 
const transition = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <div class="gen_ins"; style="font-size: 16px; text-align: center; margin-top: 25px; margin-right: 100px; margin-left: 100px; margin-bottom: 25px;">
        <p>You have completed the fill-in-the-blank trials. Next, you will be directed to an optional survey/</p>
        <p>Please answer any of the questions on the next page that you are comfortable answering. After seeing the survey, you will be able to end the experiment.</p>
        <p>Click ‘Continue’ to proceed to the survey.</p>
    </div>
    `,
    choices: ["Continue"]
};

const questionnaire = {
  type: jsPsychSurvey,
  theme: "modern",
  survey_json: {
    showQuestionNumbers: "off",
    widthMode: "responsive",
    completeText: "Finish",
    elements: [
      {
        type: "html",
        html: "<p>Please respond to the following questions. When you are done with the survey, click 'Finish' at the bottom of the page to be directed to the end of the experiment.</p>"
      },
      {
        type: "boolean",
        name: "understood",
        title: "Did you read and understand the instructions?",
        labelTrue: "Yes",
        labelFalse: "No",
        renderAs: "radio"
      },
      {
        type: "text",
        name: "age",
        title: "Age:",
        inputType: "number"
      },
      {
        type: "radiogroup",
        name: "gender",
        title: "Gender Identity:",
        choices: ["Male", "Female", "Non-binary", "Prefer not to answer"],
        showOtherItem: true,
        otherText: "Other (specify)",
        showSelectAllItem: false,
        shwNoneItem: false
      },
      {
        type: "comment",
        name: "ethnicity",
        title: "How would you describe your race or ethnicity?"
      },
      {
        type: "comment",
        name: "languages",
        title: "What languages do you speak?"
      },
      {
        type: "comment",
        name: "topic",
        title: "What do you think this study was about?"
      },
      {
        type: "radiogroup",
        name: "enjoy",
        title: 'Did you enjoy the study?',
        choices: [
          "Worse than average study",
          "Average study",
          "Better than average study"
        ]
      },
      {
        type: "radiogroup",
        name: "payment",
        title: "Did you think the payment was fair?",
        choices: [
          "The payment was fair",
          "The payment was too low"
        ]
      },
      {
        type: "comment",
        name: "comments",
        title: "Do you have any additional comments about the study?"
      }
    ]
  }
};

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
  experiment_id: "1yLvbUVSrEQj", 
  filename: filename,
  data_string: ()=>jsPsych.data.get().csv()
};

//THANKS//
var thanks = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p>You've finished the pilot study. Thank you for your time! </p>
    <br><br>
    <p> <a href="https://app.prolific.com/submissions/complete?cc=C1ASD33E"> Click here to return to Prolific and complete the study</a>.</p>`,
  choices: "NO_KEYS"
};

//RUN
// --- Define 8 condition timelines (identical structure) ---
let condition_1_timeline = [irb, instructions, trial_1, transition, questionnaire, save_data, thanks];
let condition_2_timeline = [irb, instructions, trial_2, transition, questionnaire, save_data, thanks];

// --- Use DataPipe to assign participant condition ---
async function createExperiment() {
  const condition = await jsPsychPipe.getCondition("1yLvbUVSrEQj");
  console.log("Assigned condition:", condition);

  if (condition == 0) { timeline = condition_1_timeline; }
  if (condition == 1) { timeline = condition_2_timeline; }

  jsPsych.run(timeline);
}

createExperiment();