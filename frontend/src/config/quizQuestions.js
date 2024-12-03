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
              value: "1",
              text: "Dry",
            },
            {
              value: "2",
              text: "Normal",
            },
            {
              value: "4",
              text: "Oily",
            },
            {
              value: "8",
              text: "Sensitive",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question3",
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
          name: "question4",
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
          name: "question5",
          visibleIf: "{question1} = false",
          title: "My skin is easily irritated",
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
          type: "boolean",
          name: "question6",
          title: "Do you know your skin concerns?",
          isRequired: true,
        },
        {
          type: "checkbox",
          name: "question7",
          visibleIf: "{question6} = true",
          title: "What's are you skin concerns?",
          requiredIf: "{question6} = true",
          choices: [
            { value: "1", text: "Acne" },
            { value: "2", text: "Aging/Wrinkles" },
            { value: "4", text: "Dryness" },
            { value: "8", text: "Redness" },
            { value: "16", text: "Hyperpigmentation" },
            { value: "32", text: "Large Pores" },
          ],
        },
        {
          type: "radiogroup",
          name: "question8",
          visibleIf: "{question6} = false",
          title: "I experience frequent breakouts or acne",
          requiredIf: "{question6} = false",
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
          name: "question9",
          visibleIf: "{question6} = false",
          title: "Fine lines or wrinkles a concern to me",
          requiredIf: "{question6} = false",
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
          name: "question10",
          visibleIf: "{question6} = false",
          title: "My skin feel dry or dehydrated often",
          requiredIf: "{question6} = false",
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
          name: "question11",
          visibleIf: "{question6} = false",
          title: "My skin often appear red or irritated",
          requiredIf: "{question6} = false",
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
          name: "question11",
          visibleIf: "{question6} = false",
          title: "My skin often appear red or irritated",
          requiredIf: "{question6} = false",
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
          name: "question12",
          visibleIf: "{question6} = false",
          title: "I have an uneven skin tone or dark spots",
          requiredIf: "{question6} = false",
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
          name: "question13",
          visibleIf: "{question6} = false",
          title: "I have visible pores that I would like to minimize",
          requiredIf: "{question6} = false",
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
