
let cardsDiv = document.querySelector('.cards');

// creating the header
const headerDiv = document.querySelector('.header');
let headerP = document.createElement('h1');
headerP.textContent = "Git-Hub Profile Details";
headerDiv.appendChild(headerP);
// header created

// creating the input Div
const inputDiv = document.querySelector('.input');

let inputLabel = document.createElement('p');
inputLabel.textContent = "ENTER THE USERNAME";
inputDiv.appendChild(inputLabel);

let inputField = document.createElement('input');
inputField.setAttribute('type',"text");
inputDiv.appendChild(inputField);

let inputButton = document.createElement('button');
inputButton.textContent = "submit";
inputDiv.appendChild(inputButton);
inputButton.addEventListener('click', event => {
  const userName = inputField.value;
  axios.get(`https://api.github.com/users/${userName}`).then((result) => {
    if (cardsDiv.hasChildNodes()) {
      cardsDiv.removeChild(cardsDiv.firstElementChild);
    }
    let newCard = cardCreator(result);
    cardsDiv.appendChild(newCard);
  }).catch( (e) => {
    if(userName == ""){
      alert(`no input given`);
    } else {
    alert(`No user found with user name: ${userName}`);}
  });

});

// input Div created


function cardCreator(cardData) {
  let cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  let cardImg = document.createElement('img');
  cardImg.setAttribute('src', cardData.data.avatar_url);
  cardDiv.appendChild(cardImg);

  let cardInfoDiv = document.createElement('div');
  cardInfoDiv.classList.add('card-info');

  let cardName = document.createElement('h3');
  cardName.classList.add('name');
  cardName.textContent = cardData.data.login;
  cardInfoDiv.appendChild(cardName);
 
  let cardUserName = document.createElement('p');
  cardUserName.classList.add('username');
  cardUserName.textContent = cardData.data.name;
  cardInfoDiv.appendChild(cardUserName);

  let cardLocation = document.createElement('p');
  cardLocation.textContent = `Location:  ${cardData.data.location}`;
  cardInfoDiv.appendChild(cardLocation);

  let cardProfile = document.createElement('p'); 
  cardProfile.textContent = "Profile: ";                                    
  
  let cardProfileAddress = document.createElement('a');
  cardProfileAddress.setAttribute('href', cardData.data.html_url);
  cardProfileAddress.textContent = cardData.data.html_url;
  cardProfile.appendChild(cardProfileAddress);

  cardInfoDiv.appendChild(cardProfile);

  let cardFollowers = document.createElement('p');
  cardFollowers.textContent = `Followers:  ${cardData.data.followers}`;
  cardInfoDiv.appendChild(cardFollowers);

  let cardFollowing = document.createElement('p');
  cardFollowing.textContent = `Following:  ${cardData.data.following}`;
  cardInfoDiv.appendChild(cardFollowing);

  let cardBio = document.createElement('p');
  cardBio.textContent = `Bio:  ${cardData.data.bio}`;
  cardInfoDiv.appendChild(cardBio);

  cardDiv.appendChild(cardInfoDiv);
  // console.log(cardDiv);
  return cardDiv;

}

