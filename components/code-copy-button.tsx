"use client";

import { useEffect } from "react";

export function CodeCopyButtons() {
  useEffect(() => {
    function addCopyButtons() {
      // Find all pre elements that don't already have a copy button
      const preElements = document.querySelectorAll("article pre:not(.has-copy-btn)");

      preElements.forEach((pre) => {
        const preEl = pre as HTMLElement;
        if (pre.classList.contains("has-copy-btn")) return;

        pre.classList.add("has-copy-btn");

        // Get the code content
        const code = pre.querySelector("code");
        const codeText = code?.textContent || pre.textContent || "";

        // Create copy button
        const button = document.createElement("button");
        button.className = "absolute right-2 top-2 h-8 w-8 opacity-100 z-20 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center justify-center border border-gray-700 transition-opacity";
        button.setAttribute("aria-label", "Copy code");
        button.innerHTML = `
          <svg class="h-4 w-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        `;

        button.addEventListener("click", async () => {
          await navigator.clipboard.writeText(codeText);
          button.innerHTML = `
            <svg class="h-4 w-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          `;
          setTimeout(() => {
            button.innerHTML = `
              <svg class="h-4 w-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            `;
          }, 2000);
        });

        // Make pre relative
        const parent = pre.parentElement;
        if (parent && !parent.classList.contains("relative")) {
          parent.classList.add("relative");
        }

        preEl.style.position = "relative";
        preEl.appendChild(button);
      });
    }

    // Run on load
    addCopyButtons();

    // Run on navigation (for client-side routing)
    const observer = new MutationObserver(addCopyButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
