document.getElementById('submit-btn').addEventListener('click', async (e) => {
    e.preventDefault();

    const context = document.getElementById('context').value;
    const imagesInput = document.getElementById('images');
    const files = imagesInput.files;

    // Check if any files are chosen
    if (files.length === 0) {
        alert('Please choose at least one file before submitting.');
        return;
    }

    const formData = new FormData();
    formData.append('context', context);
    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }

    try {
        const response = await fetch('/describe-testing', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to process the request.');
        }

        const data = await response.json();
        const resultBox = document.getElementById('result-box');

        if (data.generated_text && data.generated_text[0].generated_text) {
            resultBox.innerText = data.generated_text[0].generated_text;
        } else {
            resultBox.innerText = 'No instructions generated.';
        }

        resultBox.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('Error processing the request. Please try again.');
    }
});
