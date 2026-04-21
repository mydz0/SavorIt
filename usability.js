(function () {

  /* ── HELPERS ─────────────────────────────────────────────── */
  function showError(inputId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const group = input.closest('.field') || input.closest('.form-group');
    const errorEl = document.getElementById(inputId + '-error');
    if (group) group.classList.add('field--error', 'form-group--error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const group = input.closest('.field') || input.closest('.form-group');
    const errorEl = document.getElementById(inputId + '-error');
    if (group) group.classList.remove('field--error', 'form-group--error');
    if (errorEl) errorEl.textContent = '';
  }

  function setMsg(id, text, type) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.className = 'form-msg' + (type ? ' msg--' + type : '');
  }

  function setLoading(btn, loading) {
    if (!btn) return;
    if (loading) {
      btn.classList.add('btn-loading');
      btn.setAttribute('aria-disabled', 'true');
    } else {
      btn.classList.remove('btn-loading');
      btn.removeAttribute('aria-disabled');
    }
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  /* ── LOGIN FORM (H5 Prevenció errors + H9 Missatges clars) ── */
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    ['login-id', 'login-pw'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', function () { clearError(id); setMsg('login-msg', '', ''); });
    });

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const idVal = document.getElementById('login-id').value.trim();
      const pwVal = document.getElementById('login-pw').value;

      if (!idVal) {
        showError('login-id', 'Please enter your username or email.');
        valid = false;
      }
      if (!pwVal) {
        showError('login-pw', 'Please enter your password.');
        valid = false;
      } else if (pwVal.length < 6) {
        showError('login-pw', 'Password must be at least 6 characters.');
        valid = false;
      }

      if (!valid) {
        setMsg('login-msg', 'Please correct the errors above before continuing.', 'error');
        return;
      }

      const btn = loginForm.querySelector('[type="submit"]');
      setLoading(btn, true);
      setMsg('login-msg', '', '');

      /* Simulate async submission — replace with real fetch() */
      setTimeout(function () {
        setLoading(btn, false);
        setMsg('login-msg', 'Welcome back! Redirecting to your kitchen…', 'success');
      }, 1200);
    });
  }

  /* ── SIGNIN FORM ─────────────────────────────────────────── */
  const signinForm = document.getElementById('signin-form');
  if (signinForm) {
    ['si-id', 'si-pw', 'si-name', 'si-user'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', function () { clearError(id); setMsg('signin-msg', '', ''); });
    });

    signinForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const idVal   = document.getElementById('si-id').value.trim();
      const pwVal   = document.getElementById('si-pw').value;
      const nameVal = document.getElementById('si-name').value.trim();
      const userVal = document.getElementById('si-user').value.trim();
      const dobDay   = document.querySelector('[name="dob-day"]') ? document.querySelector('[name="dob-day"]').value : '';
      const dobMonth = document.querySelector('[name="dob-month"]') ? document.querySelector('[name="dob-month"]').value : '';
      const dobYear  = document.getElementById('dob-year') ? document.getElementById('dob-year').value : '';
      const dobErrorEl = document.getElementById('si-dob-error');

      if (!idVal) {
        showError('si-id', 'Please enter your username or email.');
        valid = false;
      } else if (idVal.indexOf('@') !== -1 && !isValidEmail(idVal)) {
        showError('si-id', 'Please enter a valid email address.');
        valid = false;
      }

      if (!pwVal) {
        showError('si-pw', 'Please create a password.');
        valid = false;
      } else if (pwVal.length < 8) {
        showError('si-pw', 'Password must be at least 8 characters.');
        valid = false;
      }

      if (!dobDay || !dobMonth || !dobYear) {
        if (dobErrorEl) dobErrorEl.textContent = 'Please enter your complete date of birth.';
        valid = false;
      } else {
        if (dobErrorEl) dobErrorEl.textContent = '';
      }

      if (!nameVal) {
        showError('si-name', 'Please enter your name.');
        valid = false;
      }

      if (!userVal) {
        showError('si-user', 'Please choose a username.');
        valid = false;
      } else if (userVal.length < 3) {
        showError('si-user', 'Username must be at least 3 characters.');
        valid = false;
      } else if (!/^[a-zA-Z0-9_.]+$/.test(userVal)) {
        showError('si-user', 'Only letters, numbers, _ and . are allowed.');
        valid = false;
      }

      if (!valid) {
        setMsg('signin-msg', 'Please correct the errors above before continuing.', 'error');
        return;
      }

      const btn = signinForm.querySelector('[type="submit"]');
      setLoading(btn, true);
      setMsg('signin-msg', '', '');

      setTimeout(function () {
        setLoading(btn, false);
        setMsg('signin-msg', 'Account created! Welcome to SavorIt.', 'success');
      }, 1400);
    });
  }

  /* ── ADD RECIPE FORM ─────────────────────────────────────── */
  const addForm = document.getElementById('add-recipe-form');
  if (addForm) {
    ['recipeName', 'recipeIngredients', 'recipeSteps', 'recipeUrl'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', function () { clearError(id); setMsg('recipe-msg', '', ''); });
    });

    addForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const nameVal  = document.getElementById('recipeName').value.trim();
      const ingVal   = document.getElementById('recipeIngredients').value.trim();
      const stepsVal = document.getElementById('recipeSteps').value.trim();
      const urlVal   = document.getElementById('recipeUrl').value.trim();

      if (!nameVal) {
        showError('recipeName', 'Please enter the recipe name.');
        valid = false;
      }
      if (!ingVal) {
        showError('recipeIngredients', 'Please list the ingredients.');
        valid = false;
      }
      if (!stepsVal) {
        showError('recipeSteps', 'Please describe the preparation steps.');
        valid = false;
      }
      if (urlVal && !urlVal.match(/^https?:\/\//)) {
        showError('recipeUrl', 'Please enter a valid URL starting with http:// or https://');
        valid = false;
      }

      if (!valid) {
        setMsg('recipe-msg', 'Please fill in the required fields marked above.', 'error');
        return;
      }

      const btn = addForm.querySelector('.btn-publish');
      setLoading(btn, true);
      setMsg('recipe-msg', '', '');

      setTimeout(function () {
        setLoading(btn, false);
        setMsg('recipe-msg', 'Recipe published successfully! The community can now find it.', 'success');
      }, 1400);
    });
  }

  /* ── EDIT PROFILE FORM ───────────────────────────────────── */
  const editForm = document.getElementById('edit-profile-form');
  if (editForm) {
    editForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = editForm.querySelector('.btn-save');
      setLoading(btn, true);
      setMsg('profile-msg', '', '');

      setTimeout(function () {
        setLoading(btn, false);
        setMsg('profile-msg', 'Profile saved successfully!', 'success');
      }, 1000);
    });
  }

  /* ── HAMBURGER MENU (NNGroup D – Coherència mòbil) ──────── */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      hamburger.textContent = open ? '✕' : '☰';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation menu');
        hamburger.textContent = '☰';
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation menu');
        hamburger.textContent = '☰';
        hamburger.focus();
      }
    });
  }

})();
