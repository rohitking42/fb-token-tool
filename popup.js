document.getElementById('getTokenBtn').addEventListener('click', async () => {
    const statusDiv = document.getElementById('status');
    const resultBox = document.getElementById('tokenResult');

    statusDiv.innerText = "Finding Token... Please wait...";
    resultBox.value = "";

    try {
        // Step 1: Get the EAAB Token from Ads Manager
        const response = await fetch('https://adsmanager.facebook.com/adsmanager/manage/campaigns', {
            method: 'GET',
            headers: {
                'User-Agent': navigator.userAgent
            }
        });

        const text = await response.text();
        
        // Regex to find EAAB token
        const eaabMatch = text.match(/EAAB\w+/);
        
        if (eaabMatch) {
            statusDiv.innerText = "Success! Token Found.";
            statusDiv.style.color = "green";
            resultBox.value = eaabMatch[0];
            // Auto copy to clipboard
            navigator.clipboard.writeText(eaabMatch[0]);
            statusDiv.innerText += " (Copied!)";
        } else {
            // If EAAB fails, try getting EAAAA token
            statusDiv.innerText = "EAAB not found, trying EAAAA...";
            
            // Checking basic composer page for EAAAA
            const composerRes = await fetch('https://business.facebook.com/content_management', {
                 method: 'GET'
            });
            const composerText = await composerRes.text();
            const eaaaaMatch = composerText.match(/EAAAA\w+/);

            if(eaaaaMatch) {
                statusDiv.innerText = "Success! EAAAA Found.";
                statusDiv.style.color = "green";
                resultBox.value = eaaaaMatch[0];
            } else {
                throw new Error("Token not found inside source.");
            }
        }

    } catch (error) {
        statusDiv.innerText = "Error: Please login to Facebook first!";
        statusDiv.style.color = "red";
        console.error(error);
    }
});
  document.getElementById('statusMsg').innerText = "Copied to clipboard!";
});
