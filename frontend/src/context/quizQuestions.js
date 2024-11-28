export const quizQuestions = {
  logoPosition: "right",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "boolean",
          name: "question1",
          title: "Do you know your skin type?",
          isRequired: true,
        },
        {
          type: "checkbox",
          name: "question2",
          visibleIf: "{question1} = true",
          title: "What's your skin type?",
          requiredIf: "{question1} = true",
          choices: [
            {
              value: "2",
              text: "Normal",
            },
            {
              value: "4",
              text: "Oily",
            },
            {
              value: "1",
              text: "Dry",
            },
            {
              value: "3",
              text: "Sensitive",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question3",
          visibleIf: "{question1} = false",
          title: "My face gets oily throughout the day",
          requiredIf: "{question1} = false",
          choices: [
            {
              value: "0",
              text: "Disagree",
            },
            {
              value: "1",
              text: "Agree",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question4",
          visibleIf: "{question1} = false",
          title: "I have enlarged pores",
          requiredIf: "{question1} = false",
          choices: [
            {
              value: "0",
              text: "Disagree",
            },
            {
              value: "1",
              text: "Agree",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question5",
          visibleIf: "{question1} = false",
          title: "My skin is tight and/or flaky",
          requiredIf: "{question1} = false",
          choices: [
            {
              value: "0",
              text: "Disagree",
            },
            {
              value: "1",
              text: "Agree",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question6",
          visibleIf: "{question1} = false",
          title: "My skin appears dull",
          requiredIf: "{question1} = false",
          choices: [
            {
              value: "0",
              text: "Disagree",
            },
            {
              value: "1",
              text: "Agree",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question7",
          visibleIf: "{question1} = false",
          title: "My skin gets red easily",
          requiredIf: "{question1} = false",
          choices: [
            {
              value: "0",
              text: "Disagree",
            },
            {
              value: "1",
              text: "Agree",
            },
          ],
        },
        {
          type: "checkbox",
          name: "question8",
          title: "What are your skin concerns?",
          isRequired: true,
          choices: [
            {
              value: "1",
              text: "Acne",
            },
            {
              value: "32",
              text: "Large Pores",
            },
            {
              value: "16",
              text: "Hyperpigmentation",
            },
            {
              value: "8",
              text: "Redness",
            },
            {
              value: "2",
              text: "Aging/Wrinkles",
            },
            {
              value: "4",
              text: "Dryness",
            },
          ],
        },
      ],
    },
  ],
  showPageTitles: false,
  showCompletedPage: false,
  navigateToUrl: "",
  navigateToUrlOnCondition: [
    {
      url: "https://localhost500",
    },
  ],
};
