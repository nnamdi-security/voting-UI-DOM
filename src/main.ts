const candidates = [
    'Augustine',
    'Kosisochukwu',
] as const;

type TCandidate = typeof candidates[number];


const voters = [
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
] as const;

type TVoter = typeof voters[number];


type Tpoll =Record<TCandidate, TVoter>;

const poll = Object.fromEntries(candidates.map((candidate) => [candidate, 0])) as Tpoll

interface Result {
    total: number;
    poll: Tpoll;
}

const result: Result = {
    total: 0,
    poll,
};


const ballotForm =
    document.querySelector<HTMLFormElement>(
        '#ballot-form',
    );

const voterSelect =
    document.querySelector<HTMLSelectElement>(
        '#voter',
    );

const candidateSelect =
    document.querySelector<HTMLSelectElement>(
        '#candidate',
    );

const showResultsButton =
    document.querySelector<HTMLButtonElement>(
        '#show-results-button',
    );

const resultsPanel =
    document.querySelector<HTMLElement>(
        '#results-panel',
    );

const totalVotesElement =
    document.querySelector<HTMLElement>(
        '#total-votes',
    );

const candidateResultsElement =
    document.querySelector<HTMLElement>(
        '#candidate-results',
    );

const winnerMessage =
    document.querySelector<HTMLElement>(
        '#winner-message',
    );


const populateVoters = (): void => {
    voters.forEach((voter) => {
        const option =
            document.createElement('option');

        option.value = voter;
        option.textContent = voter;

        voterSelect.append(option);
    });
};

const populateCandidates = (): void => {
    candidates.forEach((candidate) => {
        const option =
            document.createElement('option');

        option.value = candidate;
        option.textContent = candidate;

        candidateSelect.append(option);
    });
};


const vote = (
    voter: TVoter,
    candidate: TCandidate,
): void => {
    console.log(
        `${voter} voted for ${candidate}`,
    );

    result.poll[candidate] += 1;

    result.total += 1;
};

const getWinner = (): TCandidate | undefined => {
    if (result.total === 0) {
        return undefined;
    }

    const sortedCandidates = (
        Object.entries(result.poll) as [
            TCandidate,
            number,
        ][]
    ).sort(
        (candidateA, candidateB) =>
            candidateB[1] - candidateA[1],
    );

    const firstCandidate =
        sortedCandidates[0];

    const secondCandidate =
        sortedCandidates[1];
    
     if (
        secondCandidate &&
        firstCandidate[1] === secondCandidate[1]
    ) {
        return undefined;
    }

    return firstCandidate[0];
};


const displayResult = (): void => {
    /*
     * Display total votes cast.
     */
    totalVotesElement.textContent =
        `${result.total} / ${voters.length}`;


    /*
     * Remove previously displayed candidate results.
     */
    candidateResultsElement.replaceChildren();


    /*
     * Display every candidate and their vote count.
     */
    Object.entries(result.poll).forEach(
        ([candidate, votes]) => {
            const article =
                document.createElement('article');

            article.className =
                'flex items-center justify-between gap-4 border-b border-slate-200 py-4';

            const candidateName =
                document.createElement('h3');

        candidateName.className =
                'font-semibold';

            candidateName.textContent =
                candidate;


            const voteCount =
                document.createElement('strong');

            voteCount.className =
                'text-sm';

            voteCount.textContent =
                `${votes} ${votes === 1 ? 'vote' : 'votes'}`;


            article.append(
                candidateName,
                voteCount,
            );

            candidateResultsElement.append(
                article,
            );
        },
    );

            const winner = getWinner();


                if (result.total === 0) {
                    winnerMessage.textContent =
                        'No votes have been cast yet.';

                    return;
                }


                if (!winner) {
                    winnerMessage.textContent =
                        'The election is currently tied.';

                    return;
                }


                    winnerMessage.textContent =
                        `${winner} is currently leading with ${result.poll[winner]} votes.`;
};



ballotForm.addEventListener(
    'submit',
    (event) => {
        /*
         * Stop the browser from reloading the page.
         */
        event.preventDefault();


        /*
         * Read the values selected in the form.
         */
        const voter =
            voterSelect.value as TVoter;

        const candidate =
            candidateSelect.value as TCandidate;


        /*
         * Cast the selected vote.
         */
        vote(
            voter,
            candidate,
             );


        /*
         * Update the result.
         */
        displayResult();


        /*
         * Reset the form after voting.
         */
        ballotForm.reset();
    },
);


showResultsButton.addEventListener(
    'click',
    () => {
        resultsPanel.hidden =
            !resultsPanel.hidden;
    },
);


/*
|--------------------------------------------------------------------------
| Start Application
|--------------------------------------------------------------------------
*/

populateVoters();

populateCandidates();

displayResult();