document.getElementById('btn').addEventListener('click', async () => {
    const status = document.getElementById('status');
    const resultBox = document.getElementById('result');
    
    status.innerText = "Searching for Token... Please wait...";
    resultBox.value = "";

    try {
        // 1. Pehle EAAAA (Ads Manager) Token try karega
        let response = await fetch('https://adsmanager.facebook.com/adsmanager/manage/campaigns?breakdown=ad_image&business_id=');
        let text = await response.text();
        
        // Regex se token dhundna
        let tokenMatch = text.match(/window\.__accessToken="([a-zA-Z0-9]+)"/);
        
        if (!tokenMatch) {
            // 2. Agar upar wala fail hua, to EAAB (Business) try karega
            response = await fetch('https://business.facebook.com/business_locations');
            text = await response.text();
            tokenMatch = text.match(/(\"access_token\"\:\"EAAB\w+\")/);
            
            if (tokenMatch) {
                // EAAB thoda alag tarike se clean karna padta hai
                let cleanToken = tokenMatch[0].replace('"access_token":"', '').replace('"', '');
                resultBox.value = cleanToken;
                status.innerText = "✅ EAAB Token Found!";
                return;
            }
        } else {
            // EAAAA Mil gaya
            resultBox.value = tokenMatch[1];
            status.innerText = "✅ EAAAA Token Found!";
            return;
        }

        // Agar dono fail ho gaye
        status.innerText = "❌ Failed! Make sure you are logged in.";
        resultBox.value = "Token not found. Please login to Facebook in this browser and try again.";

    } catch (err) {
        status.innerText = "❌ Error: " + err.message;
    }
});
