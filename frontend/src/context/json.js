export const json = {
  "logoPosition": "right",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "radiogroup",
          "name": "question1",
          "title": "What's your skin type?",
          "isRequired": true,
          "choices": [
            {
              "value": "2",
              "text": "Normal"
            },
            {
              "value": "4",
              "text": "Oily"
            },
            {
              "value": "1",
              "text": "Dry"
            },
            {
              "value": "5",
              "text": "Combination"
            },
            {
              "value": "8",
              "text": "Sensitive"
            },
            {
              "value": "0",
              "text": "Not sure"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question2",
          "visibleIf": "{question1} = '0'",
          "title": "My t-zone is shiny",
          "requiredIf": "{question1} = '0'",
          "choices": [
            {
              "value": "1",
              "text": "Strongly Disagree"
            },
            {
              "value": "2",
              "text": "Disagree"
            },
            {
              "value": "0",
              "text": "Neutral"
            },
            {
              "value": "3",
              "text": "Agree"
            },
            {
              "value": "4",
              "text": "Strongly Agree"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question3",
          "visibleIf": "{question1} = '0'",
          "title": "I have enlarged pores",
          "requiredIf": "{question1} = '0'",
          "choices": [
            {
              "value": "1",
              "text": "Strongly Disagree"
            },
            {
              "value": "2",
              "text": "Disagree"
            },
            {
              "value": "0",
              "text": "Neutral"
            },
            {
              "value": "3",
              "text": "Agree"
            },
            {
              "value": "4",
              "text": "Strongly Agree"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question4",
          "visibleIf": "{question1} = '0'",
          "title": "My skin is tight and/or flaky",
          "requiredIf": "{question1} = '0'",
          "choices": [
            {
              "value": "1",
              "text": "Strongly Disagree"
            },
            {
              "value": "2",
              "text": "Disagree"
            },
            {
              "value": "0",
              "text": "Neutral"
            },
            {
              "value": "3",
              "text": "Agree"
            },
            {
              "value": "4",
              "text": "Strongly Agree"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question5",
          "visibleIf": "{question1} = '0'",
          "title": "My skin appears dull",
          "requiredIf": "{question1} = '0'",
          "choices": [
            {
              "value": "1",
              "text": "Strongly Disagree"
            },
            {
              "value": "2",
              "text": "Disagree"
            },
            {
              "value": "0",
              "text": "Neutral"
            },
            {
              "value": "3",
              "text": "Agree"
            },
            {
              "value": "4",
              "text": "Strongly Agree"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question7",
          "visibleIf": "{question1} = 0",
          "title": "My skin gets red easily",
          "requiredIf": "{question1} = 0",
          "choices": [
            {
              "value": "1",
              "text": "Strongly Disagree"
            },
            {
              "value": "2",
              "text": "Disgaree"
            },
            {
              "value": "0",
              "text": "Neutral"
            },
            {
              "value": "3",
              "text": "Agree"
            },
            {
              "value": "4",
              "text": "Strongly Agree"
            }
          ]
        },
        {
          "type": "checkbox",
          "name": "question6",
          "title": "What are your skin concerns?",
          "isRequired": true,
          "choices": [
            {
              "value": "1",
              "text": "Acne"
            },
            {
              "value": "32",
              "text": "Large Pores"
            },
            {
              "value": "16",
              "text": "Hyperpigmentation"
            },
            {
              "value": "8",
              "text": "Redness"
            },
            {
              "value": "2",
              "text": "Aging/Wrinkles"
            },
            {
              "value": "4",
              "text": "Dryness"
            }
          ]
        }
      ]
    }
  ],
  "showPageTitles": false,
  "showCompletedPage": false,
  "navigateToUrlOnCondition": [
    {
      "url": "https://localhost500"
    }
  ]
}