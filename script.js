
console.log("CreatorKit website loaded successfully!");


// SEARCH TOOLS

const searchInput = document.getElementById("searchInput");

const toolCards = document.querySelectorAll(".tool-card");

searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.toLowerCase();

    toolCards.forEach(function (card) {

        const toolName = card.querySelector("h3").textContent.toLowerCase();

        const toolDescription = card.querySelector("p").textContent.toLowerCase();

        if (
            toolName.includes(searchText) ||
            toolDescription.includes(searchText)
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});



// CREATOR KIT - TOOL MODAL

function openTool(tool) {

    document.getElementById("toolModal")?.remove();

    if (tool === "hashtag") {
        openHashtagGenerator();
        return;
    }

    if (tool === "description") {
        openDescriptionGenerator();
        return;
    }
    if (tool === "tag") {
    openTagGenerator();
    return;
    }
    if (tool === "counter") {
    openWordCounter();
    return;
    }
    if (tool === "bio") {
    openBioGenerator();
    return;
    }
    if (tool === "compressor") {
    openImageCompressor();
    return;
    }
    if (tool === "resizer") {
    openThumbnailResizer();
    return;
    }

    if (tool !== "title") {
        alert("This tool is coming soon!");
        return;
    }

    const modal = document.createElement("div");

    modal.id = "toolModal";
    modal.className = "tool-modal";

    modal.innerHTML = `
        <div class="modal-content">

            <button class="modal-close" onclick="closeTool()">
                &times;
            </button>

            <div class="tool-icon">🎯</div>

            <h2>YouTube Title Generator</h2>

            <p>
                Generate catchy YouTube titles for your videos.
            </p>

            <label for="videoTopic">Enter your video topic</label>

            <input
                type="text"
                id="videoTopic"
                placeholder="Example: How to earn money online"
            >

            <label for="titleStyle">Choose title style</label>

            <select id="titleStyle">
                <option value="all">All Styles</option>
                <option value="curiosity">Curiosity</option>
                <option value="howto">How To</option>
                <option value="list">List Style</option>
                <option value="challenge">Challenge</option>
            </select>

            <button
                class="generate-button"
                onclick="generateTitles()"
            >
                ✨ Generate Titles
            </button>

            <div id="titleResults" class="results-container"></div>

        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("videoTopic").focus();
}



// CLOSE MODAL

function closeTool() {
    document.getElementById("toolModal")?.remove();
}


// GENERATE TITLES

function generateTitles() {

    const topic = document
        .getElementById("videoTopic")
        .value.trim();

    const style = document.getElementById("titleStyle").value;

    const results = document.getElementById("titleResults");

    if (!topic) {
        results.innerHTML = "<p>Please enter a video topic.</p>";
        return;
    }

    const templates = {

        curiosity: [
            `The Truth About ${topic}`,
            `Nobody Talks About This: ${topic}`,
            `What Happens When You Try ${topic}?`,
            `I Discovered Something Amazing About ${topic}`,
            `The Secret Behind ${topic}`
        ],

        howto: [
            `How to Master ${topic}`,
            `${topic}: Complete Beginner's Guide`,
            `How to Get Started With ${topic}`,
            `Learn ${topic} Step by Step`,
            `The Easiest Way to Understand ${topic}`
        ],

        list: [
            `7 Things You Should Know About ${topic}`,
            `5 Best Tips for ${topic}`,
            `10 Mistakes to Avoid in ${topic}`,
            `Top 5 Secrets About ${topic}`,
            `7 Ways to Improve Your ${topic}`
        ],

        challenge: [
            `I Tried ${topic} for 7 Days`,
            `Can You Master ${topic}?`,
            `${topic}: My 30-Day Challenge`,
            `I Tested ${topic} So You Don't Have To`,
            `What I Learned From Trying ${topic}`
        ]

    };

    let titles = [];

    if (style === "all") {

        Object.values(templates).forEach(group => {
            titles.push(...group.slice(0, 2));
        });

    } else {

        titles = templates[style];

    }

    results.innerHTML = "<h3>Generated Titles</h3>";

    titles.forEach(title => {

        const item = document.createElement("div");

        item.className = "result-item";

        const text = document.createElement("p");
        text.textContent = title;

        const button = document.createElement("button");
        button.className = "copy-button";
        button.textContent = "📋 Copy";

        button.addEventListener("click", async () => {

            try {
                await navigator.clipboard.writeText(title);
                button.textContent = "✓ Copied!";
            } catch (error) {
                button.textContent = "Copy unavailable";
            }

        });

        item.appendChild(text);
        item.appendChild(button);

        results.appendChild(item);

    });

}

/* =================================
   HASHTAG GENERATOR
================================= */

function openHashtagGenerator() {

    const modal = document.createElement("div");

    modal.id = "toolModal";
    modal.className = "tool-modal";

    modal.innerHTML = `
        <div class="modal-content">

            <button class="modal-close" onclick="closeTool()">
                &times;
            </button>

            <div class="tool-icon">#️⃣</div>

            <h2>Hashtag Generator</h2>

            <p>
                Generate relevant hashtags for your social media content.
            </p>

            <label for="hashtagTopic">Enter your content topic</label>

            <input
                type="text"
                id="hashtagTopic"
                placeholder="Example: Fitness, Travel, Technology"
            >

            <label for="hashtagPlatform">Choose platform</label>

            <select id="hashtagPlatform">
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
                <option value="general">General Social Media</option>
            </select>

            <button
                class="generate-button"
                onclick="generateHashtags()"
            >
                ✨ Generate Hashtags
            </button>

            <div id="hashtagResults" class="results-container"></div>

        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("hashtagTopic").focus();
}


/* GENERATE HASHTAGS */

function generateHashtags() {

    const topic = document
        .getElementById("hashtagTopic")
        .value.trim();

    const platform = document
        .getElementById("hashtagPlatform")
        .value;

    const results = document.getElementById("hashtagResults");

    if (!topic) {
        results.innerHTML = "<p>Please enter a topic first.</p>";
        return;
    }

    const cleanTopic = topic
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "");

    if (!cleanTopic) {
        results.innerHTML = "<p>Please enter a valid topic.</p>";
        return;
    }

    const lowerTopic = cleanTopic.toLowerCase();

    const commonTags = [
        "ContentCreator",
        "DigitalCreator",
        "CreativeContent",
        "DailyInspiration",
        "Trending",
        "Explore",
        "SocialMedia",
        "CreatorCommunity"
    ];

    const platformTags = {

        instagram: [
            "InstaDaily",
            "InstagramContent",
            "InstaCreator",
            "ReelsInstagram"
        ],

        youtube: [
            "YouTubeCreator",
            "YouTubeVideos",
            "YouTubeCommunity",
            "VideoCreator"
        ],

        tiktok: [
            "TikTokCreator",
            "TikTokVideos",
            "ForYou",
            "TikTokTrend"
        ],

        general: [
            "OnlineCommunity",
            "CreativeIdeas",
            "DigitalWorld",
            "ContentMarketing"
        ]

    };

    const topicTags = [
        cleanTopic,
        lowerTopic + "Tips",
        lowerTopic + "Ideas",
        lowerTopic + "Lovers",
        lowerTopic + "Community",
        lowerTopic + "Daily"
    ];

    const hashtags = [
        ...topicTags,
        ...platformTags[platform],
        ...commonTags
    ].map(tag => "#" + tag);

    const uniqueHashtags = [...new Set(hashtags)];

    results.innerHTML = `
        <h3>Generated Hashtags</h3>

        <p>
            ${uniqueHashtags.length} hashtags generated.
        </p>

        <div class="result-item">
            <p id="hashtagOutput"></p>

            <button
                class="copy-button"
                onclick="copyAllHashtags()"
            >
                📋 Copy All
            </button>
        </div>
    `;

    document.getElementById("hashtagOutput").textContent =
        uniqueHashtags.join(" ");

    window.currentHashtags = uniqueHashtags;

}


/* COPY ALL HASHTAGS */

async function copyAllHashtags() {

    if (!window.currentHashtags) return;

    const button = document.querySelector(
        "#hashtagResults .copy-button"
    );

    try {

        await navigator.clipboard.writeText(
            window.currentHashtags.join(" ")
        );

        button.textContent = "✓ Copied!";

    } catch (error) {

        button.textContent = "Copy unavailable";

    }

}

/* =================================
   DESCRIPTION GENERATOR
================================= */

function openDescriptionGenerator() {

    const modal = document.createElement("div");

    modal.id = "toolModal";
    modal.className = "tool-modal";

    modal.innerHTML = `
        <div class="modal-content">

            <button class="modal-close" onclick="closeTool()">
                &times;
            </button>

            <div class="tool-icon">📝</div>

            <h2>YouTube Description Generator</h2>

            <p>Create descriptions for your YouTube videos.</p>

            <label for="descriptionTopic">Video topic</label>

            <input
                type="text"
                id="descriptionTopic"
                placeholder="Example: How to earn money online"
            >

            <label for="channelName">Channel name (optional)</label>

            <input
                type="text"
                id="channelName"
                placeholder="Enter your channel name"
            >

            <button
                class="generate-button"
                onclick="generateDescription()"
            >
                ✨ Generate Description
            </button>

            <div id="descriptionResults" class="results-container"></div>

        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("descriptionTopic").focus();
}


function generateDescription() {

    const topic = document
        .getElementById("descriptionTopic")
        .value.trim();

    const channel = document
        .getElementById("channelName")
        .value.trim();

    const results = document.getElementById("descriptionResults");

    if (!topic) {
        results.innerHTML = "<p>Please enter your video topic.</p>";
        return;
    }

    const description = `
🔥 Welcome to this video about ${topic}!

In this video, we explore ${topic} and share useful information, tips, and ideas to help you get started.

📌 WHAT YOU WILL LEARN:
• Important information about ${topic}
• Helpful tips and strategies
• How to improve your knowledge

👍 If you find this video helpful, don't forget to LIKE, SHARE and SUBSCRIBE!

${channel ? "📺 CHANNEL: " + channel : ""}

#${topic.replace(/[^a-zA-Z0-9]/g, "")} #YouTube #Learning
    `.trim();

    results.innerHTML = `
        <h3>Generated Description</h3>

        <div class="result-item">
            <p id="descriptionOutput"></p>

            <button
                class="copy-button"
                onclick="copyDescription()"
            >
                📋 Copy Description
            </button>
        </div>
    `;

    document.getElementById("descriptionOutput").textContent = description;
}


async function copyDescription() {

    const description = document.getElementById("descriptionOutput").textContent;

    const button = document.querySelector(
        "#descriptionResults .copy-button"
    );

    try {
        await navigator.clipboard.writeText(description);
        button.textContent = "✓ Copied!";
    } catch (error) {
        button.textContent = "Copy unavailable";
    }
}

/* =================================
   YOUTUBE TAG GENERATOR
================================= */

function openTagGenerator() {

    const modal = document.createElement("div");

    modal.id = "toolModal";
    modal.className = "tool-modal";

    modal.innerHTML = `
        <div class="modal-content">

            <button class="modal-close" onclick="closeTool()">
                &times;
            </button>

            <div class="tool-icon">🏷️</div>

            <h2>YouTube Tag Generator</h2>

            <p>Generate relevant tags for your YouTube videos.</p>

            <label for="tagTopic">Enter your video topic</label>

            <input
                type="text"
                id="tagTopic"
                placeholder="Example: Online business"
            >

            <button
                class="generate-button"
                onclick="generateTags()"
            >
                ✨ Generate Tags
            </button>

            <div id="tagResults" class="results-container"></div>

        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("tagTopic").focus();
}


function generateTags() {

    const topic = document
        .getElementById("tagTopic")
        .value.trim();

    const results = document.getElementById("tagResults");

    if (!topic) {
        results.innerHTML = "<p>Please enter a video topic.</p>";
        return;
    }

    const cleanTopic = topic
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .trim();

    if (!cleanTopic) {
        results.innerHTML = "<p>Please enter a valid topic.</p>";
        return;
    }

    const tags = [
        cleanTopic,
        cleanTopic + " tutorial",
        cleanTopic + " for beginners",
        "how to " + cleanTopic,
        "learn " + cleanTopic,
        cleanTopic + " tips",
        cleanTopic + " guide",
        "best " + cleanTopic,
        cleanTopic + " explained",
        "complete " + cleanTopic + " guide",
        "beginner guide",
        "step by step tutorial",
        "YouTube tutorial",
        "educational video",
        "how to learn"
    ];

    const uniqueTags = [...new Set(tags)];

    results.innerHTML = `
        <h3>Generated YouTube Tags</h3>

        <p>${uniqueTags.length} tags generated.</p>

        <div class="result-item">
            <p id="tagOutput"></p>

            <button
                class="copy-button"
                onclick="copyAllTags()"
            >
                📋 Copy All Tags
            </button>
        </div>
    `;

    document.getElementById("tagOutput").textContent =
        uniqueTags.join(", ");

    window.currentTags = uniqueTags;
}


async function copyAllTags() {

    if (!window.currentTags) return;

    const button = document.querySelector(
        "#tagResults .copy-button"
    );

    try {

        await navigator.clipboard.writeText(
            window.currentTags.join(", ")
        );

        button.textContent = "✓ Copied!";

    } catch (error) {

        button.textContent = "Copy unavailable";

    }
}

/* =================================
   WORD COUNTER
================================= */

function openWordCounter() {

    const modal = document.createElement("div");

    modal.id = "toolModal";
    modal.className = "tool-modal";

    modal.innerHTML = `
        <div class="modal-content">

            <button class="modal-close" onclick="closeTool()">
                &times;
            </button>

            <div class="tool-icon">🔢</div>

            <h2>Word Counter</h2>

            <p>Count words and characters in your text instantly.</p>

            <label for="counterText">Enter or paste your text</label>

            <textarea
                id="counterText"
                placeholder="Start typing or paste your text here..."
                rows="7"
                style="width:100%; padding:12px; margin-top:10px; border-radius:8px; border:1px solid #ccc; resize:vertical;"
            ></textarea>

            <div class="counter-stats">

                <div class="result-item">
                    <h3 id="wordCount">0</h3>
                    <p>Words</p>
                </div>

                <div class="result-item">
                    <h3 id="characterCount">0</h3>
                    <p>Characters</p>
                </div>

                <div class="result-item">
                    <h3 id="noSpaceCount">0</h3>
                    <p>Without Spaces</p>
                </div>

                <div class="result-item">
                    <h3 id="sentenceCount">0</h3>
                    <p>Sentences</p>
                </div>

            </div>

            <button
                class="generate-button"
                onclick="clearCounter()"
            >
                🗑️ Clear Text
            </button>

        </div>
    `;

    document.body.appendChild(modal);

    const textarea = document.getElementById("counterText");

    textarea.addEventListener("input", updateWordCount);

    textarea.focus();

    updateWordCount();
}


function updateWordCount() {

    const text = document.getElementById("counterText").value;

    const words = text.trim()
        ? text.trim().split(/\s+/).length
        : 0;

    const characters = text.length;

    const withoutSpaces = text.replace(/\s/g, "").length;

    const sentences = text.trim()
        ? (text.match(/[.!?]+/g) || []).length
        : 0;

    document.getElementById("wordCount").textContent = words;

    document.getElementById("characterCount").textContent = characters;

    document.getElementById("noSpaceCount").textContent = withoutSpaces;

    document.getElementById("sentenceCount").textContent = sentences;
}


function clearCounter() {

    document.getElementById("counterText").value = "";

    updateWordCount();

}

/* =================================
   BIO GENERATOR
================================= */

function openBioGenerator() {

    const modal = document.createElement("div");

    modal.id = "toolModal";
    modal.className = "tool-modal";

    modal.innerHTML = `
        <div class="modal-content">

            <button class="modal-close" onclick="closeTool()">
                &times;
            </button>

            <div class="tool-icon">👤</div>

            <h2>Social Media Bio Generator</h2>

            <p>Create attractive bios for your social media profiles.</p>

            <label for="bioName">Your name or username</label>

            <input
                type="text"
                id="bioName"
                placeholder="Example: Rahul"
            >

            <label for="bioNiche">Your content category</label>

            <input
                type="text"
                id="bioNiche"
                placeholder="Example: Fitness, Gaming, Travel"
            >

            <label for="bioPlatform">Choose platform</label>

            <select id="bioPlatform">
                <option value="Instagram">Instagram</option>
                <option value="YouTube">YouTube</option>
                <option value="TikTok">TikTok</option>
                <option value="General">Other Social Media</option>
            </select>

            <button
                class="generate-button"
                onclick="generateBios()"
            >
                ✨ Generate Bios
            </button>

            <div id="bioResults" class="results-container"></div>

        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("bioName").focus();
}


/* GENERATE BIOS */

function generateBios() {

    const name = document.getElementById("bioName").value.trim();

    const niche = document.getElementById("bioNiche").value.trim();

    const platform = document.getElementById("bioPlatform").value;

    const results = document.getElementById("bioResults");

    if (!name || !niche) {
        results.innerHTML = "<p>Please enter your name and content category.</p>";
        return;
    }

    const bios = [

        `✨ ${name} | ${niche} Creator\n🎯 Sharing ideas and inspiration\n🚀 Follow my journey!`,

        `🔥 ${name}\n💡 Passionate about ${niche}\n📍 Creating content for you\n❤️ Follow for more!`,

        `👋 Hey, I'm ${name}!\n🎬 ${niche} Content Creator\n✨ Creating. Sharing. Growing.`,

        `🚀 ${name} | ${platform} Creator\n🌟 Your daily dose of ${niche}\n👇 Follow for updates`,

        `💫 ${name}\n🎯 ${niche} Enthusiast\n📸 Making every post count\n❤️ Thanks for being here!`

    ];

    results.innerHTML = `
        <h3>Generated Bios</h3>
        <p>Choose your favourite bio.</p>
    `;

    bios.forEach((bio, index) => {

        const item = document.createElement("div");

        item.className = "result-item";

        const text = document.createElement("p");

        text.textContent = bio;

        text.style.whiteSpace = "pre-line";

        const button = document.createElement("button");

        button.className = "copy-button";

        button.textContent = "📋 Copy Bio";

        button.addEventListener("click", async () => {

            try {

                await navigator.clipboard.writeText(bio);

                button.textContent = "✓ Copied!";

            } catch (error) {

                button.textContent = "Copy unavailable";

            }

        });

        item.appendChild(text);

        item.appendChild(button);

        results.appendChild(item);

    });

}

/* =================================
   IMAGE COMPRESSOR
================================= */

function openImageCompressor() {

    const modal = document.createElement("div");

    modal.id = "toolModal";
    modal.className = "tool-modal";

    modal.innerHTML = `
        <div class="modal-content">

            <button class="modal-close" onclick="closeTool()">
                &times;
            </button>

            <div class="tool-icon">🖼️</div>

            <h2>Image Compressor</h2>

            <p>Reduce image file sizes without uploading them to a server.</p>

            <label for="compressImage">Choose an image</label>

            <input
                type="file"
                id="compressImage"
                accept="image/jpeg,image/png,image/webp"
            >

            <label for="imageFormat">Output format</label>

            <select id="imageFormat">
                <option value="image/webp">WebP (Recommended)</option>
                <option value="image/jpeg">JPEG</option>
            </select>

            <label for="imageQuality">
                Image quality: <span id="qualityValue">70%</span>
            </label>

            <input
                type="range"
                id="imageQuality"
                min="10"
                max="100"
                value="70"
                style="width:100%; margin:12px 0;"
            >

            <button
                class="generate-button"
                onclick="compressImage()"
            >
                ✨ Compress Image
            </button>

            <div id="compressResults" class="results-container"></div>

        </div>
    `;

    document.body.appendChild(modal);

    const qualitySlider = document.getElementById("imageQuality");

    qualitySlider.addEventListener("input", function () {
        document.getElementById("qualityValue").textContent =
            this.value + "%";
    });

    document.getElementById("compressImage").focus();
}


/* COMPRESS IMAGE */

function compressImage() {

    const fileInput = document.getElementById("compressImage");

    const results = document.getElementById("compressResults");

    const file = fileInput.files[0];

    if (!file) {
        results.innerHTML = "<p>Please select an image first.</p>";
        return;
    }

    if (!file.type.startsWith("image/")) {
        results.innerHTML = "<p>Please select a valid image.</p>";
        return;
    }

    const format = document.getElementById("imageFormat").value;

    const quality =
        Number(document.getElementById("imageQuality").value) / 100;

    const image = new Image();

    const imageURL = URL.createObjectURL(file);

    results.innerHTML = "<p>Compressing your image...</p>";

    image.onload = function () {

        const canvas = document.createElement("canvas");

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const context = canvas.getContext("2d");

        if (format === "image/jpeg") {
            context.fillStyle = "#ffffff";
            context.fillRect(0, 0, canvas.width, canvas.height);
        }

        context.drawImage(image, 0, 0);

        canvas.toBlob(function (blob) {

            URL.revokeObjectURL(imageURL);

            if (!blob) {
                results.innerHTML = "<p>Compression failed. Please try another image.</p>";
                return;
            }

            const compressedURL = URL.createObjectURL(blob);

            const originalSize = file.size;
            const compressedSize = blob.size;

            const savedSize = originalSize - compressedSize;

            const savedPercentage = Math.max(
                0,
                ((originalSize - compressedSize) / originalSize) * 100
            );

            const extension = format === "image/webp" ? "webp" : "jpg";

            results.innerHTML = `
                <h3>Compression Complete!</h3>

                <div class="result-item">
                    <p><strong>Original Size:</strong> ${formatImageSize(originalSize)}</p>

                    <p><strong>Compressed Size:</strong> ${formatImageSize(compressedSize)}</p>

                    <p><strong>Space Saved:</strong> ${savedSize > 0 ? formatImageSize(savedSize) : "0 KB"}</p>

                    <p><strong>Reduction:</strong> ${savedPercentage.toFixed(1)}%</p>

                    <img
                        src="${compressedURL}"
                        alt="Compressed image preview"
                        style="max-width:100%; max-height:250px; margin-top:15px; border-radius:10px;"
                    >

                    <a
                        href="${compressedURL}"
                        download="creatorkit-compressed.${extension}"
                        class="generate-button"
                        style="display:block; text-align:center; text-decoration:none; margin-top:15px;"
                    >
                        ⬇️ Download Compressed Image
                    </a>
                </div>
            `;

        }, format, quality);

    };

    image.onerror = function () {

        URL.revokeObjectURL(imageURL);

        results.innerHTML = "<p>Unable to load this image. Please try another file.</p>";

    };

    image.src = imageURL;
}


/* FORMAT FILE SIZE */

function formatImageSize(bytes) {

    if (bytes < 1024) {
        return bytes + " Bytes";
    }

    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + " KB";
    }

    return (bytes / (1024 * 1024)).toFixed(2) + " MB";

}

/* =================================
   THUMBNAIL RESIZER
================================= */

function openThumbnailResizer() {

    const modal = document.createElement("div");

    modal.id = "toolModal";
    modal.className = "tool-modal";

    modal.innerHTML = `
        <div class="modal-content">

            <button class="modal-close" onclick="closeTool()">
                &times;
            </button>

            <div class="tool-icon">📐</div>

            <h2>YouTube Thumbnail Resizer</h2>

            <p>Resize your images to YouTube thumbnail dimensions.</p>

            <label for="thumbnailFile">Upload your image</label>

            <input
                type="file"
                id="thumbnailFile"
                accept="image/jpeg,image/png,image/webp"
            >

            <label for="thumbnailFit">Image fitting</label>

            <select id="thumbnailFit">
                <option value="cover">Fill thumbnail (crop edges)</option>
                <option value="contain">Fit entire image (may show background)</option>
            </select>

            <label for="thumbnailFormat">Output format</label>

            <select id="thumbnailFormat">
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
            </select>

            <button
                class="generate-button"
                onclick="resizeThumbnail()"
            >
                ✨ Resize Thumbnail
            </button>

            <div id="thumbnailResults" class="results-container"></div>

        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("thumbnailFile").focus();
}


/* RESIZE THUMBNAIL */

function resizeThumbnail() {

    const file = document.getElementById("thumbnailFile").files[0];

    const results = document.getElementById("thumbnailResults");

    const fit = document.getElementById("thumbnailFit").value;

    const format = document.getElementById("thumbnailFormat").value;

    if (!file) {
        results.innerHTML = "<p>Please upload an image first.</p>";
        return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        results.innerHTML = "<p>Please upload a JPG, PNG or WebP image.</p>";
        return;
    }

    const image = new Image();

    const imageURL = URL.createObjectURL(file);

    results.innerHTML = "<p>Resizing your thumbnail...</p>";

    image.onload = function () {

        const canvas = document.createElement("canvas");

        canvas.width = 1280;
        canvas.height = 720;

        const context = canvas.getContext("2d");

        // Background
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, 1280, 720);

        const sourceWidth = image.naturalWidth;
        const sourceHeight = image.naturalHeight;

        const scale = fit === "cover"
            ? Math.max(1280 / sourceWidth, 720 / sourceHeight)
            : Math.min(1280 / sourceWidth, 720 / sourceHeight);

        const width = sourceWidth * scale;
        const height = sourceHeight * scale;

        const x = (1280 - width) / 2;
        const y = (720 - height) / 2;

        context.drawImage(image, x, y, width, height);

        canvas.toBlob(function (blob) {

            URL.revokeObjectURL(imageURL);

            if (!blob) {
                results.innerHTML = "<p>Could not resize this image. Please try again.</p>";
                return;
            }

            const outputURL = URL.createObjectURL(blob);

            const extension = {
                "image/jpeg": "jpg",
                "image/png": "png",
                "image/webp": "webp"
            }[format];

            results.innerHTML = `
                <h3>Thumbnail Ready!</h3>

                <div class="result-item">

                    <p><strong>Dimensions:</strong> 1280 × 720 px</p>

                    <p><strong>File Size:</strong> ${formatImageSize(blob.size)}</p>

                    <img
                        src="${outputURL}"
                        alt="Resized YouTube thumbnail"
                        style="width:100%; max-width:100%; margin-top:15px; border-radius:10px;"
                    >

                    <a
                        href="${outputURL}"
                        download="creatorkit-thumbnail.${extension}"
                        class="generate-button"
                        style="display:block; text-align:center; text-decoration:none; margin-top:15px;"
                    >
                        ⬇️ Download Thumbnail
                    </a>

                </div>
            `;

        }, format, format === "image/png" ? undefined : 0.92);

    };

    image.onerror = function () {

        URL.revokeObjectURL(imageURL);

        results.innerHTML = "<p>Unable to load this image. Please try another one.</p>";

    };

    image.src = imageURL;
}





