/*
 * Persistent Banner Plugin - Extremely Minimal
 * Keeps banner callouts visible while scrolling.
 */

const { Plugin } = require('obsidian');

class PersistentBannerPlugin extends Plugin {

    async onload() {
        this.observer = null;
        this.app.workspace.onLayoutReady(() => this.setup());
    }

    onunload() {
        if (this.observer) this.observer.disconnect();
        document.querySelectorAll('.persistent-banner-wrapper').forEach(el => el.remove());
    }

    setup() {
        // Process existing views
        this.processAllLeaves();

        // Watch for changes
        this.registerEvent(
            this.app.workspace.on('active-leaf-change', () => this.processAllLeaves())
        );
        this.registerEvent(
            this.app.workspace.on('layout-change', () => this.processAllLeaves())
        );

        // Mutation observer for dynamic content
        this.observer = new MutationObserver(() => this.processAllLeaves());
        this.observer.observe(document.body, { childList: true, subtree: true });
    }

    processAllLeaves() {
        this.app.workspace.iterateAllLeaves(leaf => {
            const container = leaf.view?.containerEl;
            if (!container) return;

            const dashboard = container.querySelector('.dashboard');
            if (dashboard) {
                this.persistBanner(dashboard, container);
            } else {
                // Clean up if no dashboard
                container.querySelector('.persistent-banner-wrapper')?.remove();
            }
        });
    }

    persistBanner(dashboard, leafContainer) {
        const banner = dashboard.querySelector('.callout[data-callout="banner"]');
        if (!banner) return;

        const viewContent = dashboard.closest('.view-content');
        if (!viewContent) return;

        // Skip if already done
        let wrapper = viewContent.querySelector('.persistent-banner-wrapper');
        const img = banner.querySelector('img');

        if (!img) return;

        const currentSrc = img.src;

        if (wrapper) {
            // Update if image changed
            const existingImg = wrapper.querySelector('img');
            if (existingImg && existingImg.src === currentSrc) return;
            wrapper.remove();
        }

        // Create wrapper
        wrapper = document.createElement('div');
        wrapper.className = 'persistent-banner-wrapper';
        wrapper.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: var(--dashboard-banner-height, 600px);
            z-index: 0;
            pointer-events: none;
            overflow: hidden;
        `;

        // Clone image
        const clonedImg = img.cloneNode(true);
        clonedImg.style.cssText = `
            width: 100%; height: 100%;
            object-fit: cover; object-position: center;
            border: none; border-radius: 0;
            -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
            mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
        `;
        wrapper.appendChild(clonedImg);
        viewContent.insertBefore(wrapper, viewContent.firstChild);

        // Hide original
        banner.style.visibility = 'hidden';
        banner.style.height = '0';
        banner.style.overflow = 'hidden';
    }
}

module.exports = PersistentBannerPlugin;
