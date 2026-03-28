# Auto-Skip Liked Songs (Toggle) for Spicetify

A Spicetify extension that adds a convenient toggle button to your bottom Playbar. When turned ON, it automatically skips any song currently playing that is already saved to your Liked Songs (indicated by the Green Checkmark/Plus icon).

This extension is built specifically to survive Spotify's recent UI updates that broke older auto-skip tools. It uses a UI watcher to guarantee functionality and includes a built-in 1.5-second safety delay to prevent Spotify's servers from rate-limiting or temporarily banning your account for skipping too rapidly.

## Features
*   **Playbar Integration:** A clean, native-looking toggle button located right next to your volume and queue controls.
*   **Visual Feedback:** The icon turns Green when active and displays popup notifications so you always know its status.
*   **Server Safe:** The 1.5-second skip delay mimics human behavior, keeping your Smart Shuffle and algorithmic playlists functioning normally.

## Installation

1. Download the `auto-skip-toggle.js` file from this repository.
2. Place the file inside your Spicetify `Extensions` folder:
   *   **Windows:** `%appdata%\spicetify\Extensions`
   *   **Mac/Linux:** `~/.config/spicetify/Extensions`
3. Open your Terminal or PowerShell and run the following commands to apply it:
   ```bash
   spicetify config extensions auto-skip-toggle.js
   spicetify apply

(Note: If your os forces Administrator mode, use spicetify apply --bypass-admin instead).

## Usage

1. Open Spotify and look at your bottom Playbar.
2. Locate the new **Skip Icon** next to the Lyrics/Queue buttons.
3. Click it once to turn Auto-Skip **ON** (The icon will turn Green).
4. Whenever a song with a Green Checkmark plays, the extension will wait 1.5 seconds and automatically skip to the next track.
5. Click the icon again to turn Auto-Skip **OFF**.
