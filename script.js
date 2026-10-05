/* =========================================================
   ZUNOHUB — SCRIPT.JS
   Author: Abduraximova Karomatxon
========================================================= */

"use strict";

/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

const storage = {
    get(key, fallback = null) {
        try {
            const value = localStorage.getItem(key);
            return value === null ? fallback : JSON.parse(value);
        } catch {
            return fallback;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {}
    }
};

function escapeHTML(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function initials(name = "") {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(x => x[0])
        .join("")
        .toUpperCase() || "U";
}


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    uz: {

        /* navigation */
        dashboard: "Dashboard",
        home: "Bosh sahifa",
        social: "Social Feed",
        messages: "Xabarlar",
        community: "Community",
        forum: "Forum",
        videos: "Videolar",
        blog: "Blog",
        profile: "Profil",

        /* common */
        search: "Qidirish...",
        edit: "Tahrirlash",
        save: "Saqlash",
        cancel: "Bekor qilish",
        close: "Yopish",
        send: "Yuborish",
        create: "Yaratish",
        join: "Qo‘shilish",
        joined: "Qo‘shilgan",
        readArticle: "Maqolani o‘qish",
        readMore: "Batafsil",
        online: "Online",
        members: "a'zo",
        views: "ko‘rish",
        comments: "izoh",
        likes: "layk",
        today: "Bugun",
        now: "Hozir",

        /* home */
        welcome: "ZunoHub'ga xush kelibsiz",
        homeTitle: "G‘oyalarni bir joyda yarating, ulashing va rivojlantiring.",
        homeDescription:
            "Loyihalar, hamjamiyatlar, bilimlar va kreativ g‘oyalar uchun yagona platforma.",
        explore: "Platformani ko‘rish",
        createPost: "Post yaratish",
        platform: "ZUNOHUB PLATFORM",
        popular: "Mashhur bo‘limlar",

        socialDesc: "Postlar, stories va yangi g‘oyalarni ulashing.",
        messageDesc: "Do‘stlaringiz va hamjamiyat bilan suhbatlashing.",
        communityDesc: "Qiziqishlaringizga mos community'larni toping.",
        forumDesc: "Savollar bering, fikr almashing va yordam oling.",

        /* feed */
        stories: "Stories",
        addStory: "Story qo‘shish",
        suggestions: "Sizga tavsiya qilamiz",
        follow: "Kuzatish",
        following: "Kuzatilmoqda",
        writeComment: "Izoh yozing...",
        noPosts: "Hozircha postlar yo‘q.",
        postCreated: "Post muvaffaqiyatli yaratildi.",
        storyCreated: "Story qo‘shildi.",
        liked: "Layk bosildi.",
        unliked: "Layk olib tashlandi.",

        /* messages */
        chats: "Suhbatlar",
        typeMessage: "Xabar yozing...",
        messageSent: "Xabar yuborildi.",
        noMessages: "Hozircha xabarlar yo‘q.",

        /* forum */
        newTopic: "Yangi mavzu",
        topics: "Mavzular",
        latest: "So‘nggi",
        popularTopics: "Mashhur",
        forumTitle: "Forum",
        forumDescription:
            "Savollar bering, tajribangizni ulashing va boshqa foydalanuvchilarga yordam bering.",
        topicTitle: "Mavzu nomi",
        topicDescription: "Mavzu haqida yozing...",
        topicCreated: "Mavzu yaratildi.",
        replies: "javob",
        forumRules: "Forum qoidalari",
        rule1: "Boshqa foydalanuvchilarni hurmat qiling.",
        rule2: "Mavzuga aloqador post yozing.",
        rule3: "Spam va reklamalardan saqlaning.",
        rule4: "Foydali ma'lumot ulashing.",

        /* blog */
        blogTitle: "Blog",
        blogDescription: "Dasturlash, dizayn va texnologiya haqida foydali maqolalar.",
        articleOpened: "Maqola yangi oynada ochildi.",

        /* profile */
        profileTitle: "Profil",
        about: "Men haqimda",
        location: "Joylashuv",
        role: "Yo‘nalish",
        projects: "Loyihalar",
        followers: "Obunachilar",
        followingCount: "Obunalar",
        communityAccess: "Community'ga kirish",
        profileUpdated: "Profil yangilandi.",
        fullName: "Ism va familiya",
        username: "Username",
        bio: "Bio",
        avatarUrl: "Avatar URL",

        /* tools */
        countryExplorer: "Country Explorer",
        countryDescription:
            "Istalgan davlat haqida real ma'lumotlarni toping.",
        currency: "Currency Exchange",
        currencyDescription:
            "Valyutalar kursini real API orqali tekshiring.",
        apiExplorer: "Public API Explorer",
        apiDescription:
            "Public API endpoint'larini sinab ko‘ring.",
        countryName: "Davlat nomi",
        searchCountry: "Davlatni qidirish",
        fromCurrency: "Boshlang‘ich valyuta",
        toCurrency: "Qabul qiluvchi valyuta",
        amount: "Miqdor",
        convert: "Hisoblash",
        apiUrl: "API URL",
        runApi: "API'ni ishga tushirish",

        /* errors */
        fillRequired: "Kerakli maydonlarni to‘ldiring.",
        somethingWrong: "Xatolik yuz berdi.",
        networkError: "Internet bilan bog‘lanishda xatolik.",
        countryNotFound: "Davlat topilmadi.",
        apiError: "API'dan ma'lumot olishda xatolik."
    },

    ru: {

        dashboard: "Панель",
        home: "Главная",
        social: "Социальная лента",
        messages: "Сообщения",
        community: "Сообщество",
        forum: "Форум",
        videos: "Видео",
        blog: "Блог",
        profile: "Профиль",

        search: "Поиск...",
        edit: "Изменить",
        save: "Сохранить",
        cancel: "Отмена",
        close: "Закрыть",
        send: "Отправить",
        create: "Создать",
        join: "Вступить",
        joined: "Вы участник",
        readArticle: "Читать статью",
        readMore: "Подробнее",
        online: "Онлайн",
        members: "участников",
        views: "просмотров",
        comments: "комментариев",
        likes: "лайков",
        today: "Сегодня",
        now: "Сейчас",

        welcome: "Добро пожаловать в ZunoHub",
        homeTitle: "Создавайте, делитесь и развивайте идеи в одном месте.",
        homeDescription:
            "Единая платформа для проектов, сообществ, знаний и креативных идей.",
        explore: "Открыть платформу",
        createPost: "Создать пост",
        platform: "ПЛАТФОРМА ZUNOHUB",
        popular: "Популярные разделы",

        socialDesc: "Публикуйте посты, stories и новые идеи.",
        messageDesc: "Общайтесь с друзьями и сообществом.",
        communityDesc: "Находите сообщества по интересам.",
        forumDesc: "Задавайте вопросы и обменивайтесь опытом.",

        stories: "Stories",
        addStory: "Добавить story",
        suggestions: "Рекомендации",
        follow: "Подписаться",
        following: "Вы подписаны",
        writeComment: "Напишите комментарий...",
        noPosts: "Пока нет постов.",
        postCreated: "Пост успешно создан.",
        storyCreated: "Story добавлена.",
        liked: "Лайк поставлен.",
        unliked: "Лайк убран.",

        chats: "Чаты",
        typeMessage: "Введите сообщение...",
        messageSent: "Сообщение отправлено.",
        noMessages: "Пока нет сообщений.",

        newTopic: "Новая тема",
        topics: "Темы",
        latest: "Последние",
        popularTopics: "Популярные",
        forumTitle: "Форум",
        forumDescription:
            "Задавайте вопросы, делитесь опытом и помогайте другим.",
        topicTitle: "Название темы",
        topicDescription: "Описание темы...",
        topicCreated: "Тема создана.",
        replies: "ответов",
        forumRules: "Правила форума",
        rule1: "Уважайте других пользователей.",
        rule2: "Публикуйте сообщения по теме.",
        rule3: "Не публикуйте спам и рекламу.",
        rule4: "Делитесь полезной информацией.",

        blogTitle: "Блог",
        blogDescription: "Полезные статьи о программировании, дизайне и технологиях.",
        articleOpened: "Статья открыта в новой вкладке.",

        profileTitle: "Профиль",
        about: "О себе",
        location: "Местоположение",
        role: "Направление",
        projects: "Проекты",
        followers: "Подписчики",
        followingCount: "Подписки",
        communityAccess: "Перейти в Community",
        profileUpdated: "Профиль обновлён.",
        fullName: "Имя и фамилия",
        username: "Username",
        bio: "Описание",
        avatarUrl: "URL аватара",

        countryExplorer: "Country Explorer",
        countryDescription:
            "Получайте реальные данные о любой стране.",
        currency: "Currency Exchange",
        currencyDescription:
            "Проверяйте курсы валют через реальный API.",
        apiExplorer: "Public API Explorer",
        apiDescription:
            "Тестируйте публичные API endpoints.",
        countryName: "Название страны",
        searchCountry: "Найти страну",
        fromCurrency: "Исходная валюта",
        toCurrency: "Целевая валюта",
        amount: "Сумма",
        convert: "Рассчитать",
        apiUrl: "API URL",
        runApi: "Запустить API",

        fillRequired: "Заполните обязательные поля.",
        somethingWrong: "Произошла ошибка.",
        networkError: "Ошибка подключения к интернету.",
        countryNotFound: "Страна не найдена.",
        apiError: "Ошибка получения данных API."
    },

    en: {

        dashboard: "Dashboard",
        home: "Home",
        social: "Social Feed",
        messages: "Messages",
        community: "Community",
        forum: "Forum",
        videos: "Videos",
        blog: "Blog",
        profile: "Profile",

        search: "Search...",
        edit: "Edit",
        save: "Save",
        cancel: "Cancel",
        close: "Close",
        send: "Send",
        create: "Create",
        join: "Join",
        joined: "Joined",
        readArticle: "Read Article",
        readMore: "Read More",
        online: "Online",
        members: "members",
        views: "views",
        comments: "comments",
        likes: "likes",
        today: "Today",
        now: "Now",

        welcome: "Welcome to ZunoHub",
        homeTitle: "Create, share and grow your ideas in one place.",
        homeDescription:
            "One platform for projects, communities, knowledge and creative ideas.",
        explore: "Explore Platform",
        createPost: "Create Post",
        platform: "ZUNOHUB PLATFORM",
        popular: "Popular Sections",

        socialDesc: "Share posts, stories and new ideas.",
        messageDesc: "Chat with friends and communities.",
        communityDesc: "Find communities based on your interests.",
        forumDesc: "Ask questions, share experience and get help.",

        stories: "Stories",
        addStory: "Add Story",
        suggestions: "Suggestions for You",
        follow: "Follow",
        following: "Following",
        writeComment: "Write a comment...",
        noPosts: "No posts yet.",
        postCreated: "Post created successfully.",
        storyCreated: "Story added.",
        liked: "Post liked.",
        unliked: "Like removed.",

        chats: "Chats",
        typeMessage: "Type a message...",
        messageSent: "Message sent.",
        noMessages: "No messages yet.",

        newTopic: "New Topic",
        topics: "Topics",
        latest: "Latest",
        popularTopics: "Popular",
        forumTitle: "Forum",
        forumDescription:
            "Ask questions, share experience and help other users.",
        topicTitle: "Topic title",
        topicDescription: "Describe your topic...",
        topicCreated: "Topic created.",
        replies: "replies",
        forumRules: "Forum Rules",
        rule1: "Respect other users.",
        rule2: "Keep posts relevant to the topic.",
        rule3: "No spam or advertising.",
        rule4: "Share useful information.",

        blogTitle: "Blog",
        blogDescription: "Useful articles about coding, design and technology.",
        articleOpened: "Article opened in a new tab.",

        profileTitle: "Profile",
        about: "About me",
        location: "Location",
        role: "Role",
        projects: "Projects",
        followers: "Followers",
        followingCount: "Following",
        communityAccess: "Open Community",
        profileUpdated: "Profile updated.",
        fullName: "Full name",
        username: "Username",
        bio: "Bio",
        avatarUrl: "Avatar URL",

        countryExplorer: "Country Explorer",
        countryDescription:
            "Find real information about any country.",
        currency: "Currency Exchange",
        currencyDescription:
            "Check exchange rates using a real API.",
        apiExplorer: "Public API Explorer",
        apiDescription:
            "Test public API endpoints.",
        countryName: "Country name",
        searchCountry: "Search Country",
        fromCurrency: "From currency",
        toCurrency: "To currency",
        amount: "Amount",
        convert: "Convert",
        apiUrl: "API URL",
        runApi: "Run API",

        fillRequired: "Please fill in the required fields.",
        somethingWrong: "Something went wrong.",
        networkError: "Network connection error.",
        countryNotFound: "Country not found.",
        apiError: "Failed to get API data."
    }
};

let currentLanguage =
    storage.get("zuno_language", "uz") || "uz";

function t(key) {
    return (
        translations[currentLanguage]?.[key] ||
        translations.uz[key] ||
        key
    );
}


/* =========================================================
   LANGUAGE
========================================================= */

function applyLanguage() {

    document.documentElement.lang = currentLanguage;

    $$("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        const value = t(key);

        if (value) {
            el.textContent = value;
        }
    });

    $$("[data-i18n-placeholder]").forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        el.placeholder = t(key);
    });

    $$("[data-i18n-title]").forEach(el => {
        const key = el.dataset.i18nTitle;
        el.title = t(key);
    });

    const select = $("#languageSelect");

    if (select) {
        select.value = currentLanguage;
    }

    updateDynamicLanguage();
    storage.set("zuno_language", currentLanguage);
}

function changeLanguage(lang) {

    if (!translations[lang]) return;

    currentLanguage = lang;

    playSound("click");
    applyLanguage();

    showToast(
        lang === "uz"
            ? "Til o‘zgartirildi."
            : lang === "ru"
                ? "Язык изменён."
                : "Language changed."
    );
}

function updateDynamicLanguage() {

    const search = $("#globalSearch");
    if (search) search.placeholder = t("search");

    const messageInput = $("#messageInput");
    if (messageInput) messageInput.placeholder = t("typeMessage");

    const commentInputs = $$(".comment-input");

    commentInputs.forEach(input => {
        input.placeholder = t("writeComment");
    });

    renderPosts();
    renderStories();
    renderMessages();
    renderForum();
    renderProfile();
}


/* =========================================================
   THEME
========================================================= */

function initTheme() {

    const saved = storage.get("zuno_theme", "light");

    if (saved === "dark") {
        document.body.classList.add("dark");
    }

    updateThemeButton();
}

function toggleTheme() {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    storage.set(
        "zuno_theme",
        dark ? "dark" : "light"
    );

    updateThemeButton();
    playSound("click");
}

function updateThemeButton() {

    const btn = $("#themeToggle");

    if (!btn) return;

    const dark =
        document.body.classList.contains("dark");

    btn.innerHTML = dark ? "☀️" : "🌙";
    btn.title = dark
        ? "Day mode"
        : "Night mode";
}


/* =========================================================
   NAVIGATION
========================================================= */

function openPage(id, button = null) {

    $$(".page").forEach(page => {
        page.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (!target) {
        console.warn("Page not found:", id);
        return;
    }

    target.classList.add("active");

    $$(".nav").forEach(nav => {
        nav.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    } else {

        const matching =
            $$(".nav").find(
                nav =>
                    nav.dataset.page === id ||
                    nav.getAttribute("onclick")?.includes(`'${id}'`)
            );

        matching?.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    playSound("click");

    if (id === "social") {
        renderPosts();
        renderStories();
    }

    if (id === "messages") {
        renderMessages();
    }

    if (id === "forum") {
        renderForum();
    }

    if (id === "profile") {
        renderProfile();
    }
}

function openById(id) {
    openPage(id);
}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {

    let toast = $("#toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";
        toast.className = "toast";

        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}


/* =========================================================
   SOUND EFFECTS
========================================================= */

let audioContext = null;

function playSound(type = "click") {

    try {

        if (!audioContext) {
            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        const now =
            audioContext.currentTime;

        const frequencies = {
            click: 420,
            success: 620,
            message: 520,
            error: 180
        };

        oscillator.frequency.value =
            frequencies[type] || 420;

        oscillator.type = "sine";

        gain.gain.setValueAtTime(
            0.0001,
            now
        );

        gain.gain.exponentialRampToValueAtTime(
            0.045,
            now + 0.01
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            now + 0.09
        );

        oscillator.start(now);
        oscillator.stop(now + 0.1);

    } catch {}
}


/* =========================================================
   USER PROFILE
========================================================= */

let profile =
    storage.get("zuno_profile", {

        name: "Abduraximova Karomatxon",
        username: "karomatxon",
        bio: "Creative developer • Designer • ZunoHub creator",
        location: "Uzbekistan",
        role: "Developer",
        avatar: ""
    });

function renderAvatarHTML(className = "avatar") {

    if (profile.avatar) {

        return `
            <img
                class="${className}"
                src="${escapeHTML(profile.avatar)}"
                alt="${escapeHTML(profile.name)}"
                onerror="this.style.display='none';this.nextElementSibling.style.display='grid';"
            >
            <span
                class="${className}"
                style="display:none"
            >${escapeHTML(initials(profile.name))}</span>
        `;
    }

    return `
        <span class="${className}">
            ${escapeHTML(initials(profile.name))}
        </span>
    `;
}

function renderProfile() {

    const name =
        $("#profileName");

    const username =
        $("#profileUsername");

    const bio =
        $("#profileBio");

    const location =
        $("#profileLocation");

    const role =
        $("#profileRole");

    if (name) name.textContent = profile.name;
    if (username) username.textContent = "@" + profile.username;
    if (bio) bio.textContent = profile.bio;
    if (location) location.textContent = profile.location;
    if (role) role.textContent = profile.role;

    $$(".profile-avatar-container").forEach(el => {
        el.innerHTML =
            renderAvatarHTML("profile-avatar");
    });

    $$(".user-avatar-container").forEach(el => {
        el.innerHTML =
            renderAvatarHTML("avatar");
    });
}

function openEditProfile() {

    const modal = $("#editProfileModal");

    if (!modal) {
        createEditProfileModal();
        return openEditProfile();
    }

    $("#editName").value = profile.name;
    $("#editUsername").value = profile.username;
    $("#editBio").value = profile.bio;
    $("#editLocation").value = profile.location;
    $("#editRole").value = profile.role;
    $("#editAvatar").value = profile.avatar || "";

    openModal("editProfileModal");
}

function saveProfile() {

    const name = $("#editName")?.value.trim();
    const username = $("#editUsername")?.value.trim();
    const bio = $("#editBio")?.value.trim();
    const location = $("#editLocation")?.value.trim();
    const role = $("#editRole")?.value.trim();
    const avatar = $("#editAvatar")?.value.trim();

    if (!name || !username) {
        showToast(t("fillRequired"));
        playSound("error");
        return;
    }

    profile = {
        name,
        username,
        bio,
        location,
        role,
        avatar
    };

    storage.set("zuno_profile", profile);

    renderProfile();

    closeModal("editProfileModal");

    showToast(t("profileUpdated"));
    playSound("success");
}

function createEditProfileModal() {

    if ($("#editProfileModal")) return;

    const modal =
        document.createElement("div");

    modal.id = "editProfileModal";
    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-box">

            <div class="modal-head">
                <h2>${t("edit")} ${t("profile")}</h2>

                <button
                    class="close"
                    onclick="closeModal('editProfileModal')"
                >×</button>
            </div>

            <input
                id="editName"
                class="input"
                placeholder="${t("fullName")}"
            >

            <input
                id="editUsername"
                class="input"
                placeholder="${t("username")}"
            >

            <textarea
                id="editBio"
                class="input"
                placeholder="${t("bio")}"
            ></textarea>

            <input
                id="editLocation"
                class="input"
                placeholder="${t("location")}"
            >

            <input
                id="editRole"
                class="input"
                placeholder="${t("role")}"
            >

            <input
                id="editAvatar"
                class="input"
                placeholder="${t("avatarUrl")}"
            >

            <div class="modal-actions">

                <button
                    class="btn secondary"
                    onclick="closeModal('editProfileModal')"
                >
                    ${t("cancel")}
                </button>

                <button
                    class="btn"
                    onclick="saveProfile()"
                >
                    ${t("save")}
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(modal);
}


/* =========================================================
   STORIES
========================================================= */

let stories =
    storage.get("zuno_stories", [
        {
            id: 1,
            name: "Karomatxon",
            text: "Welcome to ZunoHub"
        },
        {
            id: 2,
            name: "Malika",
            text: "New design idea ✨"
        },
        {
            id: 3,
            name: "Aziza",
            text: "Working on my project"
        }
    ]);

function renderStories() {

    const container =
        $("#storiesContainer") ||
        $(".stories");

    if (!container) return;

    container.innerHTML = stories
        .map(story => `
            <div
                class="story"
                onclick="viewStory(${story.id})"
            >

                <div class="story-avatar">

                    <div class="story-avatar-inner">
                        ${escapeHTML(initials(story.name))}
                    </div>

                </div>

                <div class="story-name">
                    ${escapeHTML(story.name)}
                </div>

            </div>
        `)
        .join("");

}

function addStory() {

    const text =
        prompt(
            currentLanguage === "uz"
                ? "Story matnini yozing:"
                : currentLanguage === "ru"
                    ? "Введите текст story:"
                    : "Write your story:"
        );

    if (!text?.trim()) return;

    stories.unshift({
        id: Date.now(),
        name: profile.name,
        text: text.trim()
    });

    storage.set("zuno_stories", stories);

    renderStories();

    showToast(t("storyCreated"));
    playSound("success");
}

function viewStory(id) {

    const story =
        stories.find(s => s.id === id);

    if (!story) return;

    showSimpleModal(
        escapeHTML(story.name),
        `
            <div style="
                padding:35px 15px;
                text-align:center;
                font-size:22px;
                line-height:1.6;
            ">
                ${escapeHTML(story.text)}
            </div>
        `
    );
}


/* =========================================================
   POSTS
========================================================= */

let posts =
    storage.get("zuno_posts", [
        {
            id: 101,
            user: "Malika Karimova",
            username: "malika",
            avatar: "MK",
            time: "2h",
            text: "Bugun yangi UI loyiham ustida ishlayapman. Fikrlaringizni kutaman ✨",
            image: "",
            likes: 24,
            liked: false,
            comments: [
                {
                    user: "Aziza",
                    text: "Juda chiroyli chiqibdi!"
                }
            ]
        },
        {
            id: 102,
            user: "Aziza Saidova",
            username: "aziza",
            avatar: "AS",
            time: "5h",
            text: "Dasturlashda eng muhim narsa — har kuni ozgina bo‘lsa ham o‘rganish.",
            image: "",
            likes: 41,
            liked: false,
            comments: []
        }
    ]);

function renderPosts() {

    const container =
        $("#postsContainer") ||
        $(".feed-posts");

    if (!container) return;

    if (!posts.length) {

        container.innerHTML = `
            <div class="card" style="padding:30px;text-align:center">
                <p style="color:var(--muted)">
                    ${t("noPosts")}
                </p>
            </div>
        `;

        return;
    }

    container.innerHTML =
        posts.map(post => {

            const comments =
                (post.comments || [])
                    .map(comment => `
                        <div class="comment">
                            <strong>
                                ${escapeHTML(comment.user)}
                            </strong>
                            <span>
                                ${escapeHTML(comment.text)}
                            </span>
                        </div>
                    `)
                    .join("");

            return `
                <article class="post card">

                    <div class="post-head">

                        <div class="post-avatar">
                            ${escapeHTML(post.avatar || initials(post.user))}
                        </div>

                        <div>
                            <div class="post-user">
                                ${escapeHTML(post.user)}
                            </div>

                            <div class="post-time">
                                @${escapeHTML(post.username || "user")}
                                · ${escapeHTML(post.time || t("now"))}
                            </div>
                        </div>

                    </div>

                    ${
                        post.image
                            ? `
                                <img
                                    class="post-image"
                                    src="${escapeHTML(post.image)}"
                                    alt=""
                                    onerror="this.remove()"
                                >
                            `
                            : ""
                    }

                    <div class="post-body">

                        <div class="post-actions">

                            <button
                                class="post-action ${post.liked ? "liked" : ""}"
                                onclick="toggleLike(${post.id})"
                            >
                                ${post.liked ? "❤️" : "♡"}
                            </button>

                            <button
                                class="post-action"
                                onclick="focusComment(${post.id})"
                            >
                                💬
                            </button>

                            <button
                                class="post-action"
                                onclick="sharePost(${post.id})"
                            >
                                ↗
                            </button>

                        </div>

                        <div class="likes">
                            ${post.likes || 0} ${t("likes")}
                        </div>

                        <div class="caption">
                            ${escapeHTML(post.text)}
                        </div>

                        <div class="comments">
                            ${comments}
                        </div>

                        <div class="comment-compose">

                            <input
                                id="comment-${post.id}"
                                class="comment-input"
                                placeholder="${t("writeComment")}"
                                onkeydown="commentEnter(event,${post.id})"
                            >

                            <button
                                class="btn small"
                                onclick="addComment(${post.id})"
                            >
                                ${t("send")}
                            </button>

                        </div>

                    </div>

                </article>
            `;
        }).join("");
}

function toggleLike(id) {

    const post =
        posts.find(p => p.id === id);

    if (!post) return;

    post.liked = !post.liked;

    post.likes =
        Math.max(
            0,
            (post.likes || 0) +
            (post.liked ? 1 : -1)
        );

    storage.set("zuno_posts", posts);

    renderPosts();

    showToast(
        post.liked
            ? t("liked")
            : t("unliked")
    );

    playSound("click");
}

function addComment(id) {

    const input =
        document.getElementById(`comment-${id}`);

    if (!input) return;

    const text = input.value.trim();

    if (!text) return;

    const post =
        posts.find(p => p.id === id);

    if (!post) return;

    if (!post.comments) {
        post.comments = [];
    }

    post.comments.push({
        user: profile.name,
        text
    });

    storage.set("zuno_posts", posts);

    renderPosts();

    showToast(
        currentLanguage === "uz"
            ? "Izoh qo‘shildi."
            : currentLanguage === "ru"
                ? "Комментарий добавлен."
                : "Comment added."
    );

    playSound("success");
}

function commentEnter(event, id) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {
        event.preventDefault();
        addComment(id);
    }
}

function focusComment(id) {

    setTimeout(() => {
        document
            .getElementById(`comment-${id}`)
            ?.focus();
    }, 100);
}

function sharePost(id) {

    const post =
        posts.find(p => p.id === id);

    if (!post) return;

    const text =
        `${post.user}: ${post.text}`;

    if (navigator.share) {

        navigator.share({
            title: "ZunoHub",
            text
        }).catch(() => {});

    } else {

        navigator.clipboard
            ?.writeText(text)
            .then(() => {
                showToast(
                    currentLanguage === "uz"
                        ? "Post nusxalandi."
                        : currentLanguage === "ru"
                            ? "Пост скопирован."
                            : "Post copied."
                );
            });
    }
}


/* =========================================================
   CREATE POST
========================================================= */

function openCreatePost() {

    showSimpleModal(
        t("createPost"),
        `
            <textarea
                id="newPostText"
                class="input"
                placeholder="${t("writeComment")}"
            ></textarea>

            <input
                id="newPostImage"
                class="input"
                placeholder="Image URL (optional)"
            >

            <div class="modal-actions">

                <button
                    class="btn secondary"
                    onclick="closeModal('simpleModal')"
                >
                    ${t("cancel")}
                </button>

                <button
                    class="btn"
                    onclick="createPost()"
                >
                    ${t("create")}
                </button>

            </div>
        `
    );
}

function createPost() {

    const text =
        $("#newPostText")?.value.trim();

    const image =
        $("#newPostImage")?.value.trim();

    if (!text) {

        showToast(t("fillRequired"));
        playSound("error");

        return;
    }

    posts.unshift({

        id: Date.now(),

        user: profile.name,

        username: profile.username,

        avatar: initials(profile.name),

        time: t("now"),

        text,

        image,

        likes: 0,

        liked: false,

        comments: []
    });

    storage.set("zuno_posts", posts);

    closeModal("simpleModal");

    renderPosts();

    showToast(t("postCreated"));
    playSound("success");
}


/* =========================================================
   MESSAGES
========================================================= */

let chats =
    storage.get("zuno_chats", {

        malika: {
            name: "Malika Karimova",
            avatar: "MK",
            messages: [
                {
                    text: "Salom! ZunoHub qanday ketyapti?",
                    me: false,
                    time: "10:21"
                },
                {
                    text: "Yaxshi! Yangi funksiyalar qo‘shyapman 😊",
                    me: true,
                    time: "10:23"
                }
            ]
        },

        aziza: {
            name: "Aziza Saidova",
            avatar: "AS",
            messages: [
                {
                    text: "Bugun forumga kirdingmi?",
                    me: false,
                    time: "09:12"
                }
            ]
        },

        developer: {
            name: "Dev Community",
            avatar: "DC",
            messages: [
                {
                    text: "Welcome to the developer chat.",
                    me: false,
                    time: "Yesterday"
                }
            ]
        }
    });

let activeChat =
    storage.get(
        "zuno_active_chat",
        Object.keys(chats)[0]
    );

function renderMessages() {

    renderChatList();
    renderActiveChat();
}

function renderChatList() {

    const list =
        $("#chatUsers") ||
        $(".chat-users");

    if (!list) return;

    list.innerHTML =
        Object.entries(chats)
            .map(([id, chat]) => {

                const last =
                    chat.messages?.at(-1);

                return `
                    <div
                        class="chat-user ${id === activeChat ? "active" : ""}"
                        onclick="selectChat('${escapeHTML(id)}')"
                    >

                        <div class="chat-avatar">
                            ${escapeHTML(chat.avatar)}
                        </div>

                        <div class="chat-user-info">

                            <strong>
                                ${escapeHTML(chat.name)}
                            </strong>

                            <span>
                                ${escapeHTML(last?.text || t("noMessages"))}
                            </span>

                        </div>

                        <small>
                            ${escapeHTML(last?.time || "")}
                        </small>

                    </div>
                `;
            })
            .join("");
}

function renderActiveChat() {

    const chat =
        chats[activeChat];

    if (!chat) return;

    const title =
        $("#chatTitle");

    if (title) {
        title.textContent = chat.name;
    }

    const avatar =
        $("#chatHeaderAvatar");

    if (avatar) {
        avatar.textContent = chat.avatar;
    }

    const messages =
        $("#messagesList") ||
        $(".messages");

    if (!messages) return;

    messages.innerHTML =
        (chat.messages || [])
            .map(message => `
                <div class="message ${message.me ? "me" : ""}">

                    <div>
                        ${escapeHTML(message.text)}
                    </div>

                    <div class="message-time">
                        ${escapeHTML(message.time || "")}
                    </div>

                </div>
            `)
            .join("");

    messages.scrollTop =
        messages.scrollHeight;
}

function selectChat(id) {

    if (!chats[id]) return;

    activeChat = id;

    storage.set(
        "zuno_active_chat",
        activeChat
    );

    renderMessages();
}

function sendMessage() {

    const input =
        $("#messageInput");

    if (!input) return;

    const text =
        input.value.trim();

    if (!text) return;

    if (!chats[activeChat]) return;

    const now =
        new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    chats[activeChat].messages.push({

        text,

        me: true,

        time: now
    });

    storage.set("zuno_chats", chats);

    input.value = "";

    renderMessages();

    showToast(t("messageSent"));

    playSound("message");

    setTimeout(() => {

        if (!chats[activeChat]) return;

        const chat =
            chats[activeChat];

        const replies = [
            "Zo‘r fikr!",
            "Ha, albatta 😊",
            "Qiziqarli ekan!",
            "Keyinroq ko‘rib chiqaman.",
            "Ajoyib!"
        ];

        const reply =
            replies[
                Math.floor(
                    Math.random() *
                    replies.length
                )
            ];

        chat.messages.push({
            text: reply,
            me: false,
            time: new Date().toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )
        });

        storage.set("zuno_chats", chats);

        renderMessages();

        playSound("message");

    }, 800);
}

function sendByEnter(event) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {
        event.preventDefault();
        sendMessage();
    }
}


/* =========================================================
   FORUM
========================================================= */

let forumTopics =
    storage.get("zuno_forum", [

        {
            id: 1,
            title: "Favorite UI design tools?",
            description:
                "Qaysi UI/UX tool sizga eng qulay?",
            author: "Malika",
            replies: 18,
            views: 242,
            tags: ["design", "ui"]
        },

        {
            id: 2,
            title: "What are you building this month?",
            description:
                "Hozir qaysi loyiha ustida ishlayapsiz?",
            author: "Aziza",
            replies: 12,
            views: 189,
            tags: ["projects", "community"]
        },

        {
            id: 3,
            title: "Share useful learning resources",
            description:
                "Foydali kurslar, saytlar va kitoblarni ulashing.",
            author: "Karomatxon",
            replies: 27,
            views: 421,
            tags: ["learning", "resources"]
        }
    ]);

function renderForum(filter = "") {

    const container =
        $("#forumTopics") ||
        $(".forum-list");

    if (!container) return;

    const list =
        forumTopics.filter(topic => {

            if (!filter) return true;

            const haystack =
                `${topic.title} ${topic.description} ${topic.tags.join(" ")}`
                    .toLowerCase();

            return haystack.includes(
                filter.toLowerCase()
            );
        });

    const rows =
        list.map(topic => `

            <div
                class="forum-row"
                onclick="openTopic(${topic.id})"
            >

                <div class="forum-main">

                    <div class="forum-icon">
                        💬
                    </div>

                    <div>

                        <h3>
                            ${escapeHTML(topic.title)}
                        </h3>

                        <p>
                            ${escapeHTML(topic.description)}
                        </p>

                        <div class="forum-tags">

                            ${topic.tags
                                .map(tag => `
                                    <span>
                                        #${escapeHTML(tag)}
                                    </span>
                                `)
                                .join("")}

                        </div>

                    </div>

                </div>

                <div class="forum-stats">

                    <strong>
                        ${topic.replies}
                    </strong>

                    <span>
                        ${t("replies")}
                    </span>

                    <br>

                    <strong>
                        ${topic.views}
                    </strong>

                    <span>
                        ${t("views")}
                    </span>

                </div>

            </div>

        `).join("");

    if (
        container.classList.contains("forum-list")
    ) {

        const old =
            container.querySelector(
                ".forum-row"
            );

        if (old) {

            const rowsOnly =
                container.querySelectorAll(
                    ".forum-row"
                );

            rowsOnly.forEach(x => x.remove());

            container.insertAdjacentHTML(
                "beforeend",
                rows
            );

            return;
        }
    }

    container.innerHTML = rows;
}

function openCreateTopic() {

    showSimpleModal(
        t("newTopic"),
        `

            <input
                id="topicTitle"
                class="input"
                placeholder="${t("topicTitle")}"
            >

            <textarea
                id="topicDescription"
                class="input"
                placeholder="${t("topicDescription")}"
            ></textarea>

            <input
                id="topicTags"
                class="input"
                placeholder="design, coding, learning"
            >

            <div class="modal-actions">

                <button
                    class="btn secondary"
                    onclick="closeModal('simpleModal')"
                >
                    ${t("cancel")}
                </button>

                <button
                    class="btn"
                    onclick="createTopic()"
                >
                    ${t("create")}
                </button>

            </div>

        `
    );
}

function createTopic() {

    const title =
        $("#topicTitle")?.value.trim();

    const description =
        $("#topicDescription")?.value.trim();

    const tags =
        $("#topicTags")?.value
            .split(",")
            .map(x => x.trim())
            .filter(Boolean);

    if (!title || !description) {

        showToast(t("fillRequired"));
        playSound("error");

        return;
    }

    forumTopics.unshift({

        id: Date.now(),

        title,

        description,

        author: profile.name,

        replies: 0,

        views: 0,

        tags:
            tags.length
                ? tags
                : ["community"]
    });

    storage.set(
        "zuno_forum",
        forumTopics
    );

    closeModal("simpleModal");

    renderForum();

    showToast(t("topicCreated"));
    playSound("success");
}

function openTopic(id) {

    const topic =
        forumTopics.find(
            topic => topic.id === id
        );

    if (!topic) return;

    topic.views++;

    storage.set(
        "zuno_forum",
        forumTopics
    );

    showSimpleModal(

        escapeHTML(topic.title),

        `

            <div class="discussion-content">

                <h3>
                    ${escapeHTML(topic.title)}
                </h3>

                <p>
                    ${escapeHTML(topic.description)}
                </p>

                <div class="forum-tags">

                    ${topic.tags
                        .map(tag => `
                            <span>
                                #${escapeHTML(tag)}
                            </span>
                        `)
                        .join("")}

                </div>

            </div>

            <div class="discussion-replies">

                <div class="reply">

                    <strong>
                        ${escapeHTML(topic.author)}
                    </strong>

                    <p>
                        ${escapeHTML(topic.description)}
                    </p>

                </div>

            </div>

            <div class="reply-compose">

                <input
                    id="replyInput"
                    class="input"
                    placeholder="${t("writeComment")}"
                    onkeydown="replyEnter(event,${topic.id})"
                >

                <button
                    class="btn"
                    onclick="addForumReply(${topic.id})"
                >
                    ${t("send")}
                </button>

            </div>
        `
    );
}

function addForumReply(id) {

    const input =
        $("#replyInput");

    const text =
        input?.value.trim();

    if (!text) return;

    const topic =
        forumTopics.find(
            topic => topic.id === id
        );

    if (!topic) return;

    topic.replies++;

    storage.set(
        "zuno_forum",
        forumTopics
    );

    closeModal("simpleModal");

    showToast(
        currentLanguage === "uz"
            ? "Javob qo‘shildi."
            : currentLanguage === "ru"
                ? "Ответ добавлен."
                : "Reply added."
    );

    playSound("success");

    renderForum();
}

function replyEnter(event, id) {

    if (
        event.key === "Enter"
    ) {
        event.preventDefault();
        addForumReply(id);
    }
}


/* =========================================================
   COMMUNITY
========================================================= */

let joinedCommunities =
    storage.get(
        "zuno_joined_communities",
        []
    );

function joinCommunity(id, name) {

    if (
        joinedCommunities.includes(id)
    ) {

        showToast(
            currentLanguage === "uz"
                ? "Siz allaqachon qo‘shilgansiz."
                : currentLanguage === "ru"
                    ? "Вы уже участник."
                    : "You already joined."
        );

        return;
    }

    joinedCommunities.push(id);

    storage.set(
        "zuno_joined_communities",
        joinedCommunities
    );

    const button =
        document.querySelector(
            `[data-community-id="${CSS.escape(id)}"]`
        );

    if (button) {
        button.textContent = t("joined");
        button.disabled = true;
    }

    showToast(
        currentLanguage === "uz"
            ? `${name} community'iga qo‘shildingiz.`
            : currentLanguage === "ru"
                ? `Вы вступили в ${name}.`
                : `You joined ${name}.`
    );

    playSound("success");
}


/* =========================================================
   BLOG
========================================================= */

const blogArticles = {

    html: "https://developer.mozilla.org/en-US/docs/Web/HTML",

    css: "https://developer.mozilla.org/en-US/docs/Web/CSS",

    javascript:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript",

    design:
        "https://m3.material.io/",

    web:
        "https://web.dev/"
};

function openArticle(key) {

    const url =
        blogArticles[key];

    if (!url) {

        showToast(t("somethingWrong"));
        return;
    }

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

    showToast(t("articleOpened"));
    playSound("success");
}


/* =========================================================
   COUNTRY EXPLORER
========================================================= */

async function searchCountry() {

    const input =
        $("#countryInput");

    const result =
        $("#countryResult");

    if (!input || !result) return;

    const name =
        input.value.trim();

    if (!name) {

        showToast(t("fillRequired"));
        return;
    }

    result.innerHTML = `
        <div class="card" style="padding:25px">
            ⏳ ${t("search")}
        </div>
    `;

    try {

        const response =
            await fetch(
                `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=false`
            );

        if (!response.ok) {
            throw new Error("Country not found");
        }

        const data =
            await response.json();

        const country =
            data[0];

        const currencies =
            country.currencies
                ? Object.entries(country.currencies)
                    .map(
                        ([code, value]) =>
                            `${code} — ${value.name}`
                    )
                    .join("<br>")
                : "—";

        const languages =
            country.languages
                ? Object.values(
                    country.languages
                ).join(", ")
                : "—";

        result.innerHTML = `

            <div
                class="card"
                style="padding:25px"
            >

                <div
                    style="
                        display:flex;
                        gap:20px;
                        align-items:center;
                        flex-wrap:wrap;
                    "
                >

                    <img
                        src="${escapeHTML(country.flags?.svg || country.flags?.png || "")}"
                        alt=""
                        style="
                            width:130px;
                            border-radius:12px;
                            border:1px solid var(--border);
                        "
                    >

                    <div>

                        <h2>
                            ${escapeHTML(country.name?.common || "—")}
                        </h2>

                        <p
                            style="
                                color:var(--muted);
                                margin-top:5px;
                            "
                        >
                            ${escapeHTML(country.name?.official || "")}
                        </p>

                    </div>

                </div>

                <div
                    style="
                        display:grid;
                        grid-template-columns:
                            repeat(auto-fit,minmax(180px,1fr));
                        gap:12px;
                        margin-top:22px;
                    "
                >

                    <div class="card" style="padding:15px">
                        <b>🌍 Region</b>
                        <p style="color:var(--muted);margin-top:5px">
                            ${escapeHTML(country.region || "—")}
                        </p>
                    </div>

                    <div class="card" style="padding:15px">
                        <b>🏙️ Capital</b>
                        <p style="color:var(--muted);margin-top:5px">
                            ${escapeHTML(country.capital?.[0] || "—")}
                        </p>
                    </div>

                    <div class="card" style="padding:15px">
                        <b>👥 Population</b>
                        <p style="color:var(--muted);margin-top:5px">
                            ${(country.population || 0).toLocaleString()}
                        </p>
                    </div>

                    <div class="card" style="padding:15px">
                        <b>🗣️ Languages</b>
                        <p style="color:var(--muted);margin-top:5px">
                            ${escapeHTML(languages)}
                        </p>
                    </div>

                    <div class="card" style="padding:15px">
                        <b>💰 Currency</b>
                        <p style="color:var(--muted);margin-top:5px">
                            ${currencies}
                        </p>
                    </div>

                </div>

            </div>
        `;

        playSound("success");

    } catch {

        result.innerHTML = `
            <div
                class="card"
                style="
                    padding:25px;
                    color:var(--danger);
                "
            >
                ${t("countryNotFound")}
            </div>
        `;

        playSound("error");
    }
}


/* =========================================================
   CURRENCY EXCHANGE
========================================================= */

async function convertCurrency() {

    const from =
        $("#fromCurrency")?.value.trim().toUpperCase();

    const to =
        $("#toCurrency")?.value.trim().toUpperCase();

    const amount =
        Number(
            $("#currencyAmount")?.value
        );

    const result =
        $("#currencyResult");

    if (!from || !to || !amount) {

        showToast(t("fillRequired"));
        return;
    }

    if (result) {

        result.innerHTML = `
            <div style="padding:15px">
                ⏳ ${t("search")}
            </div>
        `;
    }

    try {

        const response =
            await fetch(
                `https://api.frankfurter.app/latest?amount=${encodeURIComponent(amount)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
            );

        if (!response.ok) {
            throw new Error("Currency error");
        }

        const data =
            await response.json();

        const value =
            data.rates?.[to];

        if (value === undefined) {
            throw new Error("Unsupported currency");
        }

        result.innerHTML = `

            <div
                class="card"
                style="
                    padding:25px;
                    text-align:center;
                "
            >

                <div
                    style="
                        color:var(--muted);
                        font-size:13px;
                    "
                >
                    ${amount.toLocaleString()}
                    ${escapeHTML(from)}
                </div>

                <div
                    style="
                        margin:8px 0;
                        font-size:36px;
                        font-weight:850;
                    "
                >
                    ${Number(value).toLocaleString(
                        undefined,
                        {
                            maximumFractionDigits:4
                        }
                    )}
                    ${escapeHTML(to)}
                </div>

                <div
                    style="
                        color:var(--muted);
                        font-size:11px;
                    "
                >
                    ${escapeHTML(data.date || "")}
                </div>

            </div>
        `;

        playSound("success");

    } catch {

        if (result) {

            result.innerHTML = `
                <div
                    class="card"
                    style="
                        padding:20px;
                        color:var(--danger);
                    "
                >
                    ${t("networkError")}
                </div>
            `;
        }

        playSound("error");
    }
}


/* =========================================================
   PUBLIC API EXPLORER
========================================================= */

async function runPublicAPI() {

    const input =
        $("#apiUrl");

    const output =
        $("#apiResult");

    if (!input || !output) return;

    const url =
        input.value.trim();

    if (!url) {

        showToast(t("fillRequired"));
        return;
    }

    try {

        new URL(url);

    } catch {

        output.textContent =
            "Invalid URL";

        return;
    }

    output.innerHTML = `
        <div style="padding:15px">
            ⏳ Loading...
        </div>
    `;

    try {

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const contentType =
            response.headers.get(
                "content-type"
            ) || "";

        if (
            contentType.includes(
                "application/json"
            )
        ) {

            const data =
                await response.json();

            output.innerHTML = `
                <pre style="
                    margin:0;
                    white-space:pre-wrap;
                    overflow:auto;
                    color:var(--text);
                    font-size:12px;
                    line-height:1.6;
                ">${escapeHTML(
                    JSON.stringify(data, null, 2)
                )}</pre>
            `;

        } else {

            const text =
                await response.text();

            output.innerHTML = `
                <pre style="
                    margin:0;
                    white-space:pre-wrap;
                    overflow:auto;
                    color:var(--text);
                    font-size:12px;
                    line-height:1.6;
                ">${escapeHTML(text)}</pre>
            `;
        }

        playSound("success");

    } catch (error) {

        output.innerHTML = `
            <div
                style="
                    padding:15px;
                    color:var(--danger);
                "
            >
                ${t("apiError")}<br>
                ${escapeHTML(error.message)}
            </div>
        `;

        playSound("error");
    }
}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

function globalSearch(event) {

    const query =
        (
            event?.target?.value ||
            $("#globalSearch")?.value ||
            ""
        )
        .trim()
        .toLowerCase();

    if (!query) return;

    const pages = [
        {
            id: "home",
            words: [
                "home",
                "bosh",
                "главная"
            ]
        },
        {
            id: "social",
            words: [
                "social",
                "feed",
                "post",
                "story",
                "ijtimoiy"
            ]
        },
        {
            id: "messages",
            words: [
                "message",
                "messages",
                "chat",
                "xabar",
                "сообщ"
            ]
        },
        {
            id: "community",
            words: [
                "community",
                "hamjamiyat",
                "сообщество"
            ]
        },
        {
            id: "forum",
            words: [
                "forum",
                "mavzu",
                "форум"
            ]
        },
        {
            id: "videos",
            words: [
                "video",
                "videos",
                "video"
            ]
        },
        {
            id: "blog",
            words: [
                "blog",
                "article",
                "maqola",
                "блог"
            ]
        },
        {
            id: "profile",
            words: [
                "profile",
                "profil",
                "профиль"
            ]
        }
    ];

    const match =
        pages.find(page =>
            page.words.some(
                word =>
                    word.includes(query) ||
                    query.includes(word)
            )
        );

    if (match) {

        openPage(match.id);

        showToast(
            currentLanguage === "uz"
                ? `"${query}" bo‘yicha bo‘lim topildi.`
                : currentLanguage === "ru"
                    ? `Раздел по запросу "${query}" найден.`
                    : `Section for "${query}" found.`
        );

        return;
    }

    const postMatch =
        posts.find(post =>
            `${post.user} ${post.text}`
                .toLowerCase()
                .includes(query)
        );

    if (postMatch) {

        openPage("social");
        focusComment(postMatch.id);

        return;
    }

    const topicMatch =
        forumTopics.find(topic =>
            `${topic.title} ${topic.description}`
                .toLowerCase()
                .includes(query)
        );

    if (topicMatch) {

        openPage("forum");
        openTopic(topicMatch.id);

        return;
    }

    showToast(
        currentLanguage === "uz"
            ? "Hech narsa topilmadi."
            : currentLanguage === "ru"
                ? "Ничего не найдено."
                : "Nothing found."
    );
}


/* =========================================================
   MODALS
========================================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.add("show");

    setTimeout(() => {

        modal
            .querySelector(
                "input, textarea, select"
            )
            ?.focus();

    }, 80);
}

function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("show");
}

function showSimpleModal(title, content) {

    let modal =
        $("#simpleModal");

    if (!modal) {

        modal =
            document.createElement("div");

        modal.id = "simpleModal";
        modal.className = "modal";

        document.body.appendChild(modal);
    }

    modal.innerHTML = `

        <div class="modal-box">

            <div class="modal-head">

                <h2>
                    ${title}
                </h2>

                <button
                    class="close"
                    onclick="closeModal('simpleModal')"
                >
                    ×
                </button>

            </div>

            ${content}

        </div>
    `;

    openModal("simpleModal");
}


/* =========================================================
   VIDEO PLAYER
========================================================= */

function playVideo(url, title = "") {

    const iframe =
        $("#mainVideo");

    if (!iframe) return;

    iframe.src = url;

    const titleElement =
        $("#videoTitle");

    if (titleElement && title) {
        titleElement.textContent = title;
    }

    $$(".video-item").forEach(item => {
        item.classList.remove("active");
    });

    playSound("click");
}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            $$(".modal.show")
                .forEach(modal => {
                    modal.classList.remove("show");
                });
        }

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            $("#globalSearch")?.focus();
        }
    }
);


/* =========================================================
   MODAL BACKDROP
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {
            event.target.classList.remove(
                "show"
            );
        }
    }
);


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initTheme();

        createEditProfileModal();

        applyLanguage();

        renderStories();

        renderPosts();

        renderMessages();

        renderForum();

        renderProfile();

        /* language selector */

        $("#languageSelect")
            ?.addEventListener(
                "change",
                event => {
                    changeLanguage(
                        event.target.value
                    );
                }
            );

        /* theme */

        $("#themeToggle")
            ?.addEventListener(
                "click",
                toggleTheme
            );

        /* search */

        $("#globalSearch")
            ?.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter"
                    ) {
                        globalSearch(event);
                    }
                }
            );

        /* message input */

        $("#messageInput")
            ?.addEventListener(
                "keydown",
                sendByEnter
            );

        /* forum search */

        $("#forumSearch")
            ?.addEventListener(
                "input",
                event => {
                    renderForum(
                        event.target.value
                    );
                }
            );

        /* country */

        $("#countryInput")
            ?.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter"
                    ) {
                        searchCountry();
                    }
                }
            );

        /* currency */

        $("#currencyAmount")
            ?.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter"
                    ) {
                        convertCurrency();
                    }
                }
            );

        /* api */

        $("#apiUrl")
            ?.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter"
                    ) {
                        runPublicAPI();
                    }
                }
            );

        /* first page */

        const activePage =
            $(".page.active");

        if (!activePage) {

            const home =
                $("#home");

            if (home) {
                home.classList.add(
                    "active"
                );
            }
        }

        console.log(
            "ZunoHub initialized successfully."
        );
    }
);


/* =========================================================
   GLOBAL EXPORTS
   HTML onclick uchun
========================================================= */

window.openPage = openPage;
window.openById = openById;

window.toggleTheme = toggleTheme;
window.changeLanguage = changeLanguage;

window.showToast = showToast;
window.playSound = playSound;

window.openModal = openModal;
window.closeModal = closeModal;

window.openCreatePost = openCreatePost;
window.createPost = createPost;

window.addStory = addStory;
window.viewStory = viewStory;

window.toggleLike = toggleLike;
window.addComment = addComment;
window.commentEnter = commentEnter;
window.focusComment = focusComment;
window.sharePost = sharePost;

window.sendMessage = sendMessage;
window.sendByEnter = sendByEnter;
window.selectChat = selectChat;

window.openCreateTopic = openCreateTopic;
window.createTopic = createTopic;
window.openTopic = openTopic;
window.addForumReply = addForumReply;
window.replyEnter = replyEnter;

window.joinCommunity = joinCommunity;

window.openArticle = openArticle;

window.searchCountry = searchCountry;
window.convertCurrency = convertCurrency;
window.runPublicAPI = runPublicAPI;

window.globalSearch = globalSearch;

window.openEditProfile = openEditProfile;
window.saveProfile = saveProfile;

window.playVideo = playVideo;