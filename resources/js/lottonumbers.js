     const numberGrid = document.getElementById('numberGrid');
        const selectedNumbersOutput = document.getElementById('selectedNumbersOutput');
        const clearSelectionButton = document.getElementById('clearSelection');
        const playNowButton = document.getElementById('playNow');

        const customModal = document.getElementById('customModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const closeModalBtn = customModal.querySelector('.close-modal-btn');

        let selectedNumbers = [];
        const MAX_SELECTIONS = 6; // Maximum numbers a user can select

        // Function to show custom modal
        function showCustomModal(title, message) {
            modalTitle.textContent = title;
            modalMessage.textContent = message;
            customModal.style.display = 'flex'; // Use flex to center
        }

        // Function to hide custom modal
        function hideCustomModal() {
            customModal.style.display = 'none';
        }

        // Event listener for closing the modal
        closeModalBtn.addEventListener('click', hideCustomModal);

        // Generate number buttons (1 to 90)
        for (let i = 1; i <= 90; i++) {
            const button = document.createElement('div');
            button.classList.add('number-button');
            button.textContent = i;
            button.dataset.number = i; // Store the number as a data attribute

            button.addEventListener('click', () => {
                const number = parseInt(button.dataset.number);
                const index = selectedNumbers.indexOf(number);

                if (index === -1) {
                    // Number not selected, add it if not at max
                    if (selectedNumbers.length < MAX_SELECTIONS) {
                        selectedNumbers.push(number);
                        button.classList.add('selected');
                    } else {
                        showCustomModal('Selection Limit Reached', `You can only select up to ${MAX_SELECTIONS} numbers.`);
                    }
                } else {
                    // Number already selected, remove it
                    selectedNumbers.splice(index, 1);
                    button.classList.remove('selected');
                }
                updateSelectedNumbersDisplay();
            });
            numberGrid.appendChild(button);
        }

        // Update the display of selected numbers
        function updateSelectedNumbersDisplay() {
            if (selectedNumbers.length === 0) {
                selectedNumbersOutput.innerHTML = '<span class="text-muted">No numbers selected yet.</span>';
            } else {
                // Sort numbers for better readability
                const sortedNumbers = [...selectedNumbers].sort((a, b) => a - b);
                selectedNumbersOutput.innerHTML = sortedNumbers.map(num =>
                    `<span class="selected-number-badge">${num}</span>`
                ).join('');
            }
        }

        // Clear all selected numbers
        clearSelectionButton.addEventListener('click', () => {
            selectedNumbers.forEach(num => {
                const button = document.querySelector(`.number-button[data-number="${num}"]`);
                if (button) {
                    button.classList.remove('selected');
                }
            });
            selectedNumbers = [];
            updateSelectedNumbersDisplay();
            showCustomModal('Selection Cleared', 'All your selected numbers have been cleared.');
        });

        // Handle Play Now button click
        playNowButton.addEventListener('click', () => {
            if (selectedNumbers.length === 0) {
                showCustomModal('No Numbers Selected', 'Please select at least one number to play.');
            } else {
                const sortedNumbers = [...selectedNumbers].sort((a, b) => a - b);
                showCustomModal('Ready to Play!', `You have selected: ${sortedNumbers.join(', ')}. Good luck!`);
                // Here you would typically send the selected numbers to a backend
                console.log('Numbers submitted:', sortedNumbers);
            }
        });

        // Initial display update
        updateSelectedNumbersDisplay();