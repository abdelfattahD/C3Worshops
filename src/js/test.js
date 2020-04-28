

       
// Switch btw Arabic & Francais
            let btn_1 = document.querySelector("#btn_1");
            let preamble = document.querySelector("#preambule");
            let quest1 = document.querySelector("#question_1");
            
          btn_1.addEventListener("click", function () {
           preamble.style.display = "none";
          quest1.style.display = "block";
          document.querySelector(".active1").style.background = "gold";

        });

// questions

        (function() {
  var questions = [{
    question: " Quel est votre âge ? Ceci, afin de calculer un facteur de risque spécifique",
    choices: ["age"],
    type : 1,
    
  },{
    question: " Pensez-vous avoir ou avoir eu de la fièvre ces derniers jours (frissons, sueurs) ? ",
    choices: [""],
    type :3,
  }, {
    question: "Que pensez-vous de votre corps?",
    choices: ["fatigue", "Bien"," trop fatgue" ,"moyen"],
    type : 2,
  }, {
    question: "Ces dernières 48 heures, quelle a été votre température la plus élevée ?",
    choices: ["degrée"],
    type : 1,
  }, {
    question: "Ces derniers jours, avez-vous une toux ou une augmentation de votre toux habituelle ?",
    choices: [""],
    type : 3,
  }, {
    question: "Ces derniers jours, avez-vous noté une forte diminution ou perte de votre goût ou de votre odorat ?",
    choices: [""],
    type : 3,
  }, {
    question: "Ces derniers jours, avez-vous eu un mal de gorge et/ou des douleurs musculaires et/ou des courbatures inhabituelles ?",
    choices: [""],
    type : 3,
  }, {
    question: "Ces dernières 24 heures, avez-vous de la diarrhée ? Avec au moins 3 selles molles.",
    choices: [""],
    type : 3,
  }, {
    question: "Ces derniers jours, avez-vous une fatigue inhabituelle ?",
    choices: [""],
    type : 3,
  }, {
    question: "Cette fatigue vous oblige-t-elle à vous reposer plus de la moitié de la journée ?",
    choices: [""],
    type : 3,
  }, {
    question: "Depuis 24 heures ou plus, êtes-vous dans l'impossibilité de vous alimenter ou de boire ?",
    choices: [""],
    type : 3,
  }, {
    question: "Ces dernières 24 heures, avez-vous noté un manque de souffle inhabituel lorsque vous parlez ou faites un petit effort ?",
    choices: [""],
    type : 3,
  }, {
    question: "Quel est votre taille ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.",
    choices: ["cm"],
    type : 1,
  }, {
    question: "Quel est votre poids ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.",
    choices: ["kg"],
    type : 1,
  }, {
    question: "Avez-vous de l’hypertension artérielle mal équilibrée ? Ou avez-vous une maladie cardiaque ou vasculaire ?",
    choices: [""],
    type : 3,
  }, {
    question: "Êtes-vous diabétique ?",
    choices: [""],
    type : 3,
  }, {
    question: "Avez-vous ou avez-vous eu un cancer ces trois dernières années ?",
    choices: [""],
    type : 3,
  },  {
    question: "Avez-vous une maladie respiratoire ? Ou êtes-vous suivi par un pneumologue ?`",
    choices: [""],
    type : 3,
  },  {
    question: "Avez-vous une insuffisance rénale chronique dialysée ?",
    choices: [""],
    type : 3,
  },{
    question: "Avez-vous une maladie chronique du foie ?",
    choices: [""],
    type : 3,
  },{
    question: "Êtes-vous enceinte ?",
    choices: [""],
    type : 3,
  }, ];


  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();

 
  function displayScore() {

    var score = $('<p>',{id: 'question'});
    
    
    
        score.append(' Prenez contact avec votre médecin généraliste au moindre doute. Cette application n’est pour l’instant pas adaptée aux personnes de moins de 15 ans. En cas d’urgence, appeler le 15.');
        return score;

}
  
  // Click handler for the 'next' button
  $('.btn2_next').on('click', function (e) {
    e.preventDefault();

    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {

        if (selections[0] <=15){  
            questionCounter = 21;}
            else{
                questionCounter++;
            }
      
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('.btn-return').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');

      if(questions[index].type=== 1){
        input = '<input type="number" name="answer" value=' + i + ' />';
        } else if (questions[index].type=== 3){

            questions[index].choices= ["oui", "non"],
            input = '<input type="radio" name="answer" value=' + i + ' />';
        }
        else{
          
            input = '<input type="radio" name="answer" value=' + i + ' />';
        }
        

     
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);

      
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {

if(questions[questionCounter].type=== 1){
        selections[questionCounter] = +$('input[name="answer"]').val();
        } else {
          
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
        }

        console.table(selections);
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
    
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true );
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('.btn-return').show(); 
          $('.consei').hide();
        } else if(questionCounter === 0){
            $('.consei').show();
          $('.btn-return').hide();
          $('.btn2_next').show();
          $('#start').hide();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('.btn2_next').hide();
        $('.btn-return').hide();
        $('#start').show();
        $('.consei').hide();
     
     
      }

      // Controls display of 'age' input
      if(questionCounter === 2){
          $('.age').show();
        } else {
          
          $('.age').hide();
        }


    });
  }

  

  
  // Computes score and returns a paragraph element to be displayed
  
})();


       
        ;
       
