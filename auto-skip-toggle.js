// NAME: Auto-Skip Liked Songs (Toggle)
// AUTHOR: Anonymous
// DESCRIPTION: Adds a toggle button to the Playbar that automatically skips songs you have already liked (Checkmark).

(async function AutoSkipBruteForce() {
    while (!Spicetify?.Player || !Spicetify?.showNotification || !Spicetify?.Playbar) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    let isEnabled = false;
    const toggleButton = new Spicetify.Playbar.Button(
        "Auto-Skip Liked Songs",
        "skip-forward",
        (self) => {
            isEnabled = !isEnabled;
            Spicetify.showNotification(`Auto-Skip is now: ${isEnabled ? "ON" : "OFF"}`);
            self.element.style.color = isEnabled ? "#1db954" : "inherit";
            
            if (isEnabled) checkScreenForCheckmark();
        }
    );
    function checkScreenForCheckmark() {
        if (!isEnabled) return;
        
        setTimeout(() => {
            if (!isEnabled) return;
            
            const checkmarkButton = document.querySelector('.main-nowPlayingWidget-nowPlaying button[aria-checked="true"]');
            
            if (checkmarkButton) {
                console.log("Auto-Skipper: Found the Green Checkmark! Skipping...");
                Spicetify.Player.next();
            }
        }, 1500);
    }

    Spicetify.Player.addEventListener("songchange", checkScreenForCheckmark);
})();