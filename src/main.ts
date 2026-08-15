// main.ts

// ============================================
// DATA DEFINITIONS - Easy to modify
// ============================================

// Define candidates - you can add or remove any name
const candidates: string[] = ['Augustine', 'Kosisochukwu'];

// Define voters - you can add or remove any name
const voters: string[] = [
  'Stephanie',
  'Rita',
  'James',
  'Peter',
  'Victor',
  'Anthony',
  'Charles',
  'Augustine',
  'Lillian',
  'Gabriel',
  'Christopher',
  'Kosisochukwu',
  'Bonaventure',
  'Abigail',
  'David',
  'Amarachi',
  'Loveth',
  'Chidimma',
  'Ifeanyi',
  'Majesty',
];

// ============================================
// VOTING STATE
// ============================================

// Track who has voted (to prevent multiple votes)
const votedVoters: Set<string> = new Set();

// Track votes for each candidate
const poll: Record<string, number> = {};
candidates.forEach(candidate => {
  poll[candidate] = 0;
});

// Track total votes and winner
const result = {
  total: 0,
  winner: undefined as string | undefined,
  poll: poll
};

// ============================================
// DOM REFERENCES - Get HTML elements
// ============================================

const voterSelect = document.getElementById('voterSelect') as HTMLSelectElement;
const candidateSelect = document.getElementById('candidateSelect') as HTMLSelectElement;
const castVoteBtn = document.getElementById('castVoteBtn') as HTMLButtonElement;
const showResultBtn = document.getElementById('showResultBtn') as HTMLButtonElement;
const resultModal = document.getElementById('resultModal') as HTMLDivElement;
const closeModalBtn = document.getElementById('closeModalBtn') as HTMLButtonElement;
const resultContent = document.getElementById('resultContent') as HTMLDivElement;

// ============================================
// POPULATE DROPDOWNS
// ============================================

// Populate voters dropdown
voters.forEach(voter => {
  const option = document.createElement('option');
  option.value = voter;
  option.textContent = voter;
  voterSelect.appendChild(option);
});

// Populate candidates dropdown
candidates.forEach(candidate => {
  const option = document.createElement('option');
  option.value = candidate;
  option.textContent = candidate;
  candidateSelect.appendChild(option);
});

// ============================================
// VOTING LOGIC
// ============================================

/**
 * Cast a vote for the selected voter and candidate
 */
function castVote(): void {
  const selectedVoter = voterSelect.value;
  const selectedCandidate = candidateSelect.value;

  // Validation checks
  if (!selectedVoter) {
    alert('Please select a voter.');
    return;
  }

  if (!selectedCandidate) {
    alert('Please select a candidate.');
    return;
  }

  // Check if voter has already voted
  if (votedVoters.has(selectedVoter)) {
    alert(`${selectedVoter} has already voted!`);
    return;
  }

  // Record the vote
  votedVoters.add(selectedVoter);
  result.poll[selectedCandidate] = (result.poll[selectedCandidate] || 0) + 1;
  result.total += 1;

  // Show success message
  alert(`Vote cast successfully! ${selectedVoter} voted for ${selectedCandidate}`);
  
  // Optional: Disable the voter after voting (in case you want to prevent double voting)
  // voterSelect.disabled = true;
}

/**
 * Calculate and display the election results
 */
function showResults(): void {
  // Calculate the winner
  let maxVotes = 0;
  let winnerName = 'No winner yet';
  let resultHTML = '<div class="space-y-4">';

  // Show each candidate's votes
  candidates.forEach(candidate => {
    const votes = result.poll[candidate] || 0;
    resultHTML += `
      <div class="flex justify-between items-center border-b pb-2">
        <span class="font-medium">${candidate}</span>
        <span class="bg-blue-100 px-3 py-1 rounded-full">${votes} vote${votes !== 1 ? 's' : ''}</span>
      </div>
    `;
    
    // Track the winner
    if (votes > maxVotes) {
      maxVotes = votes;
      winnerName = candidate;
    }
  });

  // Add total votes and winner
  resultHTML += `
    <div class="mt-4 pt-4 border-t-2 border-gray-300">
      <div class="flex justify-between items-center">
        <span class="font-bold">Total Votes:</span>
        <span class="font-bold">${result.total}</span>
      </div>
      <div class="flex justify-between items-center mt-2 text-green-600">
        <span class="font-bold text-lg">🏆 Winner:</span>
        <span class="font-bold text-lg">${winnerName} (${maxVotes} votes)</span>
      </div>
    </div>
  `;

  resultHTML += '</div>';
  resultContent.innerHTML = resultHTML;
  
  // Show the modal
  resultModal.classList.remove('hidden');
  resultModal.classList.add('flex');
}

// ============================================
// EVENT LISTENERS
// ============================================

// Cast vote button click handler
castVoteBtn.addEventListener('click', castVote);

// Show result button click handler
showResultBtn.addEventListener('click', showResults);

// Close modal button click handler
closeModalBtn.addEventListener('click', () => {
  resultModal.classList.add('hidden');
  resultModal.classList.remove('flex');
});

// Close modal when clicking outside the modal content
resultModal.addEventListener('click', (event) => {
  if (event.target === resultModal) {
    resultModal.classList.add('hidden');
    resultModal.classList.remove('flex');
  }
});

// ============================================
// INITIAL AUTO-VOTE (Optional - remove if not needed)
// ============================================

// If you want to keep the original automatic voting behavior, uncomment below:
// voters.forEach(voter => {
//   // You need to assign votes to candidates somehow
// });