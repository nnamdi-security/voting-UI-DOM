// =========================================================
// PART 1: Your instructor's logic — modified slightly so:
//   1) voters are NOT hard-coded (just an editable array)
//   2) candidates can be more than two (just an editable array)
//
// The main change: instead of a fixed union type like
// 'Augustine' | 'Kosisochukwu', we now just use "string".
// This means TypeScript no longer locks us to exact names,
// so any list of voters/candidates works.
// =========================================================

type TCandidate = string;
type TVoters = string;

// 👉 Add or remove names here — the UI will update automatically.
const candidates: TCandidate[] = ["Augustine", "Kosisochukwu", "Chinedu"];

// 👉 Add or remove voters here — the UI will update automatically.
const voters: TVoters[] = [
  "Stephanie", "Rita", "James", "Peter", "Victor", "Anthony", "Charles",
  "Augustine", "Lillian", "Gabriel", "Christopher", "Kosisochukwu",
  "Bonaventure", "Abigail", "David", "Amarachi", "Loveth", "Chidimma",
  "Ifeanyi", "Majesty",
];

type TPoll = Record<TCandidate, number>;

interface Result {
  total: number;
  winner?: TCandidate;
  poll: TPoll;
}

// Start every candidate's vote count at 0.
const startingPoll: TPoll = {};
candidates.forEach((c) => (startingPoll[c] = 0));

const result: Result = {
  total: 0,
  poll: startingPoll,
};

// Keeps track of who has already voted, and who they voted for.
// (In the original code this was pre-filled. In a real voting UI,
// it should start empty and fill up as people actually vote.)
const votingRecord: Record<TVoters, TCandidate> = {};

const hasVoted = (voter: TVoters): boolean => voter in votingRecord;

// Cast one vote. Returns true if the vote was accepted,
// false if that voter already voted.
const vote = (voter: TVoters, candidate: TCandidate): boolean => {
  if (hasVoted(voter)) {
    return false;
  }
  votingRecord[voter] = candidate;
  result.poll[candidate] = (result.poll[candidate] ?? 0) + 1;
  result.total += 1;
  return true;
};

// Works out the winner (the candidate with the most votes)
// and returns the full result object.
const getResult = (): Result => {
  let winner: TCandidate | undefined;
  let highestVotes = -1;

  for (const candidate of candidates) {
    const votes = result.poll[candidate] ?? 0;
    if (votes > highestVotes) {
      highestVotes = votes;
      winner = candidate;
    }
  }

  result.winner = winner;
  return result;
};

// =========================================================
// PART 2: DOM logic — connects the HTML page to the logic above
// =========================================================

// Grab all the elements we need, once, at the top.
const voterSelect = document.getElementById("voter-select") as HTMLSelectElement;
const candidateSelect = document.getElementById("candidate-select") as HTMLSelectElement;
const castVoteBtn = document.getElementById("cast-vote-btn") as HTMLButtonElement;
const showResultBtn = document.getElementById("show-result-btn") as HTMLButtonElement;
const messageEl = document.getElementById("message") as HTMLParagraphElement;
const resultSection = document.getElementById("result") as HTMLElement;
const resultList = document.getElementById("result-list") as HTMLUListElement;
const resultWinnerEl = document.getElementById("result-winner") as HTMLParagraphElement;

// --- Populate the voters dropdown ---
function populateVoters() {
  voters.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    voterSelect.appendChild(option);
  });
}

// --- Populate the candidates dropdown ---
function populateCandidates() {
  candidates.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    candidateSelect.appendChild(option);
  });
}

// --- Show a short message under the buttons ---
function showMessage(text: string, isError: boolean) {
  messageEl.textContent = text;
  messageEl.className = isError
    ? "mt-4 text-sm font-medium text-red-600"
    : "mt-4 text-sm font-medium text-green-600";
}

// --- Handle "Cast Vote" click ---
function handleCastVote() {
  const selectedVoter = voterSelect.value;
  const selectedCandidate = candidateSelect.value;

  const success = vote(selectedVoter, selectedCandidate);

  if (success) {
    showMessage(`Vote cast! ${selectedVoter} voted for ${selectedCandidate}.`, false);
  } else {
    showMessage(`${selectedVoter} has already voted.`, true);
  }
}

// --- Handle "Show Result" click ---
function handleShowResult() {
  const current = getResult();

  // Clear old list items before adding fresh ones.
  resultList.innerHTML = "";

  candidates.forEach((candidate) => {
    const li = document.createElement("li");
    li.textContent = `${candidate}: ${current.poll[candidate] ?? 0} vote(s)`;
    resultList.appendChild(li);
  });

  resultWinnerEl.textContent = current.total === 0
    ? "No votes cast yet."
    : `Leading: ${current.winner} (Total votes: ${current.total})`;

  resultSection.classList.remove("hidden");
}

// --- Wire everything up when the page loads ---
populateVoters();
populateCandidates();
castVoteBtn.addEventListener("click", handleCastVote);
showResultBtn.addEventListener("click", handleShowResult);
