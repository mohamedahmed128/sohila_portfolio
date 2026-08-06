/* ==========================================================================
   chatbot.js — "Sohila AI": a static, button-only portfolio assistant.
   No free-text input and no external API calls — the visitor can only pick
   from a fixed list of ready-made questions, each mapped to a fixed answer.
   ========================================================================== */
(function(){
  "use strict";

  var QA_BANK = [
    {
      question: "What are her skills?",
      answer: "Sohila's core toolkit is Excel (Pivot Tables, XLOOKUP), SQL &amp; PL/SQL, and Power BI (DAX, data modeling, dashboards) — plus a growing foundation in Python (Pandas, NumPy) and Tableau for visualization. She also understands ETL processes and star-schema data warehousing."
    },
    {
      question: "What projects has she built?",
      answer: "Four stand out: an AI Career Recommendation &amp; Skill Gap Analyzer (her graduation project using Cosine Similarity, AHP &amp; TOPSIS), a Telco Customer Retention &amp; Churn dashboard, a Customer Behavior &amp; Campaign Performance dashboard, and a Marketing Performance &amp; Customer Analytics dashboard. Scroll to the Projects section to see all of them."
    },
    {
      question: "What's her work experience?",
      answer: "She trained as a Data Analyst at DEPI (Oct 2024 – May 2025), completed the Business Intelligence Track at ITI (Aug–Sept 2024), a Big Data Analysis programme with NTI &amp; ITIDA, and holds a Huawei certification (H13-711)."
    },
    {
      question: "How can I contact her?",
      answer: "You can reach Sohila at sohila2amer12@gmail.com, by phone at +20 106 521 3474, or on LinkedIn at linkedin.com/in/sohila-aamer. You'll find all of these in the Contact section of this page."
    },
    {
      question: "What's her education?",
      answer: "Sohila holds a B.Sc. in Computers &amp; Artificial Intelligence from Cairo University, majoring in Decision Support — graduating with a strong focus on data analysis and decision-making tools."
    },
    {
      question: "What's her career goal?",
      answer: "She's seeking a Junior Data Analyst role where she can apply her Excel, SQL and Power BI skills, gain hands-on experience, and grow in the data field while contributing real business impact."
    },
    {
      question: "What certifications does she have?",
      answer: "Highlights include the Data Analysis Track (DEPI), the Business Intelligence Track (ITI), Big Data Analysis training (NTI &amp; ITIDA), and a Huawei certification (H13-711). Check the Certificates section for the full gallery."
    },
    {
      question: "Where is she based?",
      answer: "Sohila is based in Cairo, Egypt, and is open to both remote and on-site Junior Data Analyst opportunities."
    },
    {
      question: "What tools does she use?",
      answer: "Power BI, Tableau, Excel, SQL Server, Python, Pandas, NumPy, and Matplotlib are her go-to tools for cleaning, analyzing, and visualizing data."
    },
    {
      question: "Tell me about her graduation project",
      answer: "Her graduation project is an AI Career Recommendation &amp; Skill Gap Analyzer: it matches user profiles to job roles using Cosine Similarity, ranks options with AHP &amp; TOPSIS, and highlights missing skills with suggested learning paths. It's built with Django, React, SQL, and Python."
    },
    {
      question: "What are her soft skills?",
      answer: "Strong attention to detail, analytical thinking, problem-solving, communication and data storytelling, plus the ability to learn quickly and adapt to new tools and business problems."
    },
    {
      question: "Say hello",
      answer: "Hi there! 👋 I'm Sohila AI — pick a question below to learn about her skills, projects, experience, education, or how to get in touch."
    }
  ];

  function addMessage(container, text, who){
    var msg = document.createElement('div');
    msg.className = 'chat-msg ' + who;
    msg.innerHTML = text;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
    return msg;
  }

  document.addEventListener('DOMContentLoaded', function(){
    var chatbot = document.getElementById('chatbot');
    var toggle = document.getElementById('chatbotToggle');
    var panel = document.getElementById('chatbotPanel');
    var messages = document.getElementById('chatbotMessages');
    var suggestionsWrap = document.getElementById('chatbotSuggestions');

    if(!chatbot || !toggle) return;

    var greeted = false;

    function renderSuggestions(){
      suggestionsWrap.innerHTML = '';
      QA_BANK.forEach(function(entry){
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chat-suggest';
        btn.textContent = entry.question;
        btn.addEventListener('click', function(){ handleQuestion(entry); });
        suggestionsWrap.appendChild(btn);
      });
    }

    // The visitor can only pick one of the ready-made questions above —
    // there is no free-text field, so every answer comes straight from QA_BANK.
    function handleQuestion(entry){
      addMessage(messages, entry.question, 'user');
      setTimeout(function(){
        addMessage(messages, entry.answer, 'bot');
      }, 380);
    }

    function openChat(){
      chatbot.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      panel.setAttribute('aria-hidden', 'false');
      if(!greeted){
        greeted = true;
        addMessage(messages, "Hi, I'm <strong>Sohila AI</strong> 👋 Pick a question below to learn about her skills, projects, experience, or how to get in touch.", 'bot');
        renderSuggestions();
      }
    }
    function closeChat(){
      chatbot.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
    }

    toggle.addEventListener('click', function(){
      chatbot.classList.contains('is-open') ? closeChat() : openChat();
    });

    // Hero CTA "chat with" hook (if present on page in future)
    var heroChatBtn = document.getElementById('chatbotOpenHero');
    if(heroChatBtn){
      heroChatBtn.addEventListener('click', openChat);
    }

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && chatbot.classList.contains('is-open')) closeChat();
    });
  });
})();
