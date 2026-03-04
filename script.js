console.log("Job Tracker Logic Loaded");

// Variable 
const jobCards = document.querySelectorAll('.job-card'); 
const totalDisplay = document.getElementById('total-count');
const interviewDisplay = document.getElementById('interview-count');
const rejectedDisplay = document.getElementById('rejected-count');
const totalLabel = document.getElementById('job-total-label'); 
const tabButtons = document.querySelectorAll('.tab-btn');
const noJobsMessage = document.getElementById('no-jobs-message');

// Data Variable
const TOTAL_FIXED = 8; 
let interviewCount = 0;
let rejectedCount = 0;

// Stat function
function updateDashboard() {
    totalDisplay.innerText = TOTAL_FIXED;
    interviewDisplay.innerText = interviewCount;
    rejectedDisplay.innerText = rejectedCount;
}

function updateCounterLabel(visibleCount) {
    totalLabel.innerText = visibleCount + " of " + TOTAL_FIXED + " jobs";
}

// Tab change 
function setActiveTabUI(clickedTab) {
    for (let i = 0; i < tabButtons.length; i++) {
        const btn = tabButtons[i];
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('text-slate-500', 'bg-transparent', 'hover:bg-slate-200', 'hover:text-slate-700');
    }
    clickedTab.classList.add('bg-blue-600', 'text-white');
    clickedTab.classList.remove('text-slate-500', 'bg-transparent', 'hover:bg-slate-200', 'hover:text-slate-700');
}

// Job Card Function
for (let i = 0; i < jobCards.length; i++) {
    const card = jobCards[i];
    const statusText = card.querySelector('.job-status-text');
    const buttons = card.querySelectorAll('button');
    
    const deleteBtn = buttons[0]; 
    const interviewBtn = buttons[1];
    const rejectedBtn = buttons[2];

    // Interview button function
    interviewBtn.addEventListener('click', function() {
        const currentStatus = card.getAttribute('data-status');
        if (currentStatus !== 'interview') {
            if (currentStatus === 'rejected') {
                rejectedCount = rejectedCount - 1;
            }
            card.setAttribute('data-status', 'interview');
            statusText.innerText = "INTERVIEWING";
            statusText.style.color = "#10b981"; 
            interviewCount = interviewCount + 1;
            updateDashboard();
        }
    });

    // Rejected button function 
    rejectedBtn.addEventListener('click', function() {
        const currentStatus = card.getAttribute('data-status');
        if (currentStatus !== 'rejected') {
            if (currentStatus === 'interview') {
                interviewCount = interviewCount - 1;
            }
            card.setAttribute('data-status', 'rejected');
            statusText.innerText = "REJECTED";
            statusText.style.color = "#f43f5e"; 
            rejectedCount = rejectedCount + 1;
            updateDashboard();
        }
    });

    // Deleting
    deleteBtn.addEventListener('click', function() {
        const activeTab = document.querySelector('.tab-btn.bg-blue-600').innerText.trim();
        const currentStatus = card.getAttribute('data-status');

        if (activeTab === "All") {
            alert("You cannot delete a job from the All list.");
        } else {
            if (currentStatus === 'interview') {
                interviewCount = interviewCount - 1;
            } else if (currentStatus === 'rejected') {
                rejectedCount = rejectedCount - 1;
            }
            
            // Card changes
            card.removeAttribute('data-status');
            card.style.display = "none";
            statusText.innerText = "NOT APPLIED";
            statusText.style.color = "#94a3b8"; 
            
            updateDashboard();
            
            document.querySelector('.tab-btn.bg-blue-600').click();
        }
    });
}

// Tab filter
for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener('click', function() {
        setActiveTabUI(tabButtons[i]);

        const tabText = tabButtons[i].innerText.trim();
        let visibleCount = 0;

        for (let j = 0; j < jobCards.length; j++) {
            const card = jobCards[j];
            const status = card.getAttribute('data-status');

            if (tabText === "All") {
                card.style.display = "block";
                visibleCount = visibleCount + 1;
            } else if (tabText === "Interview" && status === "interview") {
                card.style.display = "block";
                visibleCount = visibleCount + 1;
            } else if (tabText === "Rejected" && status === "rejected") {
                card.style.display = "block";
                visibleCount = visibleCount + 1;
            } else {
                card.style.display = "none";
            }
        }

        updateCounterLabel(visibleCount);

        // Empty tab
        if (visibleCount === 0) {
            noJobsMessage.classList.remove('hidden');
        } else {
            noJobsMessage.classList.add('hidden');
        }
    });
}