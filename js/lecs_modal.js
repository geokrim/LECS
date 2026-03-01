(function () {
  function qsa(root, sel) {
    return Array.prototype.slice.call(root.querySelectorAll(sel));
  }

  function isOpen(modal) {
    return modal.classList.contains("is-open");
  }

  function open(modal) {
    modal.classList.remove("is-closing");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("no-scroll");
  }

  function close(modal) {
    modal.classList.add("is-closing");
    modal.setAttribute("aria-hidden", "true");
    window.setTimeout(function () {
      modal.classList.remove("is-open");
      modal.classList.remove("is-closing");
      document.documentElement.classList.remove("no-scroll");
    }, 150);
  }

  function getModal(el) {
    if (!el) return null;
    if (el.classList && el.classList.contains("lecs-modal")) return el;
    return el.closest ? el.closest(".lecs-modal") : null;
  }

  function wire(modal) {
    if (!modal || modal.__lecsWired) return;
    modal.__lecsWired = true;

    modal.addEventListener("click", function (e) {
      var t = e.target;
      if (!t) return;
      if (t.getAttribute && t.getAttribute("data-close") === "modal") {
        close(modal);
        return;
      }
      if (t.getAttribute && t.getAttribute("data-dismiss") === "modal") {
        close(modal);
        return;
      }
      var closeBtn = t.closest ? t.closest('[data-close="modal"],[data-dismiss="modal"]') : null;
      if (closeBtn) close(modal);
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen(modal)) close(modal);
    });
  }

  function openById(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    wire(modal);
    open(modal);
  }

  function closeById(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    wire(modal);
    close(modal);
  }

  window.LECS = window.LECS || {};
  window.LECS.modalOpen = openById;
  window.LECS.modalClose = closeById;

  if (window.jQuery && window.jQuery.fn && !window.jQuery.fn.modal) {
    window.jQuery.fn.modal = function (action) {
      return this.each(function () {
        var modal = this;
        wire(modal);
        if (action === "show") open(modal);
        if (action === "hide") close(modal);
        if (action === "toggle") (isOpen(modal) ? close(modal) : open(modal));
      });
    };
  }

  qsa(document, ".lecs-modal").forEach(wire);
})();
