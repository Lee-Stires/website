const LAB_ORIGIN_PATTERN = /^https:\/\/([a-z0-9-]+\.)*phxlab\.io$/;

function isEmbeddedInLab(): boolean {
  return window.self !== window.top;
}

type LabMessage =
  | { type: 'lab:content'; blockId: string; block: Record<string, unknown> }
  | { type: 'lab:render'; blocks: Record<string, unknown>[] }
  | { type: 'lab:highlight'; blockId: string | null };

async function renderBlocks(blocks: Record<string, unknown>[]): Promise<string> {
  const res = await fetch('/api/lab-preview.json', {
    method: 'POST',
    body: JSON.stringify(blocks),
  });
  return res.text();
}

// Cloning+replacing <script> nodes is required: assigning outerHTML/innerHTML
// never executes embedded <script> tags, so any block with inline interactive
// JS would go dead after a patch without this.
function reExecuteScripts(root: ParentNode): void {
  for (const old of root.querySelectorAll('script')) {
    const fresh = document.createElement('script');
    for (const { name, value } of old.attributes) fresh.setAttribute(name, value);
    fresh.textContent = old.textContent;
    old.replaceWith(fresh);
  }
}

async function patchBlock(blockId: string, block: Record<string, unknown>): Promise<void> {
  const target = document.querySelector(`[data-lab-id="${CSS.escape(blockId)}"]`);
  if (!target) return; // not on this page, or not retrofitted yet — no-op
  const html = await renderBlocks([block]);
  target.outerHTML = html;
  const replaced = document.querySelector(`[data-lab-id="${CSS.escape(blockId)}"]`);
  if (replaced) reExecuteScripts(replaced.parentElement ?? document.body);
}

async function patchAll(blocks: Record<string, unknown>[]): Promise<void> {
  const main = document.querySelector('main');
  if (!main) return;
  main.innerHTML = await renderBlocks(blocks);
  reExecuteScripts(main);
}

export function initLabBridge(): void {
  if (!isEmbeddedInLab()) return;

  window.addEventListener('message', (event) => {
    if (!LAB_ORIGIN_PATTERN.test(event.origin)) return;
    const msg = event.data as LabMessage;
    if (msg.type === 'lab:content') patchBlock(msg.blockId, msg.block);
    else if (msg.type === 'lab:render') patchAll(msg.blocks);
    else if (msg.type === 'lab:highlight') {
      for (const el of document.querySelectorAll('[data-lab-selected]')) {
        el.removeAttribute('data-lab-selected');
      }
      if (msg.blockId) {
        document
          .querySelector(`[data-lab-id="${CSS.escape(msg.blockId)}"]`)
          ?.setAttribute('data-lab-selected', '');
      }
    }
  });

  document.addEventListener('click', (event) => {
    const target = (event.target as Element).closest('[data-lab-id]');
    window.parent.postMessage(
      { type: 'lab:select', blockId: target?.getAttribute('data-lab-id') ?? null },
      '*' // parent's own message handler re-validates origin; this is a same-info broadcast
    );
  });

  window.parent.postMessage({ type: 'lab:ready' }, '*');
}
