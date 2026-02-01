document.getElementById('getToken').addEventListener('click', () => {
  document.getElementById('statusMsg').innerText = "Finding token...";

  chrome.cookies.get({ url: "https://www.facebook.com", name: "xs" }, (cookie) => {
    if (!cookie) {
      document.getElementById('statusMsg').innerText = "Error: Please login to Facebook first!";
      return;
    }

    // Ads Manager URL se token nikalne ka try krte hain
    fetch('https://adsmanager.facebook.com/adsmanager/manage/campaigns', {
        method: 'GET',
    })
    .then(response => response.text())
    .then(text => {
        // EAAB Token dhundho (regex se)
        const match = text.match(/window\.local_access_token\s*=\s*"([^"]+)"/) ||
                      text.match(/\"accessToken\":\"(EAAB[^\"]+)\"/);

        if (match && match[1]) {
            document.getElementById('tokenBox').value = match[1];
            document.getElementById('statusMsg').innerText = "Success! Token Found.";
        } else {
            document.getElementById('statusMsg').innerText = "Token not found. Try refreshing FB page.";
        }
    })
    .catch(err => {
        document.getElementById('statusMsg').innerText = "Network Error. Check internet.";
    });
  });
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const tokenBox = document.getElementById('tokenBox');
  tokenBox.select();
  document.execCommand('copy');
  document.getElementById('statusMsg').innerText = "Copied to clipboard!";
});
