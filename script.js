document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const startOverlay = document.getElementById('start-overlay');
    const startBtn = document.getElementById('start-btn');
    const hackerContainer = document.getElementById('hacker-container');
    const systemDetails = document.getElementById('system-details');
    const typingContainer = document.getElementById('typing-text');
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    const currentStatus = document.getElementById('current-status');
    const fakeCodeContainer = document.getElementById('fake-code-container');
    const fakeFileStatus = document.getElementById('fake-file-status');
    const fileNameDisplay = document.getElementById('file-name');
    const unauthorizedWarning = document.getElementById('unauthorized-warning');
    const compromisedScreen = document.getElementById('compromised-screen');
    const prankReveal = document.getElementById('prank-reveal');
    const shareBtn = document.getElementById('share-btn');
    const countdownTimer = document.getElementById('countdown-timer');

    // Audio
    const typingSound = document.getElementById('typing-sound');
    const warningSound = document.getElementById('warning-sound');
    const glitchSound = document.getElementById('glitch-sound');

    // Configuration
    const messages = [
        "Initializing secure connection to relay server...",
        "Bypassing local firewall protocols...",
        "Exploiting CVE-2024-8821 kernel vulnerability...",
        "Accessing root directory /dev/sda1...",
        "Scanning for sensitive credentials...",
        "Decryption engine started: AES-256-GCM",
        "Uploading user profile data...",
        "Encrypting local files to prevent access...",
        "Establishing persistent backdoor...",
        "Webcam access: GRANTED (Sub-Process 1422)",
        "Microphone access: GRANTED (Sub-Process 1423)",
        "Extracting browser history and cookies...",
        "Finalizing data exfiltration..."
    ];

    const fakeFiles = [
        "passwords.txt", "private_keys.json", "bank_details.pdf", 
        "browser_history.db", "contacts.vcf", "personal_photos.zip",
        "work_documents.docx", "desktop_screenshot.png", "tax_returns.pdf"
    ];

    const fakeCodes = [
        "GET /api/v1/auth/token HTTP/1.1",
        "Payload: { user: 'admin', pass: '********' }",
        "Status: 200 OK - Access Granted",
        "Injecting script: <script>alert('Hacked')</script>",
        "Bruteforce attempt 142: Failed",
        "Bruteforce attempt 143: SUCCESS",
        "rm -rf /Users/Current/Documents/*",
        "scp -r ./data root@remote-server:/backup",
        "encrypting /home/user/desktop/notes.txt...",
        "TCP Connection established: 45.12.33.19:443",
        "Warning: Linter error in exploit.py line 42",
        "Overwriting boot sector...",
        "Mirroring display to 192.168.1.5..."
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let progressValue = 0;
    let isPrankRunning = false;

    // --- System Lock Functions ---

    function blockKeyboard(event) {
        if (isPrankRunning) {
            event.preventDefault();
        }
    }

    function enforceFullScreen() {
        if (isPrankRunning && !document.fullscreenElement) {
            requestFullScreen();
        }
    }

    function activateSystemLock() {
        isPrankRunning = true;
        window.addEventListener('keydown', blockKeyboard, true);
        document.addEventListener('fullscreenchange', enforceFullScreen);
    }

    function deactivateSystemLock() {
        isPrankRunning = false;
        window.removeEventListener('keydown', blockKeyboard, true);
        document.removeEventListener('fullscreenchange', enforceFullScreen);
    }


    // --- Helper Functions ---

    function getOS() {
        const userAgent = window.navigator.userAgent;
        if (userAgent.indexOf("Windows NT 10.0") !== -1) return "Windows 10/11";
        if (userAgent.indexOf("Windows NT 6.2") !== -1) return "Windows 8";
        if (userAgent.indexOf("Windows NT 6.1") !== -1) return "Windows 7";
        if (userAgent.indexOf("Mac") !== -1) return "macOS";
        if (userAgent.indexOf("Linux") !== -1) return "Linux";
        if (userAgent.indexOf("Android") !== -1) return "Android";
        if (userAgent.indexOf("iPhone") !== -1) return "iOS";
        return "Unknown OS";
    }

    function getBrowser() {
        const userAgent = window.navigator.userAgent;
        if (userAgent.indexOf("Chrome") !== -1) return "Chrome";
        if (userAgent.indexOf("Firefox") !== -1) return "Firefox";
        if (userAgent.indexOf("Safari") !== -1) return "Safari";
        if (userAgent.indexOf("Edge") !== -1) return "Edge";
        return "Browser";
    }

    function playSound(sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {}); // Ignore errors if browser blocks
    }

    function requestFullScreen() {
        const doc = window.document;
        const docEl = doc.documentElement;
        const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        if (requestFullScreen) requestFullScreen.call(docEl);
    }

    // --- Core Logic ---

    function typeMessage() {
        if (messageIndex < messages.length) {
            const currentMessage = messages[messageIndex];
            if (charIndex < currentMessage.length) {
                typingContainer.innerHTML += currentMessage.charAt(charIndex);
                charIndex++;
                playSound(typingSound);
                // Random typing speed
                setTimeout(typeMessage, Math.random() * 80 + 20);
            } else {
                typingContainer.innerHTML += "<br>";
                messageIndex++;
                charIndex = 0;
                setTimeout(typeMessage, Math.random() * 1500 + 500);
            }
        }
    }

    function addFakeCode() {
        const code = fakeCodes[Math.floor(Math.random() * fakeCodes.length)];
        const div = document.createElement('div');
        div.textContent = `[${new Date().toLocaleTimeString()}] ${code}`;
        fakeCodeContainer.prepend(div);
        if (fakeCodeContainer.children.length > 15) {
            fakeCodeContainer.removeChild(fakeCodeContainer.lastChild);
        }
        setTimeout(addFakeCode, Math.random() * 800 + 100);
    }

    function updateProgress() {
        if (progressValue < 100) {
            // Irregular progress
            let step = Math.random() * 1.5;
            
            // Randomly "get stuck"
            if (Math.random() > 0.8) step = 0;
            
            // Randomly "jump"
            if (Math.random() > 0.95) step = Math.random() * 10;

            progressValue += step;
            if (progressValue > 100) progressValue = 100;

            progressBar.style.width = `${progressValue}%`;
            progressPercent.textContent = `${Math.floor(progressValue)}%`;

            // Status updates based on progress
            if (progressValue < 30) currentStatus.textContent = "INITIALIZING...";
            else if (progressValue < 60) currentStatus.textContent = "BYPASSING SECURITY...";
            else if (progressValue < 80) currentStatus.textContent = "EXTRACTING DATA...";
            else currentStatus.textContent = "ENCRYPTING SYSTEM...";

            // Fake file uploading (show after 40%)
            if (progressValue > 40 && progressValue < 95) {
                fakeFileStatus.classList.remove('hidden');
                if (Math.random() > 0.9) {
                    fileNameDisplay.textContent = fakeFiles[Math.floor(Math.random() * fakeFiles.length)];
                }
            } else {
                fakeFileStatus.classList.add('hidden');
            }

            // Warning at 80%
            if (progressValue >= 80 && progressValue < 85 && unauthorizedWarning.classList.contains('hidden')) {
                triggerWarning();
            }

            setTimeout(updateProgress, Math.random() * 300 + 50);
        } else {
            finishHacking();
        }
    }

    function triggerWarning() {
        unauthorizedWarning.classList.remove('hidden');
        playSound(warningSound);
        setTimeout(() => {
            unauthorizedWarning.classList.add('hidden');
            // Speed up after warning
            progressValue = 85; 
        }, 2000);
    }

    function finishHacking() {
        compromisedScreen.classList.remove('hidden');
        playSound(glitchSound);
        
        let timeLeft = 10;
        const interval = setInterval(() => {
            timeLeft--;
            countdownTimer.textContent = `System lock in ${timeLeft} seconds`;
            if (timeLeft <= 0) {
                clearInterval(interval);
                revealPrank();
            }
        }, 1000);
    }

    function revealPrank() {
        compromisedScreen.classList.add('hidden');
        prankReveal.classList.remove('hidden');
        deactivateSystemLock();
    }

    // Start Button Click
    startBtn.addEventListener('click', () => {
        requestFullScreen();
        startOverlay.classList.add('hidden');
        hackerContainer.classList.remove('hidden');
        activateSystemLock();

        // Detect system info
        const os = getOS();
        const browser = getBrowser();
        const res = `${window.screen.width}x${window.screen.height}`;
        systemDetails.textContent = `DEVICE: ${os} (${browser}) | RES: ${res}`;

        // Start sequences
        typeMessage();
        addFakeCode();
        updateProgress();
    });

    // --- Share Logic ---

    const mainShareBtn = document.getElementById('main-share-btn');
    const socialShareContainer = document.getElementById('social-share-container');
    const facebookBtn = document.getElementById('share-facebook');
    const messengerBtn = document.getElementById('share-messenger');
    const discordBtn = document.getElementById('share-discord');
    const imoBtn = document.getElementById('share-imo');
    const copyNotification = document.getElementById('copy-notification');

    const prankUrl = window.location.href;
    const shareText = "This is crazy! I think my device was just hacked... 😱";

    function copyToClipboard() {
        navigator.clipboard.writeText(prankUrl).then(() => {
            copyNotification.classList.remove('hidden');
            setTimeout(() => {
                copyNotification.classList.add('hidden');
            }, 2800);
        });
    }

    mainShareBtn.addEventListener('click', () => {
        socialShareContainer.classList.toggle('hidden');
        mainShareBtn.classList.add('hidden');
    });

    facebookBtn.addEventListener('click', () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(prankUrl)}`;
        window.open(url, '_blank');
    });

    messengerBtn.addEventListener('click', copyToClipboard);
    discordBtn.addEventListener('click', copyToClipboard);
    imoBtn.addEventListener('click', copyToClipboard);
});
