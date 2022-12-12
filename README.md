# Quiz Webpage

## About

This was an attempt to create a webpage that can change between different viewable sections with the usage of javascript to dynamically effect the page. 

When starting the quiz, the button hides all irrelevant information and changes viewable parts to only those that are needed for the quiz itself. A timer starts immediately. There are 2 ways for the quiz to end. `1) By answering all the questions that the quiz has` or `2) timer running out of time` Answering incorrectly reduces time left to complete the quiz. Questions are also randomly generated so the order of the quiz is never static. 

Upon finishing the quiz, all quiz related items are hidden and the user is presented with a score submission page where they can record their information down. The info is then saved inside local storage. 

This information can then be viewed on the main page through the Highscores Button. The button hides the main page and brings you to the score board which takes the  local history information and organizes is based on local storage values which is the quiz score participants get. Additionally there is a button to reset the scoreboard which just deletes all the values inside local storage.

Webpage URL: 
## Features

- js event listeners to dynamically change screen
- randomly generated questions based on static object
- timer that triggers events based on conditions
- usage of local storage to save and draw information


## Demo

Start Button that begins the quiz:


Quiz ending due to timer:


Quiz ending due to finishing all questions:


Username submission:


Highschores Page:


Clearing Local Storage/Records:
## License

[MIT](https://choosealicense.com/licenses/mit/)

