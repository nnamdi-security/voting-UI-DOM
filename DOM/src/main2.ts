// --------------------------------------
// TYPES
// --------------------------------------

// A candidate is simply a string.
// This allows us to have more than two candidates.
type TCandidate = string;


// A voter is also a string.
type TVoter = string;


// The poll keeps track of the number of votes
// received by each candidate.
type TPoll = Record<TCandidate, number>;


// --------------------------------------
// DATA
// --------------------------------------

// Candidates are no longer restricted to two people.
// You can add as many candidates as you want.
const candidates: TCandidate[] = [
  "Augustine",
  "Kosisochukwu",
  "Chidimma",
  "Ifeanyi"
];


// Voters are stored in an array.
// They are no longer hard-coded into the HTML.
const voters: TVoter[] = [
  "Stephanie",
  "Rita",
  "James",
  "Peter",
  "Victor",
  "Anthony",
  "Charles",
  "Augustine",
  "Lillian",
  "Gabriel",
  "Christopher",
  "Kosisochukwu",
  "Bonaventure",
  "Abigail",
  "David",
  "Amarachi",
  "Loveth",
  "Chidimma",
  "Ifeanyi",
  "Majesty"
];


// --------------------------------------
// POLL
// --------------------------------------

// This object will contain the number of votes
// received by each candidate.
const poll: TPoll = {};


// Give every candidate an initial vote count of 0.
candidates.forEach((candidate) => {
  poll[candidate] = 0;
});


// Total number of votes
let voteCount: number = 0;


// --------------------------------------
// DOM ELEMENTS
// --------------------------------------

// Get the voter dropdown from the HTML.
const voterSelect = document.querySelector(
  "#voter"
) as HTMLSelectElement;


// Get the candidate dropdown.
const candidateSelect = document.querySelector(
  "#candidate"
) as HTMLSelectElement;


// Get the Cast Vote button.
const castVoteButton = document.querySelector(
  "#castVote"
) as HTMLButtonElement;


// Get the Show Result button.
const showResultButton = document.querySelector(
  "#showResult"
) as HTMLButtonElement;


// Get the result container.
const resultDiv = document.querySelector(
  "#result"
) as HTMLDivElement;


// --------------------------------------
// POPULATE VOTERS
// --------------------------------------

// Go through the voters array.
voters.forEach((voter) => {

  // Create an option element.
  const option = document.createElement("option");

  // Put the voter's name inside the option.
  option.textContent = voter;

  // The value of the option is also the voter's name.
  option.value = voter;

  // Add the option to the voter dropdown.
  voterSelect.appendChild(option);
});


// --------------------------------------
// POPULATE CANDIDATES
// --------------------------------------

// Go through the candidates array.
candidates.forEach((candidate) => {

  // Create an option element.
  const option = document.createElement("option");

  // Put the candidate's name inside the option.
  option.textContent = candidate;

  // The value is the candidate's name.
  option.value = candidate;

  // Add the option to the candidate dropdown.
  candidateSelect.appendChild(option);
});


// --------------------------------------
// CAST VOTE
// --------------------------------------

const vote = (
  voter: TVoter,
  candidate: TCandidate
) => {

  // Display the selected voter in the console.
  console.log(`${voter} is voting for ${candidate}`);

  // Increase the candidate's vote count by 1.
  poll[candidate] = (poll[candidate] ?? 0) + 1;

  // Increase total vote count.
  voteCount++;

  // Display the current poll in the console.
  console.log(poll);
};


// --------------------------------------
// CAST VOTE BUTTON
// --------------------------------------

castVoteButton.addEventListener("click", () => {

  // Get the selected voter.
  const voter = voterSelect.value;

  // Get the selected candidate.
  const candidate = candidateSelect.value;


  // Make sure both have been selected.
  if (!voter || !candidate) {

    resultDiv.innerHTML = `
      <p class="text-red-600">
        Please select a voter and a candidate.
      </p>
    `;

    return;
  }


  // Cast the vote.
  vote(voter, candidate);


  // Tell the user that the vote was successfully cast.
  resultDiv.innerHTML = `
    <p class="text-green-600">
      ${voter}'s vote for ${candidate} has been recorded.
    </p>
  `;


  // Reset the dropdowns after voting.
  voterSelect.value = "";
  candidateSelect.value = "";
});


// --------------------------------------
// GET WINNER
// --------------------------------------

const getWinner = (): TCandidate | undefined => {

  // If there are no votes, there is no winner.
  if (voteCount === 0) {
    return undefined;
  }


  // Start by assuming the first candidate is the winner.
  let winner = candidates[0];


  // Compare every candidate's votes.
  candidates.forEach((candidate) => {

    if (poll[candidate] > poll[winner]) {
      winner = candidate;
    }

  });


  return winner;
};


// --------------------------------------
// SHOW RESULT
// --------------------------------------

showResultButton.addEventListener("click", () => {

  // Get the winner.
  const winner = getWinner();


  // If nobody has voted yet.
  if (!winner) {

    resultDiv.innerHTML = `
      <p class="text-gray-500">
        No votes have been cast yet.
      </p>
    `;

    return;
  }


  // Start building the result HTML.
  let resultHTML = `
    <p class="font-semibold mb-4">
      Total Votes: ${voteCount}
    </p>

    <div class="space-y-2">
  `;


  // Display each candidate and their votes.
  candidates.forEach((candidate) => {

    resultHTML += `
      <div class="flex justify-between border-b pb-2">
        <span>${candidate}</span>
        <span class="font-semibold">
          ${poll[candidate]} vote(s)
        </span>
      </div>
    `;

  });


  // Close the result container and display the winner.
  resultHTML += `
    </div>

    <p class="mt-5 text-lg font-bold">
      Winner: ${winner}
    </p>
  `;


  // Put the result into the page.
  resultDiv.innerHTML = resultHTML;

});