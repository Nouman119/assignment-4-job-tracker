 console.log("check All ok")

// Tab selection function
const tabs = document.querySelectorAll('.tab-btn');

// remove active class
function removeActiveClasses() {
    tabs.forEach(tab => {
        
        tab.classList.remove('bg-blue-600', 'text-white');
        tab.classList.add('text-slate-500', 'bg-transparent');
        tab.classList.add('hover:bg-slate-200', 'hover:text-slate-700');
    });
}

// event add
tabs.forEach(tab => {
    tab.addEventListener('click', function(event) {
        removeActiveClasses();
        
        tab.classList.add('bg-blue-600', 'text-white');
        tab.classList.remove('text-slate-500', 'bg-transparent','hover:bg-slate-200', 'hover:text-slate-700');
    });
});






const jobCards = document.querySelectorAll('.job-card'); 
const totalDisplay = document.getElementById('total-count');
const interviewDisplay = document.getElementById('interview-count');
const rejectedDisplay = document.getElementById('rejected-count');
const totalLabel = document.getElementById('job-total-label');
const tabButtons = document.querySelectorAll('.tab-btn');
const noJobsMessage = document.getElementById('no-jobs-message');

let totalCount = 8;
let interviewCount = 0;
let rejectedCount = 0;

// Update board number
function updateBoard() {
    totalDisplay.innerText = totalCount;
    interviewDisplay.innerText = interviewCount;
    rejectedDisplay.innerText = rejectedCount;
    totalLabel.innerText = totalCount + " jobs";
}

// empty tab check
function checkEmptyTab() {
    let visibleCards = 0;
    for (let i = 0; i < jobCards.length; i++) {
        if (jobCards[i].style.display === "block") {
            visibleCards = visibleCards + 1;
        }
    }
    if (visibleCards === 0) {
        noJobsMessage.classList.remove('hidden');
    } else {
        noJobsMessage.classList.add('hidden');
    }
}

// Card button
for (let i = 0; i < jobCards.length; i++) {
    const card = jobCards[i];
    const buttons = card.querySelectorAll('button');
    
    const deleteBtn = buttons[0]; 
    const interviewBtn = buttons[1];
    const rejectedBtn = buttons[2];

    // Interview
    interviewBtn.addEventListener('click', function() {
        if (!card.hasAttribute('data-status')) {
            card.setAttribute('data-status', 'interview');
            interviewCount++; totalCount--;
            card.style.display = "none";
            updateBoard(); checkEmptyTab();
        }
    });

    // Rejected
    rejectedBtn.addEventListener('click', function() {
        if (!card.hasAttribute('data-status')) {
            card.setAttribute('data-status', 'rejected');
            rejectedCount++; totalCount--;
            card.style.display = "none";
            updateBoard(); checkEmptyTab();
        }
    });

    // Delete
    deleteBtn.addEventListener('click', function() {
        const status = card.getAttribute('data-status');
        if (status === 'interview') {
            interviewCount--; totalCount++;
            card.removeAttribute('data-status');
            card.style.display = "none";
            updateBoard(); checkEmptyTab();
        } else if (status === 'rejected') {
            rejectedCount--; totalCount++;
            card.removeAttribute('data-status');
            card.style.display = "none";
            updateBoard(); checkEmptyTab();
        }
    });
}

// Tab filter
for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener('click', function() {
        
        const tabText = tabButtons[i].innerText.trim();

        for (let j = 0; j < jobCards.length; j++) {
           
            const status = jobCards[j].getAttribute('data-status');

            if (tabText === "All") {
                
                if (!status) {
                    jobCards[j].style.display = "block";
                } else {
                    jobCards[j].style.display = "none";
                }
            } 
            else if (tabText === "Interview") {
                
                if (status === "interview") {
                    jobCards[j].style.display = "block";
                } else {
                    jobCards[j].style.display = "none";
                }
            } 
            else if (tabText === "Rejected") {
                
                if (status === "rejected") {
                    jobCards[j].style.display = "block";
                } else {
                    jobCards[j].style.display = "none";
                }
            }
        }
        
        checkEmptyTab();
    });
}