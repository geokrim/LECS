        function startTimer() {

            let timeRemaining = initialTime;
            //timerElement.textContent = timeRemaining;

            // Clear any existing timer to prevent multiple timers running
            if (countdown) clearInterval(countdown);

            countdown = setInterval(() => {
                timeRemaining--;
                // timerElement.textContent = timeRemaining;
                    // console.log('Time remaining: ' + timeRemaining + ' seconds');
                    // You can update a visible timer element here if needed
                if (timeRemaining <= 0) {
                    clearInterval(countdown);
                    window.location.href = 'index.html'; // Redirect when time runs out
                }
            }, 1000); // Update every second
        }