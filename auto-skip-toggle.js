// NAME: Auto-Skip Liked Songs
// AUTHOR: Anonymous
// DESCRIPTION: Adds a playbar toggle next to Mute to automatically skip liked songs. Left-click to toggle ON/OFF. Right-click to toggle Fast/Safe delay.

(async function AutoSkipPro() {
    while (!Spicetify?.Player || !Spicetify?.showNotification) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    let isEnabled = localStorage.getItem("auto-skip-enabled") === "true";
    let isFast = localStorage.getItem("auto-skip-instant") === "true";
    const getMuteButton = () => document.querySelector('button[aria-label="Mute"], button[aria-label="Unmute"]');
    while (!getMuteButton()) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    const btn = document.createElement("button");
    btn.setAttribute("aria-label", "Auto-Skip Liked Songs\nLeft-Click: Toggle ON/OFF\nRight-Click: Toggle Delay");
    btn.style.width = "32px";
    btn.style.height = "32px";
    btn.style.background = "transparent";
    btn.style.border = "none";
    btn.style.color = isEnabled ? "#1db954" : "var(--text-subdued, #b3b3b3)";
    btn.style.cursor = "pointer";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    
    btn.addEventListener("mouseover", () => {
        if (!isEnabled) btn.style.color = "var(--text-base, #ffffff)";
    });
    btn.addEventListener("mouseout", () => {
        if (!isEnabled) btn.style.color = "var(--text-subdued, #b3b3b3)";
    });

    btn.innerHTML = `<svg role="img" height="16" width="16" viewBox="0 0 48 48" fill="currentColor"><path d="M24,31a6,6,0,1,0,6,6A6,6,0,0,0,24,31Zm0,8a2,2,0,1,1,2-2A2,2,0,0,1,24,39Z"></path><circle cx="8" cy="37" r="6"></circle><circle cx="40" cy="37" r="6"></circle><path d="M37.4,19.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7l4,3.9a1.9,1.9,0,0,0,2.8,0l4-3.9a2.3,2.3,0,0,0,.3-2.7,2,2,0,0,0-3.1-.2l-.6.6A18,18,0,0,0,6,21v2a2,2,0,0,0,4,0V21a14,14,0,0,1,28-.9Z"></path></svg>`;

    btn.addEventListener("click", () => {
        isEnabled = !isEnabled;
        localStorage.setItem("auto-skip-enabled", isEnabled);
        btn.style.color = isEnabled ? "#1db954" : "var(--text-subdued, #b3b3b3)";
        Spicetify.showNotification(`Auto-Skip: ${isEnabled ? "ON" : "OFF"}`);
        
        if (isEnabled) checkScreenForCheckmark();
    });

    btn.addEventListener("contextmenu", (e) => {
        e.preventDefault(); 
        isFast = !isFast;
        localStorage.setItem("auto-skip-instant", isFast);
        Spicetify.showNotification(`Auto-Skip Speed: ${isFast ? "FAST (0.3s)" : "SAFE (1.5s)"}`);
    });

    const muteBtn = getMuteButton();
    if (muteBtn && muteBtn.parentNode) {
        muteBtn.parentNode.insertBefore(btn, muteBtn);
    }

    function checkScreenForCheckmark() {
        if (!isEnabled) return;
        
        const delayMs = isFast ? 300 : 1500;

        setTimeout(() => {
            if (!isEnabled) return;
            const checkmarkButton = document.querySelector('.main-nowPlayingWidget-nowPlaying button[aria-checked="true"]');
            
            if (checkmarkButton) {
                console.log("Auto-Skipper: Found the Green Checkmark! Skipping...");
                Spicetify.Player.next();
            }
        }, delayMs);
    }

    Spicetify.Player.addEventListener("songchange", checkScreenForCheckmark);
})();
