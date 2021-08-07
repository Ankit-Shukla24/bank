'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
   movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
    movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

accounts.forEach((mov) => {

  mov.UserName = mov.owner.toLowerCase().split(" ").map(function (mov1) {
    return mov1[0];
  }).join("");
  console.log(mov.UserName);
})

let timer;

const timeinter = function() {
  
  const timerint = function ()
{
  let mins = String(Math.trunc(Number(time / 60)));
  let secs = String(time % 60);

  labelTimer.textContent= `${mins.padStart(2,0)}:${secs.padStart(2, 0)}`;
  
    if (time === 0)
    {
      labelWelcome.textContent = "Login to get started";
      containerApp.style.opacity = 0;
      clearInterval(timer)
      }
    
    time--;
  }
  let time = 300;

  timerint();

timer = setInterval(timerint,100);

  return timer;
  
}

// console.log(accounts);

const displayApp = function (accmov) {

  containerApp.style.opacity = 1;

  document.querySelector(".movements").innerHTML = "";
  labelDate.textContent = dateformat(new Date(2037,3,27));
  const inserthtml = accmov.forEach(function (mov, i) {
    let situation;
    if (mov > 0)
      situation = "deposit";
    else
      situation = "withdrawal";

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${situation}">${i} ${situation}</div>
          
          <div class="movements__value">${mov}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  })

timeinter();

  labelSumIn.textContent = `${accmov.filter(mov => mov > 0).reduce((mov, arr) => mov + arr, 0)} 💰`;
  labelSumOut.textContent = `${Math.abs(accmov.filter(mov => mov < 0).reduce((mov, arr) => mov + arr, 0))} 💰`;
  labelSumInterest.textContent = `${(Math.abs(accmov.filter(mov => mov > 0).reduce((arr, mov) => mov*(CurrentAcc.interestRate)/100 + arr, 0))).toFixed(2)} 💰`;

  labelBalance.textContent = `${Math.abs(accmov.reduce((mov, arr) => mov + arr, 0))} 💰`;

}

const dateformat = function (date) {
  const option = {
    hour: "numeric",
    day: "numeric",
    year: "numeric",
    month:"long",
    minutes: "numeric",
    weekday: "long",
  };

  const locale = navigator.language;

  return Intl.DateTimeFormat(locale, option).format(date);
}
let CurrentAcc=account1;
// displayApp(account1.movements);
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  let InputUser = inputLoginUsername.value;
  let InputPass = inputLoginPin.value;

  CurrentAcc = (accounts.find(function (acc) {
    return acc.UserName === InputUser;
  }))
inputLoginPin.value = "";
  inputLoginUsername.value = "";
  inputLoginPin.blur();
  if (CurrentAcc ?.pin === (Number)(InputPass)) {

    labelWelcome.textContent = `Welcome back ${CurrentAcc.owner.split(" ")[0]}`;
    displayApp(CurrentAcc.movements);
  }
})





let scount = 0;
btnSort.addEventListener("click", function (e) {
  scount++;
  if (Number(scount%2)===1) {
   const movsort= CurrentAcc.movements.slice().sort((a, b) => {
      if (a > b) return 1;
      if (b > a) return -1;
    }
    )
    console.log();
    displayApp(movsort);
  }
  else
  {
    displayApp(CurrentAcc.movements);
    }
}
);

btnTransfer.addEventListener("click", function (e) {
 
  e.preventDefault();

  const TransferName = inputTransferTo.value;
  const TransferAmouont = inputTransferAmount.value;

  if (TransferAmouont > 0&&TransferName!=CurrentAcc.UserName) {
    const usertrans = accounts.find(acc => 
     
      acc.UserName === TransferName
    )
  
    if (usertrans?.movements.reduce((arr, mov) => arr + mov, 0) > TransferAmouont) {
      CurrentAcc.movements.push(-1 * Number(TransferAmouont));
      usertrans.movements.push(Number(TransferAmouont));
   
      displayApp(CurrentAcc.movements);
    }
  }
  inputTransferTo.value = "";
  inputTransferAmount.value = "";
  clearInterval(timer);
  timeinter();
  inputTransferAmount.blur();
}
)

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  let InputUser = inputCloseUsername.value;
  let InputPass = inputClosePin.value;

inputClosePin.value = "";
  inputCloseUsername.value = "";
  inputLoginPin.blur();
  if (InputUser === CurrentAcc.UserName && Number(InputPass) === Number(CurrentAcc.pin)) {
    const index = accounts.findIndex(function (acc) {
      return acc.UserName === InputUser;
    })
    console.log(index);
    containerApp.style.opacity = 0;
    accounts.splice(index, 1);

    console.log(accounts);

  }
})

btnLoan.addEventListener("click", function (e)
{
  e.preventDefault();
  setTimeout(() => {
    if (Number(parseInt(labelSumIn.textContent)) / 10 > inputLoanAmount.value) {
      console.log(inputLoanAmount.value);
      const Loanamt = Number(inputLoanAmount.value);
      CurrentAcc.movements.push(Loanamt);
      console.log(CurrentAcc.movements);
      displayApp(CurrentAcc.movements);
    }
  }, 5000);

  clearInterval(timer);
  timeinter();

  inputLoanAmount.value = "";
  // if (Number(parseInt(labelSumIn.textContent))/10 > inputLoanAmount.value)

})
